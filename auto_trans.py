import subprocess
import pathlib
import time

pyfile = 'app.py'
t_old = 0
while True:
    t = pathlib.Path(pyfile).stat().st_mtime
    if t != t_old:
        t_old = t
        subprocess.run(['transcrypt', '-b', '-m', '-n', '-od',  'target', pyfile])
    time.sleep(1)