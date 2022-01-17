from stubs import *  #__: skip

def change(s):
    price = document.getElementById('price').value
    kw = document.getElementById('kw').value

    if s == 'w':
        v = document.getElementById('price').value
        price = v

    if s == 'w':
        v = document.getElementById('w').value
        kw = v / 1000

    if s == 'kw':
        v = document.getElementById('kw').value
        kw = v


    if s == 'kwh_per_day':
        v = document.getElementById('kwh_per_day').value
        kw = float(v) / 24

    if s == 'chf_per_day':
        v = document.getElementById('chf_per_day').value
        kw = float(v) / 24 / price


    if s == 'kwh_per_month':
        v = document.getElementById('kwh_per_month').value
        kw = float(v) / 24 / 30

    if s == 'chf_per_month':
        v = document.getElementById('chf_per_month').value
        kw = float(v) / 24 / 30 / price


    if s == 'kwh_per_year':
        v = document.getElementById('kwh_per_year').value
        kw = float(v) / 24 / 365

    if s == 'chf_per_year':
        v = document.getElementById('chf_per_year').value
        kw = float(v) / 24 / 365 / price

    

    document.getElementById('w').value = round(kw * 1000, 1)
    document.getElementById('kw').value = round(kw, 1)
    document.getElementById('kwh_per_day').value = round(kw * 24, 1)
    document.getElementById('chf_per_day').value = round(kw * 24 * price,2)

    document.getElementById('kwh_per_month').value = round(kw * 24 * 30, 0)
    document.getElementById('chf_per_month').value = round(kw * 24 * 30  * price, 2)

    document.getElementById('kwh_per_year').value = round(kw * 24 * 365, 0)
    document.getElementById('chf_per_year').value = round(kw * 24 * 365 * price, 2)


change('kw')