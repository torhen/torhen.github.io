from matplotlib import pyplot as plt
import random
import io
import base64
import js

iMyPlot = js.document.getElementById("img1")

fig, ax = plt.subplots()
ax.plot([random.random() for _ in range(100)])

img =  io.StringIO()
plt.savefig(img, format="svg")
img.seek(0)
imgdata = img.read()

iMyPlot.setAttribute("src","data:image/svg+xml;base64," + str(base64.b64encode(imgdata.encode()), "ascii"))

print('finished.')
