"use strict"

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
window.addEventListener('load', init)

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const SPEED = 5
const PARTICLES = 100
const MAX_DIST = 100

canvas.width= WIDTH
canvas.height = HEIGHT


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
        this.x += this.dx
        this.y += this.dy
        if(this.x < 0 || this.x > WIDTH){
            this.dx *= -1
        }
        if(this.y < 0 || this.y > HEIGHT){
            this.dy *= -1
        }
    }
}

const plist = []

function init(){
    for(let i=0; i<PARTICLES; i++){
        let x = Math.random() * WIDTH
        let y = Math.random() * HEIGHT
        let dx = SPEED * (Math.random() - 0.5)
        let dy = SPEED * (Math.random() - 0.5)
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

     for(let i=0; i < plist.length; i++){
        for(let j=0; j < plist.length; j++){
            let p0 = plist[i]
            let p1 = plist[j]
              let d = Math.sqrt((p0.x - p1.x)**2 + (p0.y - p1.y)**2)

            if(d < MAX_DIST && d > 0){
                ctx.lineWidth = 0.5
                ctx.strokeStyle = 'white'
                ctx.line
                ctx.beginPath()
                ctx.moveTo(p0.x, p0.y)
                ctx.lineTo(p1.x, p1.y)

                ctx.stroke()
            }

        }
     }
     window.requestAnimationFrame(animate)
}



