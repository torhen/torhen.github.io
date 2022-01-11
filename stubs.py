# import into transcrypt file to avoid editor errors
# from stubs import *  #__: skip

def alert(s): pass

class Console:
    def log(self, *args): pass
console = Console()

class Dokument():
    def getElementbyId(self, id): pass
document = Dokument()

class Window():
    def requestAnimationFrame(self, f): pass
window = Window()

