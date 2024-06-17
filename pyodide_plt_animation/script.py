from pyodide.ffi import create_proxy
from pyodide.ffi.wrappers import set_interval
from matplotlib import pyplot as plt
import math
import io
import base64
import js



status1 = js.document.getElementById("status1")
status1.innerHTML = "ready."
iMyPlot = js.document.getElementById("img1")
button1 = js.document.getElementById("button1")

k = 0
fig = 0

def make_plot(para=0):
    global k, fig

    fig, ax = plt.subplots()
    ax.plot([math.sin(x * math.pi / 50 + k) for x in range(100)])
    k = k + 0.1

    # Save the plot to a StringIO object in SVG format
    img = io.StringIO()
    plt.savefig(img, format="svg")
    img.seek(0)
    imgdata = img.read()

    # Set the image data to the src attribute of iMyPlot
    iMyPlot.setAttribute("src", "data:image/svg+xml;base64," + base64.b64encode(imgdata.encode()).decode("ascii"))


    


    # Close the figure to free memory
    try:
        plt.close(fig) # gives an error message, but deletes the figure
    except:
        print('open figures', len(plt.get_fignums()))


proxy_make_plot = create_proxy(make_plot)

# button1.addEventListener('click', proxy_make_plot)
# window.setInterval(proxy_make_plot, 500)

set_interval(make_plot, 40)
make_plot(0)