import pygame as pg
import random
import asyncio

class Writing:
    def __init__(self, app):
        self.app = app
        self.text1 = "Frohe"
        self.text2 = "Weihnachten"
        self.font = pg.font.SysFont("Roman", 110)
        self.sur1 = self.font.render(self.text1, True, (0, 200, 0))
        self.sur2 = self.font.render(self.text2, True, (0, 200, 0))
        self.z = 1000

    def update(self):
        pass

    def draw(self):
        xs = self.app.screen.get_width()
        ys = self.app.screen.get_height()

        x1 = self.sur1.get_width()
        y1 = self.sur1.get_height()

        x2 = self.sur2.get_width()
        y2 = self.sur2.get_height()

        xp1 = (xs - x1) / 2
        xp2 = (xs - x2) / 2

        y1 = 0.25 * ys
        y2 = 0.45 * ys
        self.app.screen.blit(self.sur1, (xp1, y1))
        self.app.screen.blit(self.sur2, (xp2, y2))

class Flake:
    def __init__(self, app):
        self.app = app


        self.x = random.uniform(0, 500)
        self.y = random.uniform(0, 500)
        self.z = random.uniform(20, 500)
        self.r = 1
        self.dx = random.uniform(-0.5,0.5) # flake go slighly tilted down (wind)
        self.dy = 1


    def update(self):
        self.x = self.x + self.dx
        self.y = self.y + self.dy

        if self.y > 500:
            self.y = 0

        if self.x > 500:
            self.x =  0
        
        if self.x < 0:
            self.x =  500

    def draw(self):
        xs = self.x / self.z * self.app.screen.get_width()
        ys = self.y / self.z * self.app.screen.get_width()
        rs = self.r / self.z * self.app.screen.get_width()
        pg.draw.circle(self.app.screen, (255,255,255),(xs, ys), rs)


class App:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((640, 480), pg.RESIZABLE)
        self.clock = pg.time.Clock()
        self.running = True
        pg.display.set_caption('Xmas')

        self.sprites = []
        for _ in range(3000):
            self.sprites.append(Flake(self))

        self.sprites.append(Writing(self))

        self.sprites.sort(key=lambda f: f.z)



    async def run(self):
        while self.running:
            for event in pg.event.get():
                if event.type == pg.QUIT:
                    self.running = False

            self.screen.fill( (0,0,30))


            for flake in self.sprites:
                flake.update()
                flake.draw()

            pg.display.flip()
            self.clock.tick(60)
            await asyncio.sleep(0)


app = App()
asyncio.run(app.run())