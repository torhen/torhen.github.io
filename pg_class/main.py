import pygame
import asyncio
import datetime

class App:
    def __init__(self):
        pygame.init()
        self.running = True
        self.clock = pygame.time.Clock()
        self.screen = pygame.display.set_mode((640, 480))
        self.font = pygame.font.SysFont('Consolas', 40)
        self.text = ""

    def update(self):
        self.text = str(datetime.datetime.now())


    def draw(self):
        img = self.font.render(self.text, True, (255,0,0))
        self.screen.fill((0,0,0))
        self.screen.blit(img, (10, 10))

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False

    async def run(self):
        while self.running:
            self.clock.tick(60)
            self.handle_events()
            self.update()
            self.draw()
            pygame.display.flip()
            await asyncio.sleep(0)
        pygame.quit()

def main():
    app = App()
    asyncio.run(app.run())

if __name__ == "__main__":
    main()
