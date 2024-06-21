import numpy as np
from matplotlib import pyplot as plt
import js
import io
import base64
from pyodide.ffi import create_proxy
from pyodide.ffi.wrappers import set_interval

js.document.getElementById('status1').innerHTML = 'ready.'


def calc_plm_parameter(IE, JE, npml):
    # npml = number of PML cells
    gi2 = np.ones(IE)
    gi3 = np.ones(IE)
    fi1 = np.zeros(IE)
    fi2 = np.ones(IE)
    fi3 = np.ones(IE)

    gj2 = np.ones(JE) # im original IE
    gj3 = np.ones(JE)
    fj1 = np.zeros(JE)
    fj2 = np.ones(JE)
    fj3 = np.ones(JE)

    for i in range(npml + 1):
        xnum = npml - i
        xd = npml
        xxn = xnum/xd
        xn = 0.33*np.power(xxn,3.0)
        gi2[i] = 1.0/(1.0+xn)
        gi2[IE-1-i] = 1.0/ (1.0+xn)
        gi3[i] = (1.0 - xn) / (1.0 + xn)
        gi3[IE-i-1] = (1.0 - xn) / (1.0 + xn)

        xxxn = (xnum -.5) / xd
        xn = 0.25*np.power(xxn,3.0)
        fi1[i] = xn
        fi1[IE-2-i] = xn
        fi2[i] = 1.0/(1.0+xn)
        fi2[IE-2-i] = 1.0/(1.0 + xn)
        fi3[i] = (1.0 - xn) / (1.0 + xn)
        fi3[IE-2-i] = (1.0 - xn)/(1.0 + xn)

    for j in range(npml + 1):
        xnum = npml - j
        xd = npml
        xxn = xnum/xd
        xn = 0.33*np.power(xxn,3.0)
        gj2[j] = 1.0/(1.0+xn)
        gj2[JE-1-j] = 1.0/ (1.0+xn)
        gj3[j] = (1.0 - xn) / (1.0 + xn)
        gj3[JE-j-1] = (1.0 - xn) / (1.0 + xn)

        xxxn = (xnum -.5) / xd
        xn = 0.25*np.power(xxn,3.0)
        fj1[j] = xn
        fj1[JE-2-j] = xn
        fj2[j] = 1.0/(1.0+xn)
        fj2[JE-2-j] = 1.0/(1.0 + xn)
        fj3[j] = (1.0 - xn) / (1.0 + xn)
        fj3[JE-2-j] = (1.0 - xn)/(1.0 + xn)

    for a in [gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3]:
            a.flags.writeable = False

    return gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3


def calc_dz(dz, hx, hy, IE, JE, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb):
    # Calculate the Dz field
    dz = np.copy(dz)

    for j in range(1,JE):
        for i in range (1,IE):
            # without lossy medium
            """
            dz[i,j] = gi3[i] * gj3[j] * dz[i,j] \
            + gi2[i] * gj2[j] * .5 * ( hy[i,j] - hy[i-1,j] - hx[i,j] + hx[i,j-1])
            """
            dz[i,j] = ca[i,j] * gi3[i] * gj3[j] * dz[i,j] \
            + cb[i,j] * gi2[i] * gj2[j] * .5 * ( hy[i,j] - hy[i-1,j] - hx[i,j] + hx[i,j-1])


    dz.flags.writeable = False
    return dz

def calc_ez(ez, IE, JE, ga, dz):
    # Calculate the Ez field
    ez = np.copy(ez)
    for j in range(JE):
        for i in range(IE):
            ez[i,j] = ga[i,j] * dz[i, j]

    # set the Ez edges to 0, as part of the PML
    for j in range(JE-1):
        ez[0,j] = 0.0
        ez[IE-1,j] = 0.0

    for i in range(IE-1):
        ez[i,0] = 0.0
        ez[i,JE-1] = 0.0

    ez.flags.writeable = False
    return ez


def sin_source(dz, IE, JE, dt, T, freq, x, y):
    x, y = int(x), int(y)
    dz = np.copy(dz)
    pulse = np.sin(2*np.pi*freq*1e6*dt*T)
    dz[x, y] = pulse
    dz.flags.writeable = False
    return dz

def calc_hx(hx, ihx, IE, JE, ez, fi1, fj2, fj3):
    # Caluculate the Hx field
    hx = np.copy(hx)
    ihx = np.copy(ihx)
    for j in range(JE-1):
        for i in range(IE):
            curl_e = ez[i,j] - ez[i,j+1]
            ihx[i,j] = ihx[i,j] + fi1[i] * curl_e
            hx[i,j] = fj3[j] * hx[i,j] \
            + fj2[j] * .5*(curl_e + ihx[i,j])
    hx.flags.writeable = False
    ihx.flags.writeable = False
    return hx, ihx


def calc_hy(hy, ihy, IE, JE, ez, fj1, fi2, fj3):
    hy = np.copy(hy)
    ihy = np.copy(ihy)
    for j in range(JE-1):
        for i in range(IE-1):
            curl_e = ez[i+1,j] - ez[i,j]
            ihy[i,j] = ihy[i,j] + fj1[j] * curl_e
            hy[i,j] = fj3[j] * hy[i,j] \
            + fi2[i] * .5*(curl_e + ihy[i,j])

    hy.flags.writeable = False
    ihy.flags.writeable = False
    return hy, ihy


