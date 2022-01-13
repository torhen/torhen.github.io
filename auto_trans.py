import subprocess
import pathlib
import time
import webbrowser

pyfile = 'app.py'
t_old = 0
while True:
    t = pathlib.Path(pyfile).stat().st_mtime
    if t != t_old:
        t_old = t
        subprocess.run(['transcrypt', '-b', '-m', '-n', '-od',  'target', pyfile])
        webbrowser.open(url='http://localhost:8000/', new=1, autoraise=True)
    time.sleep(1)