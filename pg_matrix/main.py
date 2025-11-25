import pygame as pg
import asyncio
import random
# pygbag --ume_block=0 .

class Doc:
    def __init__(self, app):
        self.app = app
        self.font_size = app.fontsize
        # self.font = pg.font.SysFont("monospace", self.font_size)
        self.font = pg.font.Font('NotoSansJP-Regular.ttf', self.font_size)

        # create char_array
        self.char_array = []
        for i in range(app.icols):  # rows
            row = ""
            for j in range(app.irows):
                row = row + self.rnd_char() # columns
            self.char_array.append(row)

        # create color_array
        self.col_array = []
        for i in range(len(self.char_array)):
            row = self.rnd_trail(len(self.char_array[0]))
            self.col_array.append(row)

        # create volocies, constant speed for every row
        self.velo = []
        for i in range(len(self.col_array)):
            self.velo.append(random.randint(1, 5))

 
    def rnd_trail(self, members):
        "Create a trail with random length"
        ret = []
        r = random.uniform(255/members, 10 * 255/members)
        for i in range(members):
            v = int(255 - r * i)
            if v < 0:
                v = 0
            ret.append(v)

        # schift the trail by a random, so it not starts always at zero
        r = random.randint(0, len(self.char_array[0]))
        for i in range(r):
            ret = self.rot(ret)
                           
        return ret
    
    def update(self):
        for i in range(len(self.col_array)):
            v = self.velo[i]
            if (app.frames % v == 0):
                self.col_array[i] = self.rot(self.col_array[i])

    def rot(self, s):
        l = len(s)
        r = s[1:] + s[0:1]
        assert len(r) == len(s)
        return r
    
    def rnd_char(self):
        return random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789あいうえおかきくけこさしすせそたちつてとなにぬねのはひふ')


    def draw(self):
        self.app.screen.fill((0, 0, 0))
        for y in range(len(self.char_array)):
            for x in range(len(self.char_array[0])):
                char = self.char_array[y][x]
                col = self.col_array[y][x]

                text = self.font.render(char, True, (0, col, 0))
                posx = y * app.raster_x
                posy = x * app.raster_y
                posy = app.screen.get_height() - posy
                app.screen.blit(text, (posx, posy))

        pg.display.flip()
        

class App:
    def __init__(self):
        self.window_width = 1600
        self.window_height = int(self.window_width * 9 / 16)
        self.fontsize = 2 * 10
        self.raster_x = self.fontsize * 1
        self.raster_y = self.fontsize * 1
        self.icols = int(self.window_width  // self.raster_x + 1)
        self.irows = int(self.window_height //self.raster_y + 1)


        pg.init()
        self.screen = pg.display.set_mode((self.window_width, self.window_height))
        self.clock = pg.time.Clock()
        self.running = True
        self.doc = Doc(self)
        self.frames = 0

    async def run(self):
        while self.running:
            for event in pg.event.get():
                if event.type == pg.QUIT:
                    self.running = False
            self.frames += 1
            self.doc.update()
            self.doc.draw()
            self.clock.tick(60)
            await asyncio.sleep(0)
    



app = App()
asyncio.run(app.run())