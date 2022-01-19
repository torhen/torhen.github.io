import PySimpleGUI as sg
import subprocess
import webbrowser
import os

server_pid = 0

size1 = (50, 30)
size2 = (50, 10)
font = ('Consolas', 12)


def load():
    with open('index.html') as fin:
        s = fin.read()
        window['-EDIT1-'].update(s)

    with open('app.py') as fin:
        s = fin.read()
        window['-EDIT2-'].update(s)

layout = [
    [sg.Button('server', key='-SERVER-'), sg.Button('run', key='-RUN-')],
    [
        sg.Multiline('html', size=size1,  key='-EDIT1-', font=font), 
        sg.Multiline('python', size=size1,  key='-EDIT2-', font=font)
    ],
    [sg.Multiline('html', size=size2,  key='-EDIT3-')],

]

# Create the Window
window = sg.Window('Window Title', layout, resizable=True, finalize=True)
window.bind('<Configure>',"Event")

#initial load
load()

while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Cancel': # if user closes window or clicks cancel
        break

    if event == "Event":
        window['-EDIT1-'].expand(expand_x=True,expand_y=True)
        window['-EDIT2-'].expand(expand_x=True,expand_y=True)
        window['-EDIT3-'].expand(expand_x=True,expand_y=True)


    if event == '-SERVER-':
        s = subprocess.Popen(['python', '-m', 'http.server'], start_new_session=True, shell=True)
        server_pid = s.pid
        window['-EDIT3-'].update(f'start server process {server_pid}')

    if event == '-RUN-':

        # save files
        s =window['-EDIT1-'].get()
        with open('index.html', 'w') as fout:
            fout.write(s)

        s =window['-EDIT2-'].get()
        with open('app.py', 'w') as fout:
            fout.write(s)


        s =subprocess.run(['transcrypt', '-b', '-m', '-n', '-od', 'target', 'app.py'], capture_output=True)
        s = s.stdout.decode("latin-1") 
        
        window['-EDIT3-'].update(s)
        
        last_word = s.split()[-1].strip()
        if last_word == 'Ready':
            webbrowser.open(url='http://localhost:8000/', new=1, autoraise=True)



window.close()