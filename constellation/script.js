"use strict"

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
window.addEventListener('load', init)



const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
let g_speed = 5
const PARTICLES = 100
let g_minConnectionDist = 100
let g_connections

canvas.width= WIDTH
canvas.height = HEIGHT

let plist = []

const slider1 = document.getElementById('slider1')
slider1.addEventListener('change', (e)=>{
    g_speed = slider1.value
})


const slider2 = document.getElementById('slider2')
slider2.addEventListener('change', (e)=>{
    g_minConnectionDist = slider2.value
})

const slider3 = document.getElementById('slider3')
slider3.addEventListener('change', (e)=>{
    let particles = slider3.value
    plist = []
    for(let i=0; i<particles; i++){
        let x = Math.random() * WIDTH
        let y = Math.random() * HEIGHT
        let dx = Math.random() - 0.5
        let dy = Math.random() - 0.5
        let p = new Particle(x, y, 5, dx, dy, 'white')
        plist.push(p)
    }
})


class Particle{
    constructor(x, y, r, dx, dy, color){
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.dx = dx
        this.dy = dy
        Object.seal(this)
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)  
        ctx.fill()
    }

    update(){
        this.x += g_speed *this.dx
        this.y += g_speed * this.dy
        if(this.x < 0 || this.x > WIDTH){
            this.dx *= -1
        }
        if(this.y < 0 || this.y > HEIGHT){
            this.dy *= -1
        }
    }
}



function init(){
    for(let i=0; i<PARTICLES; i++){
        let x = Math.random() * WIDTH
        let y = Math.random() * HEIGHT
        let dx = Math.random() - 0.5
        let dy = Math.random() - 0.5
        let p = new Particle(x, y, 5, dx, dy, 'white')
        plist.push(p)
     }
     animate()
}

function animate(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    for(let i=0; i<plist.length; i++){
        plist[i].update()
        plist[i].draw()
     }

     // make connections
     let connections = 0
     for(let i=0; i < plist.length; i++){
        for(let j=0; j < plist.length; j++){
            let p0 = plist[i]
            let p1 = plist[j]
              let d = Math.sqrt((p0.x - p1.x)**2 + (p0.y - p1.y)**2)

            if(d < g_minConnectionDist && d > 0){
                ctx.lineWidth = 0.5
                ctx.strokeStyle = 'white'
                ctx.line
                ctx.beginPath()
                ctx.moveTo(p0.x, p0.y)
                ctx.lineTo(p1.x, p1.y)

                ctx.stroke()
                connections++
            }

        }
        g_connections = connections
     }


    ctx.font = "15px Arial";
    let text = `    speed=${g_speed}  min.distance=${g_minConnectionDist}  particles=${plist.length} connections=${g_connections} `
    document.getElementById('comment').innerText = text
    window.requestAnimationFrame(animate)
}



