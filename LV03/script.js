"use strict"

function wgs2swiss(lon, lat){


	// Aprroximation WGS84 -> CH1903 https://de.wikipedia.org/wiki/Schweizer_Landeskoordinaten


    let p = (lat * 3600 - 169028.66) / 10000
    let L = (lon * 3600 - 26782.5) / 10000
    let y = 200147.07 + 308807.95 * p + 3745.25 * L * L + 76.63 * p * p - 194.56 * L * L * p + 119.79 * p * p * p
    let x = 600072.37 + 211455.93 * L - 10938.51 * L * p - 0.36 * L * p * p - 44.54 * L * L * L

    return [Math.round(x), Math.round(y)]
}

function test(){

    navigator.geolocation.getCurrentPosition(showPosition);
}


function showPosition(position){
    let lon = position.coords.longitude
    let lat = position.coords.latitude

    let swiss = wgs2swiss(lon, lat)

    const p_ts = document.getElementById('ts')
    p_ts.innerHTML = 'timestamp:' + position.timestamp 

    const p_coord = document.getElementById('coord')
    p_coord.innerHTML = 'LV03: ' + swiss[0] + ', ' + swiss[1]

}


setInterval(test, 1000);