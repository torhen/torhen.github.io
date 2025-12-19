import pygame as pg
import random
import asyncio

class Sprite:
    def __init__(self, app):
        self.app = app
        self.max_z = 0.1 * self.app.screen.get_width()
        self.x = random.uniform(-self.max_z, self.max_z)
        self.y = random.uniform(-self.max_z, self.max_z)
        self.z = random.uniform(1, self.max_z)
        self.dz = -0.5
        self.r = self.max_z

    def draw(self):
        xs = self.app.screen.get_width() / 2  * (1 + self.x / self.z) 
        ys = self.app.screen.get_height() / 2  * (1 + self.y / self.z) 

        rs = (self.r / self.z)

        if 0 <= xs <= self.app.screen.get_width() and 0 <= ys <= self.app.screen.get_height():
            pg.draw.circle(app.screen, "white", (xs, ys), rs)

    def update(self):
        self.z = self.z + self.dz
        if self.z < 1:
            self.z = self.max_z


class App:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode( (1200, 1200//9*6), pg.RESIZABLE)
        self.clock = pg.time.Clock()
        self.running = True
        self.sprites = [Sprite(self) for _ in range(1000)]

    async def run(self):
        while self.running:
            for event in pg.event.get():
                if event.type == pg.QUIT:
                    self.running = False

            self.screen.fill("black")
            for sprite in  self.sprites:
                sprite.update()
                sprite.draw()
            pg.display.flip()
            self.clock.tick(60)
            await asyncio.sleep(0)

app = App()
asyncio.run(app.run())