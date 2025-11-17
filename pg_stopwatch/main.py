import pygame as pg
import time
import asyncio

# pygbag --ume_block=0 .


class App:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((640, 480))
        self.clock = pg.time.Clock()
        self.font = pg.font.Font(None, 100)
        self.running = True

        self.start_time = time.time()
        self.cur_time = 0
        self.clamp = -1

    async def run(self):
        while self.running:
            for e in pg.event.get():
                if e.type == pg.QUIT:
                    self.running = False

                if e.type == pg.KEYDOWN:
                    if e.key == pg.K_r:
                        self.reset()
                    if e.key == pg.K_p:
                        self.pause()

                
            self.update()
            self.draw()
            await asyncio.sleep(0)

    def update(self):
        self.cur_time = time.time() - self.start_time

        if self.clamp >= 0:
            delta = self.cur_time -self.clamp
            self.start_time = self.start_time + delta


    def draw(self):
        self.screen.fill((200,200,200))

        t = int(self.cur_time)
        h, r = divmod(t, 3600)
        m, r = divmod(r, 60)
        s = r

        out = f"{h:02}:{m:02}:{s:02}"
        text = self.font.render(out, True, (0,0,0))

        x = (self.screen.get_width() - text.get_width())/2
        y = (self.screen.get_height() - text.get_height())/2

        self.screen.blit(text, (x, y))
        pg.display.flip()
        self.clock.tick(60)

    def pause(self):
        if self.clamp < 0:
            self.clamp = self.cur_time
        else:
            self.clamp = -1

    def reset(self):
        self.start_time = time.time()
        self.clamp=0


async def main():
    app = App()
    await app.run()

asyncio.run(main())