import pygame
import asyncio
import random

class Circle():
    def __init__(self, app, x, y, r, dx, dy, color):
        self.screen = app.screen
        self.x = x
        self.y = y
        self.r = r
        self.dx = dx
        self.dy = dy
        self.color = color

    def draw(self):
        pygame.draw.circle(self.screen, self.color, (self.x, self.y), self.r)

    def update(self):
        self.x += self.dx
        self.y += self.dy
        if self.x < 0 or self.x > self.screen.get_width():
            self.dx = -self.dx
        if self.y < 0 or self.y > self.screen.get_height():
            self.dy = -self.dy



class App:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((800, 600))
        self.clock = pygame.time.Clock()
        self.fps = 60
        self.dt = -1
        self.running = True
        self.bg_color = (0, 0, 0)
        self.font_color = (255, 255, 255)
        self.font = pygame.font.SysFont('Consolas', 16)

        self.circle_list = []
        for i in range(1000):
            x = random.randint(0, self.screen.get_width())
            y = random.randint(0, self.screen.get_height())
            dx = random.randint(-10, 10)
            dy = random.randint(-10, 10)
            r = 5
            color = (random.randint(0,255), random.randint(0,255), random.randint(0, 255))
            circle = Circle(self, x, y, r, dx, dy, color)
            self.circle_list.append(circle)

    def __del__(self):
        pygame.quit()
        print('bye')

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.running = False

    def update(self):
        for circle in self.circle_list:
            circle.update()

    def draw(self):
        self.screen.fill(self.bg_color)
        for circle in self.circle_list:
            circle.draw()

        # fps info
        fps_meas = 'fps:' + str(round(self.clock.get_fps(), 1))
        img = self.font.render(fps_meas, False, self.font_color)
        self.screen.blit(img, (10, 10))
        pygame.display.flip()

    async def run(self):
        while self.running:
            self.handle_events()
            self.update()
            self.draw()
            self.dt = self.clock.tick(self.fps)
            await asyncio.sleep(0)
        

app = App()
asyncio.run(app.run())
