# import into transcrypt file to avoid editor errors
# from stubs import *  #__: skip

def alert(s): pass

class Console:
    def log(self, *args): pass
console = Console()

class Dokument():
    def getElementById(self, id): pass
document = Dokument()

class Window():
    def requestAnimationFrame(self, f): pass
    def setInterval(self, func, ms): pass
window = Window()

