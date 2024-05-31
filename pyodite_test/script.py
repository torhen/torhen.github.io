import pygame
import datetime
import asyncio


class App:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((640, 480))
        self.clock = pygame.time.Clock()
        self.running = True
        self.time_str = ''
        self.font = pygame.font.SysFont('Consolas', 30)

    def update(self):
        self.time_str = str(datetime.datetime.now())

    def draw(self):
        self.screen.fill((0,0,0))
        img = self.font.render(self.time_str, False, (255,0,0))
        self.screen.blit(img, (20,20))
        pygame.display.flip()
        self.clock.tick(60)

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False

    async def run(self):
        while self.running:
            self.handle_events()
            self.update()
            self.draw()
            await asyncio.sleep(0)


app = App()
app.run()