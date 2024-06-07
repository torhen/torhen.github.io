import pygame
from math import *
import asyncio

class Text:
    def __init__(self, app, pos, text, fontsize, color):
        self.app = app
        self.fontsize = fontsize
        self.pos = pos
        self.color = color
        self.font = pygame.font.SysFont('Consolas', self.fontsize)
        self.text = text

    def draw(self):
        img = self.font.render(self.text, True, self.color)
        self.app.screen.blit(img, self.pos)

    def handle_events(self, event):

        if event.type == pygame.KEYDOWN:

            if event.key == pygame.K_BACKSPACE:
                self.text = self.text[0:-1]
                return
            
            if event.key == pygame.K_RETURN:
                try:
                    self.app.output.text = str(eval(self.text))
                except:
                    self.app.output.text = 'ERROR'
                return
            
            if event.key == pygame.K_DELETE:
                self.text = ''
                return
            
            self.text = self.text + event.unicode
        return


class App:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((640, 480))
        self.bgcolor = (0, 0, 0)
        self.clock = pygame.time.Clock()
        self.input = Text(self, pos=(20, 20), text='sin(pi/2) # press <return> to calc', fontsize=30, color=(255,255,0))
        self.output = Text(self, pos=(20,50), text='', fontsize=30, color=(255,255,255))
        self.running = True

    def __del__(self):
        pygame.quit()


    def draw(self):
        self.screen.fill(self.bgcolor)
        self.input.draw()
        self.output.draw()
        pygame.display.flip()

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False

            self.input.handle_events(event)


    async def run(self):
        while self.running:
            self.handle_events()
            self.draw()
            self.clock.tick(60)
            await asyncio.sleep(0)

app = App()
app.run()
# asyncio.run(app.run())