import js
from math import *

s = js.document.getElementById('input').value
try:
    r = eval(s)
except Exception as error:
    r = 'ERROR:' + str(error)

js.document.getElementById("output").innerHTML = r
