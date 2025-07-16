import subprocess
import os

words = [str(i) for i in os.listdir()]

for x in words: 
    subprocess.call("scp " + str(x) + " admin@10.10.10.10:./home/user/documents", shell=True)