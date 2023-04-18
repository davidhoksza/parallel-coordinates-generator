import os
import glob
import shutil


for file in glob.glob("out--*"):
    path=file.replace('--', '/')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    shutil.copy2(file, path)
    