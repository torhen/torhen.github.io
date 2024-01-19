"use strict"

class App{
    constructor(){

    }

    init(){
        this.canvas = document.getElementById('canvas1')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 640
        this.canvas.height = 480
        this.x_left = 50
        this.y_up = 50
        this.tiles_x = 12
        this.tiles_y = 12
        this.tile_width = 30
        this.tile_height = 30
        this.frame_count = 0
        this.wait_frames = 20
        this.dir_x = 1
        this.dir_y = 0
        this.points = 3
        this.is_pause = false

        this.background_color = 'lightgrey'

        // snake color
        this.color_head = 'lightgreen'
        this.color_body = 'darkgreen'
 
        //apple color
        this.color_apple = 'red'
        this.color_font = 'darkgreen'
 
        this.tile_stroke_color = 'lightgrey'
        this.tile_fill_color1 = 'black'
        this.tile_fill_color2 = '#222 '


        this.background = new Background()
        this.snake = new Snake()
        this.apple = new Apple()
    }

    update(){
        this.frame_count += 1

        if(this.is_pause == false){
            this.snake.update()
        }

    }

    draw(){
        this.background.draw()
        this.snake.draw()
        this.apple.draw()
    }

    key_right(){
        // don't allow return
        if(this.dir_x == -1){ 
            return
        }
        this.dir_x = 1
        this.dir_y = 0
    }

    key_left(){
        if(this.dir_x == 1){
            return
        }
        this.dir_x = -1
        this.dir_y = 0
    }

    key_up(){
        if(this.dir_y == 1){
            return
        }
        this.dir_x = 0
        this.dir_y = -1
    }

    key_down(){
        if(this.dir_y == -1){
            return
        }
        this.dir_x = 0
        this.dir_y = 1  
    } 

    toggle_pause(){
        if(this.is_pause == false){
            this.is_pause = true
        }else{
            this.is_pause = false
        }
    }
}

class Background{
    constructor(){
    }
 
    draw(){
        app.ctx.fillStyle = app.background_color
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height)
        for(let j=0; j< app.tiles_y; j++){
            for(let i=0; i < app.tiles_x; i++){ 
                let x = app.x_left + i * app.tile_width 
                let y = app.y_up + j * app.tile_height

                if( (i + j) % 2 === 0){

                    app.ctx.fillStyle = app.tile_fill_color1

                }else{
                    app.ctx.fillStyle = app.tile_fill_color2
                }
                app.ctx.strokeStyle = app.tile_stroke_color
                app.ctx.fillRect(x,y,app.tile_width, app.tile_height)
                //app.ctx.strokeRect(x,y,app.tile_width, app.tile_height)
            }
        }
 
        // draw points
        let text_x = app.x_left + app.tile_width * (app.tiles_x + 2)
        let text_y = app.y_up + app.tile_height
        app.ctx.fillStyle = app.color_font
        app.ctx.font = app.tile_height + "px Consolas"
        app.ctx.fillText(app.points, text_x, text_y) 

        // pause indicator
        if(app.is_pause){
            if(Math.floor(app.frame_count / 20) % 2 == 0){
                app.ctx.fillStyle = app.color_font
                app.ctx.fillText("Pause", text_x, text_y + app.tile_height)
            }else{
                app.ctx.fillText("      " , text_x, text_y + app.tile_height)

            }
        }
          
    } 
}

class Square{
    constructor(x, y){
        this.pos_x = x
        this.pos_y = y
    }

    draw(){

        let x = app.x_left + this.pos_x * app.tile_width
        let y = app.y_up + this.pos_y * app.tile_height
        let w = app.tile_width
        let h = app.tile_height

        let d = app.tile_width * 0
        x = x + d
        y = y + d
        w = w - 2 * d
        h = h - 2 * d



        // app.ctx.strokeRect(x, y, w, h)
        app.ctx.fillRect(x ,y ,w, h)

    }

}

