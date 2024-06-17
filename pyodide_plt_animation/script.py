from pyodide.ffi import create_proxy
from pyodide.ffi.wrappers import set_interval
from matplotlib import pyplot as plt
import math
import io
import base64
import js



status1 = js.document.getElementById("status1")
status1.innerHTML = "ready."
img1 = js.document.getElementById("img1")
button1 = js.document.getElementById("button1")

k = 0
fig, ax = plt.subplots()

def make_plot(para=0):
    global k, fig

 
    plt.cla()
    ax.plot([math.sin(x * math.pi / 50 + k) for x in range(100)])
    k = k + 0.1

    # Save the plot to a StringIO object in SVG format
    img = io.StringIO()
    plt.savefig(img, format="svg")
    img.seek(0)
    imgdata = img.read()

    # Set the image data to the src attribute of iMyPlot
    img1.setAttribute("src", "data:image/svg+xml;base64," + base64.b64encode(imgdata.encode()).decode("ascii"))




proxy_make_plot = create_proxy(make_plot)
set_interval(make_plot, 40)
