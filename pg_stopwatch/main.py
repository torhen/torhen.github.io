import pygame as pg
import time
import asyncio

# pygbag --ume_block=0 .


class Button:
    def __init__(self, parent, caption, x, y, dx, dy, color, func, fontsize):
        self.parent = parent
        self.caption = caption
        self.rect = (x ,y, dx, dy)
        self.x, self.y, self.dx, self.dy = x, y, dx, dy
        self.color = color
        self.func = func
        self.font = pg.font.Font(None, fontsize)

    def draw(self, screen):
        pg.draw.rect(screen, self.color, self.rect)
        text = self.font.render(self.caption, True, (0,0,0))
        x = (self.dx - text.get_width()) / 2
        y = (self.dy - text.get_height()) / 2
        screen.blit(text, (self.x + x, self.y + y))

    def handle_event(self, e):
        if e.type == pg.MOUSEBUTTONDOWN:
            if e.button == 1:  # Left mouse button
                mouse_pos = e.pos
                # # Check if it is inside the button
                r = pg.Rect(self.x, self.y, self.dx, self.dy)
                if r.collidepoint(mouse_pos):
                    self.func()

class Timer():
    def __init__(self):
        self.start_time = time.time()
        self.cur_time = 0
        self.clamp = -1

    def update(self):
        self.cur_time = time.time() - self.start_time

        if self.clamp >= 0:
            delta = self.cur_time -self.clamp
            self.start_time = self.start_time + delta

    def pause(self):
        if self.clamp < 0:
            self.clamp = self.cur_time
        else:
            self.clamp = -1

    def reset(self):
        self.start_time = time.time()
        self.clamp=0

class App:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((400, 250))
        pg.display.set_caption("Stopwatch")
        self.clock = pg.time.Clock()
        self.font = pg.font.Font(None, 125)
        self.running = True

        self.timer = Timer()
        button_dx = 150
        button_dy = 70
        y = 140
        self.b1 = Button(self, caption='Reset',      x =25,                                  y=y, dx=button_dx, dy=button_dy, color=(255,255,255), func=self.timer.reset, fontsize=40)
        self.b2 = Button(self, caption='Start/Stop', x=self.screen.get_width()-25-button_dx, y=y, dx=button_dx, dy=button_dy, color=(255,255,255), func=self.timer.pause, fontsize=40)

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

                self.b1.handle_event(e)
                self.b2.handle_event(e)

                
            self.update()
            self.draw()
            await asyncio.sleep(0)

    def update(self):
        self.timer.update()

    def draw(self):
        self.screen.fill((200,200,200))

        t = int(self.timer.cur_time)
        h, r = divmod(t, 3600)
        m, r = divmod(r, 60)
        s = r

        # display time
        out = f"{h:02}:{m:02}:{s:02}"
        text = self.font.render(out, True, (0,0,0))
        x = (self.screen.get_width() - text.get_width())/2
        y = 30
        if self.timer.clamp >= 0: # blinking
            if int(time.time() * 10) % 10 > 5:
                self.screen.blit(text, (x, y))
        else: # not blinking
            self.screen.blit(text, (x, y))

        # display buttons
        self.b1.draw(self.screen)
        self.b2.draw(self.screen)
        pg.display.flip()
        self.clock.tick(60)


app = App()
asyncio.run(app.run())