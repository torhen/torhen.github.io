from pyodide.ffi import create_proxy
from matplotlib import pyplot as plt
import random
import io
import base64
import js


status1 = js.document.getElementById("status1")
status1.innerHTML = "ready."
iMyPlot = js.document.getElementById("img1")
button1 = js.document.getElementById("button1")


def make_plot(para):
  

    fig, ax = plt.subplots()
    ax.plot([random.random() for _ in range(100)])

    img =  io.StringIO()
    plt.savefig(img, format="svg")
    img.seek(0)
    imgdata = img.read()

    iMyPlot.setAttribute("src","data:image/svg+xml;base64," + str(base64.b64encode(imgdata.encode()), "ascii"))

    print('finished.')


proxy_make_plot = create_proxy(make_plot)

button1.addEventListener('click', proxy_make_plot)
make_plot(0)