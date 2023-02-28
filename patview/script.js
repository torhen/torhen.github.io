"use strict"

const g_antennas = []
const g_colors = ["Black", "red", "orange", "blue", "cyan", "magenta", "darkgrey", "teal", "Purple", "olive"]



window.onload = () =>{
    let canv = document.getElementById('myCanvas')
    let ctx = canv.getContext('2d')

    canv.width = 900
    canv.height = 600

    // show empty grid
    draw()

}

function draw(){
    const canv = document.getElementById('myCanvas')
    let width = canv.width
    let height = canv.height
    let ctx = canv.getContext('2d')

    // clear canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)


    ctx.font = '30px Consolas'
    //ctx.fillText(ret.vert.length, 65, 60)

    let r0 = width * 0.23
    let dy = height * 0.5
    let dx1 = width * 0.25
    let dx2 = width * 0.75

    drawGrid(ctx, dx1, dy, r0)

    drawGrid(ctx, dx2, dy, r0)

    let out = document.getElementById('output')
    out.innerHTML = '<br>'


    // draw antennas
    for(let i=0; i < g_antennas.length; i++){
        let ret = g_antennas[i]

        let color = g_colors[i % g_colors.length]

        if(ret.visible == 1){
            // Horizontal
            drawPattern(ret.hori, ctx, dx1, dy, r0, color)

            // vertical
            drawPattern(ret.vert, ctx, dx2, dy, r0, color)
        }


 
        // create checkbox
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox'
        checkbox.id = i

        // check if antenna is visible
        checkbox.checked = g_antennas[i].visible
     
        // create label
        let label = document.createElement('label')
        label.htmlFor = ret.filename;
        label.style.color = color
        label.appendChild(document.createTextNode(ret.filename))
     
        // create linebreak
        let br = document.createElement('br')
     
        // add to out
        out.appendChild(checkbox);
        out.appendChild(label)
        out.appendChild(br)

        checkbox.addEventListener('change', handleCheck)
       
    }
}

function handleCheck(e){
    let n = e.target.id
    let ant = g_antennas[n]

    if(ant.visible == 0){
        ant.visible = 1
    }else{
        ant.visible = 0
    }

    draw()


}

function drawPattern(valueList, ctx, dx, dy, r0, color){
        let min_level = 30
        ctx.lineWidth = 1
        ctx.strokeStyle = color
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
    ctx.strokeStyle = 'black'

    // lines
    let grds = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    for(let i=0; i < grds.length; i++){
        let rad = grds[i] * Math.PI / 180
        ctx.beginPath()
        ctx.moveTo(dx, dy)
        ctx.lineTo(dx + r0 * Math.cos(rad), dy + r0 * Math.sin(rad))
        ctx.stroke()
    }
    
    // circles
    let ticks = [1, 9/10, 2/3, 1/3]
    for(let i=0; i< ticks.length; i++){
        let tick = ticks[i]
        ctx.beginPath()
        ctx.arc(dx, dy, r0 * tick, 0, 2 * Math.PI)
        ctx.stroke()

    }
}

function print(s){
    // let out = document.getElementById('output')
    // out.style.fontSize = '14px'
    // out.innerHTML = s
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
    let files = e.target.files
    let msg = document.getElementById('msg')


    for(let i = 0; i < files.length; i++){
        
        let file = files[i]
        let reader = new FileReader()
        reader.readAsText(file)
    
        reader.onload = () =>{
            let ret = processText(reader.result)
            ret.filename = file.name
            ret.visible = 1
            g_antennas.push(ret)
            draw()
            msg.innerHTML = 'loading ' + (i + 1) + '/' + files.length
        }
    }
    
}

document.getElementById('myFile').addEventListener("change", handleFileInput)