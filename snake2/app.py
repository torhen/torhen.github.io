from stubs import *  #__: skip
import time, random

g_width = 20
g_height = 15
g_posx = 50
g_posy = 60
g_size = 25

canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

def clear_canvas():
    ctx.fillStyle = 'lightgray'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

def draw_field():
    # horizontal lines
    ctx.strokeStyle = 'gray'
    ctx.beginPath()
    x0 = g_posx
    x1 = g_posx + g_width * g_size
    for j in range(g_height + 1):
        y = g_posy + j * g_size
        ctx.moveTo(x0, y)
        ctx.lineTo(x1, y)
    ctx.stroke()

    # vertical lines
    y0 = g_posy
    y1 = g_posy + g_height * g_size
    for i in range(g_width + 1):
        x = g_posx + i * g_size
        ctx.moveTo(x, y0)
        ctx.lineTo(x, y1)
    ctx.stroke()

    # draw outer borders
    ctx.strokeStyle = 'black'
    ctx.strokeRect(g_posx, g_posy, g_width * g_size, g_height * g_size)

class Block:
    def __init__(self, x, y, color = 'darkgreen'):
        self.x = x % g_width
        self.y = y % g_height
        self.color = color

    def place(self, x, y):
        self.x = int(x) % g_width
        self.y = int(y) % g_height

    def is_inside(self):
        if 0 <= self.x < g_width and 0 <= self.y < g_height:
            return True
        else:
            return False

    def move(self, dx, dy):
        self.x += dx
        self.y += dy
        # experimental
        self.x = self.x % g_width
        self.y = self.y % g_height


    def draw(self):
        ctx.fillStyle = self.color
        x0 = g_posx + self.x * g_size
        y0 = g_posy + self.y * g_size
        ctx.fillRect(x0, y0, g_size, g_size)

class Snake:
    def __init__(self):
        # calc middle
        xm = g_width // 2
        ym = g_height // 2

        # create initial snake
        self.blocks = []
        initial_block_len = 3
        for i in range(0, initial_block_len):
            self.blocks.append(Block(xm - i, ym ))

        # initial snake direction
        self.dx = 1
        self.dy = 0
        self.is_growing = False

        # initial apple
        self.apple = Block(0, 0, 'red')
        self.place_apple()

    def set_dir(self, dx, dy):
        self.dx = dx
        self.dy = dy

    def place_apple(self):
        x = random.random() * g_width
        y = random.random() * g_height

        self.apple.place(x, y)

    def update(self):
        i = len(self.blocks)
        x_last, y_last = self.blocks[i-1].x, self.blocks[i-1].y

        for i in range(i - 1, 0, -1):
            self.blocks[i].x, self.blocks[i].y = self.blocks[i - 1].x, self.blocks[i - 1].y
        self.blocks[0].move(self.dx, self.dy)

        if self.growing:
            new_block = Block(x_last, y_last)
            self.blocks.append(new_block)
            self.growing = False

        self.check_apple_coll()

    def check_apple_coll(self):
        x0 = self.blocks[0].x
        y0 = self.blocks[0].y
        x1 = self.apple.x
        y1 = self.apple.y

        if x0 == x1 and y0 == y1:
            self.grow()
            self.place_apple()

    def grow(self):
        # set flag to grow on next update
        self.growing = True

    def draw(self):
        for block in self.blocks:
            block.draw()

        self.apple.draw()

class Game():
    def __init__(self):
        self.snake = Snake()
        document.addEventListener('keydown', self.key_event)

    def update(self):
        self.snake.update()
    
    def draw(self):
        clear_canvas()
        draw_field()
        self.snake.draw()

    def key_event(self, e):
        if e.key == 'ArrowUp': self.snake.set_dir(0, -1) 
        if e.key == 'ArrowDown': self.snake.set_dir(0, 1)
        if e.key == 'ArrowRight': self.snake.set_dir(1, 0)
        if e.key == 'ArrowLeft': self.snake.set_dir(-1, 0)
        if e.key == ' ': self.snake.grow()

game = Game()

# Event Loop
g_time = 0
g_takt = 0.2
def game_loop():
    global g_time
    if time.time() - g_time > g_takt or g_time==0:
        game.update()
        game.draw()
        g_time = time.time()
    window.requestAnimationFrame(game_loop)
game_loop()



