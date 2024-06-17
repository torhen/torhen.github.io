from js import document
from pyodide.ffi import create_proxy
import datetime
from math import *


status1 = document.getElementById('status1')
status1.innerHTML = 'ready.'
input1 = document.getElementById('input1')
output1 = document.getElementById('output1')

def calc(*args):
    s = input1.value
    try:
        r = eval(s)
    except Exception as e:
        r = str(e)
    output1.value = str(r)

proxy_calc = create_proxy(calc)

input1.addEventListener('change', proxy_calc)
calc()

# Store proxy_f in Python then later:
# document.body.removeEventListener('click', proxy_f)
# proxy_f.destroy()

