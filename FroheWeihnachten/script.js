"use strict"


let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let g_velocity = 0.2

class Particle {
  constructor(x, y, r, v) {
    this.x = x
    this.y = y
    this.r = r
    this.rad = Math.random() * Math.PI
    this.rad_add = g_velocity * this.r * 0.02
    this.ampli = this.r * 0.3

  }

  update() {
    this.rad = this.rad + this.rad_add

    if (this.rad > 2 * Math.PI) {
      this.rad = this.rad - 2 * Math.PI
    }

    if (this.y > canvas.height) {
      this.y = 0
    }

    this.y = this.y + this.r * g_velocity
    this.x = this.x + this.ampli * Math.sin(this.rad)

  }
  draw() {
    ctx.fillStyle = '#ffffff90'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
  }
}


let parts = []
for (let i = 0; i < 1000; i++) {
  let x = 2 * Math.random() * canvas.width
  let y = (Math.random() - 0.5) * canvas.height - 50
  let r = 0.007 * canvas.width / (Math.random() + 0.5)
  parts.push(new Particle(x, y, r))
}



function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.textAlign = "center";
  ctx.font = 0.115 * canvas.width + 'px Brush Script MT'
  
  ctx.fillStyle = '#fff'
  ctx.fillText('Frohe Weihnachten', canvas.width / 2.007, canvas.height / 2.007)

  ctx.fillStyle = '#080'
  ctx.fillText('Frohe Weihnachten', canvas.width / 2, canvas.height / 2)


  for (let i = 0; i < parts.length; i++) {
    let p = parts[i]
    p.update()
    p.draw()
  }

  window.requestAnimationFrame(animate)
}

animate()