class Snake{
    constructor(){
        this.squares = []

        this.squares.push(new Square(6, 5))
        this.squares.push(new Square(5, 5))
        this.squares.push(new Square(4, 5))

    }

    check_in_snake(x, y){
        for(let i = 0; i< this.squares.length; i++){
            if( x === this.squares[i].pos_x & y === this.squares[i].pos_y){
                return true
            }
        }
        return false
    }

    check_in_snake1(x, y){
        for(let i = 2; i< this.squares.length; i++){
            if( x === this.squares[i].pos_x & y === this.squares[i].pos_y){
                return true
            }
        }
        return false
    }

    update(){
        if(app.frame_count < app.wait_frames){
            return 

        }
        app.frame_count = 0

        let x_head = this.squares[0].pos_x
        let y_head = this.squares[0].pos_y

        let dir_x = app.dir_x
        let dir_y = app.dir_y

        let x_head_new = x_head + dir_x
        let y_head_new = y_head + dir_y


        if(x_head_new < 0){
            x_head_new = app.tiles_x - 1
        }

        if(x_head_new >= app.tiles_x){
            x_head_new = 0
        }

        if(y_head_new < 0){
            y_head_new = app.tiles_y - 1
        }

        if(y_head_new >= app.tiles_y){
            y_head_new = 0
        }

        // Check if apple catched
        if(x_head_new == app.apple.pos_x & y_head_new == app.apple.pos_y){
            let new_square = new Square(x_head_new, y_head_new)
            this.squares.unshift(new_square)
            app.apple.move_apple()
            app.points += 1
            return
        }

        // Check self touching
        if(app.snake.check_in_snake1(x_head_new, y_head_new)){
            window.alert('Game Over')
            app.init()
            return
        }

        let new_square = new Square(x_head_new, y_head_new)
        this.squares.unshift(new_square)
        this.squares.pop()

    }

    draw(){
        for(let i = 0; i < this.squares.length; i++){
            if(i == 0){
                app.ctx.strokeStyle = app.tile_stroke_color
                app.ctx.fillStyle=app.color_head
            }else{
                app.ctx.strokeStyle = app.tile_stroke_color
                app.ctx.fillStyle=app.color_body
            }
            this.squares[i].draw()
        }
    }
}


class Apple{
    constructor(){
        this.move_apple()
    }

    draw(){
        let x = app.x_left + this.pos_x * app.tile_width + app.tile_width / 2
        let y = app.y_up + this.pos_y * app.tile_height + app.tile_height / 2
        let r = app.tile_width / 2


        let d = app.tile_width * 0.03
        x = x + d
        y = y + d
        r = r - 4 * d

        app.ctx.beginPath()
        app.ctx.fillStyle = app.color_apple
        app.ctx.arc(x,y,r,0, 2*Math.PI,false)
        app.ctx.fill()
        app.ctx.closePath()
    }

    move_apple(){
        
        let x
        let y
        let xh = app.snake.squares[0].pos_x
        let yh = app.snake.squares[0].pos_y
        while(true) {        
            x = Math.floor(Math.random() * app.tiles_x)
            y = Math.floor(Math.random() * app.tiles_y)

            if (app.snake.check_in_snake(x, y) == false){
                break
                
            }
        }

        this.pos_x = x
        this.pos_y = y
    }
}

const app = new App()
window.addEventListener('load', ()=>{

    app.init()

    window.addEventListener("keydown", (e)=>{

        if (e.key == 'ArrowRight'){
            app.key_right()
        }
        if (e.key == 'ArrowLeft'){
            app.key_left()  
        }
        if (e.key == 'ArrowDown'){
            app.key_down()
        }
        if (e.key == 'ArrowUp'){
            app.key_up()
        }
        if (e.key == ' '){
            app.toggle_pause()
        }
    })

    function animate(){
        //console.log(app.is_pause)
        app.update()
        app.draw()
        requestAnimationFrame(animate)
    }
    animate()
})