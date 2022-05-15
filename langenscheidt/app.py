class App:
    def __init__(self):
        self.canvas = document.getElementById('my_canvas')
        self.canvas.width = 500
        self.canvas.height = 750
        self.ctx = self.canvas.getContext('2d')
        self.img = document.getElementById('my_img')

    def button_click(self):
        name = document.getElementById('my_input').value
        app.draw(name)

    def draw(self, name):
        #self.ctx.strokeRect(0, 0, self.canvas.width, self.canvas.height)
        self.ctx.drawImage(self.img, 0, 0)
        self.ctx.font = 'bold 42px arial'
        self.ctx.fillStyle = '#0A92BF'

        txt1 = f'{name} - deutsch'
        txt2 = f'deutsch - {name}'

        x = 60
        y = 580

        self.ctx.fillText(txt1, x, y)
        self.ctx.fillText(txt2, x, y + 50)


app = App()
app.button_click()


