
path = "/Users/deepakmishra/SPACE/august22/mrcp-asr/dacx/AudioStreamRecording"


import os
text_files = []
for file in os.listdir(path):
    if file.endswith(".txt"):
        text_files.append(os.path.join(path, file))


print(text_files)

for file in os.listdir(path):
    if file.endswith(".wav"):
        fname = os.path.join(path, file)
        _f = fname.replace(".wav", ".txt")
        if _f not in text_files:
            cmd = "rm {0}".format(fname)
            os.system(cmd)

