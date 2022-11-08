"use strict"

class App{

    constructor(step, start_ang, c, radius, n) {
        this.m_step = step
        this.m_ang = start_ang
        this.m_c = c
        this.m_radius = radius
        this.m_n = n

        this.canvas = document.getElementById("canvas1")
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = this.canvas.getContext('2d')
    }

    circle(x, y, r, color){
        this.ctx.fillStyle = color
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.stroke()
    }

    paint(r, ang, point_r, point_color){
        ang = ang * Math.PI / 180;
        let x = r * Math.cos(ang) + this.canvas.width/2
        let y = r * Math.sin(ang) + this.canvas.height/2
        this.circle(x, y, point_r, point_color)
    }

    flower(ang){
        for(let n=0; n < this.m_n; n++){
            this.paint(this.m_c * Math.sqrt(n), n * ang, this.m_radius, `hsl(${n},100%,50%)`)
        }
    }

    change_step(v){
        this.m_step = parseFloat(v)
        const e = document.getElementById('label1')
        e.innerHTML = 'angle incr.' + v
        console.log(e)
    }

    change_c(v){
        this.m_c = parseFloat(v)
        const e = document.getElementById('label2')
        e.innerHTML = 'c ' + v
        console.log(e)
    }

    change_radius(v){
        this.m_radius = parseFloat(v)
        const e = document.getElementById('label3')
        e.innerHTML = 'radius ' + v
        console.log(e)
    }

    change_n(v){
        this.m_n = parseFloat(v)
        const e = document.getElementById('label4')
        e.innerHTML = 'n ' + v
        console.log(e)
    }

    run(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.m_ang = this.m_ang + this.m_step
        this.flower(this.m_ang)
    }
    
}

const app = new App(0.001, 137.5078,  10, 20, 2000)

function animate(){
    app.run()
    window.requestAnimationFrame(animate)
}

animate()