import time

class App:
    def __init__(self):
        self.synth = window.speechSynthesis
        self.timer_interval = 100
        self.initial_wait = 1
        self.running = True

    def speak(self, text):
        su = __new__ ( SpeechSynthesisUtterance() )
        su.text = text
        su.lang = 'de-DE'
        self.synth.speak(su)

    def test(self):
        self.speak('test')

    def update(self):
        if self.running == False:
            self.last_time = time.time()
            return
        # calc delta time to last
        delta  = time.time() - self.last_time
        self.last_time = time.time()


        # reduce wait time
        self.time_to_wait -= delta
        if self.pos >=0:
            wait, event = self.schedule[self.pos]
        else:
            wait, event = self.initial_wait, 'waiting...'
        curr_wait = str(int(self.time_to_wait) + 1)

        #update table
        for i, e in enumerate(self.schedule):
            if i == self.pos:
                document.getElementById(f'wait{i}').innerHTML = '<b>' + str(int(self.time_to_wait)) + '</b>'
                document.getElementById(f'phrase{i}').innerHTML = f'<b>{e[1]}</b>'
            else:
                document.getElementById(f'wait{i}').innerHTML = e[0]
                document.getElementById(f'phrase{i}').innerHTML = e[1]
            

        # trigger spek
        if self.time_to_wait <= 0:
            self.pos += 1
            if self.pos >= len(self.schedule):
                window.clearInterval(self.interval)
                self.pos = -1
                return
            wait_time = int(self.schedule[self.pos][0])
            self.time_to_wait = wait_time
            phrase = self.schedule[self.pos][1]

            self.speak(phrase)

    def start(self):
        self.last_time = time.time()
        self.time_to_wait = self.initial_wait # initial waiting time
        self.pos = -1 # initial position
        self.interval = window.setInterval(self.update, self.timer_interval)
        self.running = True
        document.getElementById('toggle').innerText = 'pause'

    def toggle(self):
        if self.running:
            self.running = False
            document.getElementById('toggle').innerText = 'continue'
        else:
            self.running = True
            document.getElementById('toggle').innerText = 'pause'
            #phrase = self.schedule[self.pos][1]
            #self.speak(phrase)

    def goto(self, i):
        # set 1 seccond before addressd positon to trigger speache
        self.pos = i - 1
        self.time_to_wait = 0.1
        
    def set_schedule(self, schedule_text):
        lines = schedule_text.split('\n')
        lines = [line for line in lines if len(line.strip()) > 3]
        self.schedule = [line.split(';') for line in lines]
        self.show_table()
 
    def show_table(self):

        s = """<table border=0>
            <colgroup>
                <col style="width:10px">
                <col style="width:50px">
            </colgroup>  
        """
        for i, e in enumerate(self.schedule):
            wait, phrase = e
            button = f'<td><button onClick="training.app.goto({i})">{i}</button></td>'
            s += f'<tr>{button}<td id="wait{i}">{wait}</td><td  id="phrase{i}">{phrase}</td></tr>\t'

        s += '</table>'
        document.getElementById('table').innerHTML = s



app = App()
app.set_schedule(schedule_text)