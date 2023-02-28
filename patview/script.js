"use strict"

window.onload = () =>{
    let canv = document.getElementById('myCanvas')
    let ctx = canv.getContext('2d')
    canv.width = 900
    canv.height = 600

}

function draw(ret){
    const canv = document.getElementById('myCanvas')
    let width = canv.width
    let height = canv.height
    let ctx = canv.getContext('2d')

    ctx.font = '30px Consolas'
    //ctx.fillText(ret.vert.length, 65, 60)

    let r0 = width * 0.2
    let dy = height * 0.5
    let dx = width * 0.25
    // Horizontal
    drawPattern(ret.hori, ctx, dx, dy, r0)
    drawGrid(ctx, dx, dy, r0)

    // vertical
    dx = width * 0.75
    drawPattern(ret.vert, ctx, dx, dy, r0)
    drawGrid(ctx, dx, dy, r0)

}

function drawPattern(valueList, ctx, dx, dy, r0){
        let min_level = 30
        ctx.lineWidth = 1
        ctx.beginPath()
        for(let i = 0; i < 360; i++){
            let angle = i * Math.PI /180

            let r1 = r0 - valueList[i] * r0 / min_level
            if(r1 <0){
                r1 = 0
            }
            let x = r1 * Math.cos(angle) + dx
            let y = r1 * Math.sin(angle) + dy
            ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
}

function drawGrid(ctx, dx, dy, r0){
    ctx.lineWidth = 0.3

    // horizontal line
    ctx.beginPath()
    ctx.moveTo(dx - r0, dy)
    ctx.lineTo(dx + r0, dy)
    ctx.stroke()

    // vertical line
    ctx.beginPath()
    ctx.moveTo(dx, dy - r0)
    ctx.lineTo(dx, dy + r0)
    ctx.stroke()

    // circle 0, 3, 10, 20 dB
    let ticks = [1, 9/10, 2/3, 1/3]
    for(let i=0; i< ticks.length; i++){
        let tick = ticks[i]
        ctx.beginPath()
        ctx.arc(dx, dy, r0 * tick, 0, 2 * Math.PI)
        ctx.stroke()

    }
}

function print(s){
    let out = document.getElementById('output')
    out.style.fontSize = '14px'
    out.innerHTML = s
}

function processText(s){

    let strList = s.split('\n')
    let out = ''
    let mode = 'head'

    // return object
    let ret ={
        head : '',
        hori : [],
        vert : []
    }

    for(let i = 0; i < strList.length; i++){
        let line = strList[i]

        // set modus
        if(/HORIZONTAL/.test(line)){
            mode = 'hori'
            continue
        }
        if(/VERTICAL/.test(line)){
            mode = 'vert'
            continue
        }

        if(/end/.test(line)){
            mode = 'end'
            continue
        }

        // process line depending of current mode

        if(mode == 'head'){
            ret.head = ret.head + line
            //console.log(line)
        }

        if(mode == 'hori'){
            let v0 = line.split(' ')[0]
            let v1 = line.split(' ')[1]
            v0 = parseFloat(v0)
            v1 = parseFloat(v1)
            if(v1 >= 0){
                ret.hori.push(v1)
            }
        }

        if(mode == 'vert'){
            let v0 = line.split(' ')[0]
            let v1 = line.split(' ')[1]
            v0 = parseFloat(v0)
            v1 = parseFloat(v1)
            if(v1 >= 0){
                ret.vert.push(v1)
            }
        } 
    }
    return ret
}



function handleFileInput(e){
    let file = e.target.files[0]

    let reader = new FileReader()
    reader.readAsText(file)

    reader.onload = () =>{
        let ret = processText(reader.result)
        print(ret.head)
        draw(ret)
    }
}

document.getElementById('myFile').addEventListener("change", handleFileInput)