def new_array( shape, value=0):
    value = float(value)
    a = np.full(shape, value)
    a.flags.writeable = False
    return a

def box(ar, bound, value):
    x0, x1, y0, y1 = [int(i) for i in bound]
    value = float(value)
    ar = np.copy(ar)
    for x in range(x0, x1 + 1):
        ar[x, y0] = value
        ar[x, y1] = value
    for y in range(y0, y1 + 1):
        ar[x0, y] = value
        ar[x1, y] = value
    ar.flags.writeable = False
    return ar


def init_sys(IE, JE, npml):
    ddx = .01        # Cell size
    dt = ddx / 6e8   # Time steps
    espz = 8.85419e-12

    gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3 = calc_plm_parameter(IE, JE, npml=5)

    # Initialize the arrays
    ez = new_array( (IE, JE) )
    dz = new_array( (IE, JE) )
    hx = new_array( (IE, JE) )
    hy = new_array( (IE, JE) )

    # PML stuff
    ihx = new_array( (IE, JE) )
    ihy = new_array( (IE, JE) )
    ga = new_array( (IE, JE), 1.0 )

    # Conductivity free space
    ca = new_array( (IE, JE) , 1.0)
    cb = new_array( (IE, JE) , 0.5)

    # create lossy medium
    epsilon = 1.0
    sigma = 1.0
    eaf = dt * sigma / (2.0 * espz * epsilon)

    # create obstacles
    bound = (JE*.4, JE*.5, JE*.4, JE*.5)
    ca = box(ca, bound, (1.0-eaf)/(1.0+eaf) )
    cb = box(cb, bound, 0.5 / (epsilon*(1+eaf)))

    bound = (JE*.2, JE*.3, JE*.2, JE*.3)
    ca = box(ca, bound, (1.0-eaf)/(1.0+eaf) )
    cb = box(cb, bound, 0.5 / (epsilon*(1+eaf)))

    T = 0
    return T, IE, JE, dt, ez, dz, hx, hy, ihx, ihy, ga, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb


def loop(T, IE, JE, dt, ez, dz, hx, hy, ihx, ihy, ga, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb):

    T = T + 1

    # Calculate the Dz field
    dz = calc_dz(dz, hx, hy, IE, JE, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3,ca,cb)

    # Sinusoidal Source
    dz = sin_source(dz, IE, JE, dt, T, 3500, IE//2, JE * 0.7)

    # Calculate the Ez field and set the Ez edges to 0, as part of the PML
    ez = calc_ez(ez, IE, JE, ga, dz)

    # Caluculate the Hx field
    hx, ihx = calc_hx(hx, ihx, IE, JE, ez, fi1, fj2, fj3)

    # Caluculate the Hy field
    hy, ihy = calc_hy(hy, ihy, IE, JE, ez, fj1, fi2, fj3)



    return T, IE, JE, dt,ez, dz, hx, hy, ihx, ihy, ga, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb


def show(T, IE, JE, dt, ez, dz, hx, hy, ihx, ihy, ga, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb):
    plt.cla()
    plt.title(f'step={T}')
    contur = np.where(ca==1.0, 0.0, -1000.0)
    plt.imshow(ez + contur, vmin=-0.3, vmax=0.3)

 
    img =  io.StringIO()
    plt.savefig(img, format="svg")
    img.seek(0)
    imgdata = img.read()

    img1 = js.document.getElementById("img1")
    img1.setAttribute("src", "data:image/svg+xml;base64," + base64.b64encode(imgdata.encode()).decode("ascii"))


def loop(T, IE, JE, dt, ez, dz, hx, hy, ihx, ihy, ga, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb):

    T = T + 1

    # Calculate the Dz field
    dz = calc_dz(dz, hx, hy, IE, JE, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3,ca,cb)

    # Sinusoidal Source
    dz = sin_source(dz, IE, JE, dt, T, 3500, IE//2, JE * 0.7)

    # Calculate the Ez field and set the Ez edges to 0, as part of the PML
    ez = calc_ez(ez, IE, JE, ga, dz)

    # Caluculate the Hx field
    hx, ihx = calc_hx(hx, ihx, IE, JE, ez, fi1, fj2, fj3)

    # Caluculate the Hy field
    hy, ihy = calc_hy(hy, ihy, IE, JE, ez, fj1, fi2, fj3)



    return T, IE, JE, dt,ez, dz, hx, hy, ihx, ihy, ga, gi2, gi3, fi1, fi2, fi3, gj2, gj3, fj1, fj2, fj3, ca, cb




def step(para=0):
    global sys_state
    step_count = sys_state[0]
    if step_count > 300:
        js.document.getElementById('status1').innerHTML = 'stop because of too much memory'
        return

    sys_state = loop(*sys_state)
    show(*sys_state)
    step = sys_state[0]


plt.figure(figsize=(10,10))
sys_state = init_sys(100, 150, npml=5)
show(*sys_state)

set_interval(step, 500)


