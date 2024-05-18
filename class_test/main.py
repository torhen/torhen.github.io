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

    def draw(self):
        s = str(datetime.datetime.now())
        img = self.font.render(s, True, (255,0,0))
        self.screen.fill((0,0,0))
        self.screen.blit(img, (10, 10))


    async def run(self):
        while self.running:
            elapsed_time = self.clock.tick(60)
            dt = elapsed_time / 1000.0  # Convert to seconds

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                    
            self.draw()
            pygame.display.flip()
            await asyncio.sleep(0)
        pygame.quit()

   

def main():
    app = App()
    asyncio.run(app.run())


if __name__ == "__main__":
    main()
