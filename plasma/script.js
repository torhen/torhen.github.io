"use strict"


class App{
    constructor(){
        this.width = 320
        this.height = 240
        this.scaling = 5
        this.canvas = document.getElementById('canvas1')
        this.canvas.width = this.width * this.scaling
        this.canvas.height = this.height * this.scaling
        this.ctx = this.canvas.getContext("2d")
        
        this.lx = []
        for(let x = 0; x < this.width; x++){
            let v = Math.sin(x /this.width * 4* Math.PI )
            this.lx.push(v)
            
        }

        this.ly = []
        for(let y = 0; y < this.height; y++){
            let v = Math.cos(y /this.height * 4* Math.PI )
            this.ly.push(v)
            
        }
        this.offset = 0
   
        this.loop()
        
  

    }

    set_pixel(x, y, v){
        this.ctx.fillStyle = `hsl(${v},100%,50%)`
        this.ctx.fillRect(x * this.scaling, y * this.scaling, this.scaling, this.scaling)

    }



    loop = () =>{


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.offset += 0.1

        for( let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){


                let v = this.lx[x] + this.ly[y]  + this.offset
                v = 90*v 
                v = v % 360
                this.set_pixel(x, y, v)
       
    
                

            }

        }

        window.requestAnimationFrame(this.loop)
    }


}



window.addEventListener('load', () => new App())