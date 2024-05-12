import asyncio
import pygame
import random

pygame.init()
surface = pygame.display.set_mode((800, 500))
clock = pygame.time.Clock()


async def main():
    count = 1000

    while True:
        print(f"{count}: Hello from Pygame")
        surface.fill((0,0,0))

        for y in range(0, 500, 10):
            for x in range (0, 800, 10):
                pygame.draw.rect(surface, (random.randint(0,255),random.randint(0,255),random.randint(0,255)), pygame.Rect(x, y, 10, 10))


        pygame.display.update()
        await asyncio.sleep(0)  # You must include this statement in your main loop. Keep the argument at 0.

        if not count:
            pygame.quit()
            return
        
        #count -= 1
        clock.tick(60)

asyncio.run(main())