from js import document
from pyodide.ffi import create_proxy
import datetime

button = document.getElementById('button1')

def f(*args):
    document.getElementById('out').innerHTML = str(datetime.datetime.now())

proxy_f = create_proxy(f)
button.addEventListener('click', proxy_f)


# Store proxy_f in Python then later:
# document.body.removeEventListener('click', proxy_f)
# proxy_f.destroy()

