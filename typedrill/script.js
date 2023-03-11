"use strict"

let g_text

class CText {
    constructor(canv, ctx){
        this.canv = canv
        this.ctx = ctx
        this.font = '20px Consolas'
        this.lineHeight = 40
        this.rawText = ''
        this.lines = []
        this.maxLettersPerLine = 30
        this.lineStart = 20
        this.cursor_pos = 0
        this.cursor_color = 'green'
        this.state = 'ok'
    }

    setText(text) {
        this.rawText = text
        this.cursor_pos = 0
        g_text.convertToLines()
        g_text.draw()
    }

    getPos(n) {
        let c = 0
        let c_prev
        for(let line = 0; line < this.lines.length; line++){
            c_prev = c
            c = c + this.lines[line].length

            if(c > n){
                return [line, n -c_prev]
            }
        }
    }

    cursorRight(){

        // Calculate x y coordinates of cursor
        let pos = this.getPos(this.cursor_pos)
        let cursor_y = pos[0]
        let cursor_x = pos[1]

        if(cursor_y == this.lines.length -1 && cursor_x >= this.lines[cursor_y].length - 1){
            return
        }

        this.cursor_pos = this.cursor_pos + 1
    }

    draw(){
        // clear
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canv.width, this.canv.height)
        this.ctx.font = this.font
        let y = this.lineHeight

        // Calculate x y coordinates of cursor
        let pos = this.getPos(this.cursor_pos)
        let cursor_y = pos[0]
        let cursor_x = pos[1]

        this.ctx.fillStyle = 'black'

        let startLine = cursor_y - 3
        if(startLine < 0){
            startLine = 0
        }
        for(let line = startLine; line < this.lines.length; line++){
            this.ctx.fillText(this.lines[line], this.lineStart, y)

            // draw only if line of cursor

            if(line === cursor_y){
                this.ctx.fillStyle = this.cursor_color
                this.ctx.fillText(" ".repeat(cursor_x) + '_', this.lineStart, y)
                this.ctx.fillText(" ".repeat(cursor_x) + this.lines[line][cursor_x], this.lineStart, y)
                this.ctx.fillStyle = 'black'
            }
            y = y + this.lineHeight
        }   
    }

    handle_key(s){
        // keys to ignore
        if(s == 'Shift'){
            return
        }

        // arrow right for not possible letters
        if(s == 'ArrowRight'){
            this.cursorRight()
            this.cursor_color = 'green'
            this.draw()
            return

        }

        // free from wrong state
        if(s == 'Backspace'){
            console.log('free')
            this.cursor_color = 'green'
            this.state = 'ok'
            this.draw()
            return
        }
        // Calculate x y coordinates of cursor
        let pos = this.getPos(this.cursor_pos)
        let cursor_y = pos[0]
        let cursor_x = pos[1]

        console.log(s)

        let under_cursor = this.lines[cursor_y][cursor_x]

        if(s === under_cursor && this.state == 'ok'){
            this.cursorRight()
            this.cursor_color = 'green'
            this.draw()
            return
        }

        if(s !== under_cursor){
            this.cursor_color = 'red'
            this.draw()
            this.state = 'wrong'
            return
        }     
    }


    convertToLines(){
        let i = 0
        this.lines = []
        while(true){
            let start = i
            let end = i + this.maxLettersPerLine
            let s = this.rawText.substring(start, end)
            this.lines.push(s)
            i = i + this.maxLettersPerLine
            if(i >= this.rawText.length){
                break
            }
        }
    } 
}

window.onload = () => {
    let canv = document.getElementById('canvas1')
    canv.width = 800
    canv.height = 600
    let ctx = canv.getContext('2d')
    
    g_text = new CText(canv, ctx)
    g_text.font = '40px Consolas'
    g_text.setText('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.')

} 

document.getElementById('canvas1').addEventListener('keydown', (event) => {
    g_text.handle_key(event.key)
  }, false);


console.log(document.getElementById('file1').addEventListener('change', (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        let text = reader.result
        g_text.setText(text)
    }

}))