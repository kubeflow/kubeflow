#!/bin/bash

source myenv/bin/activate

pip install torch
pip install torchvision
pip install tensorboardX
pip install numpy
pip install pandas

python /home/jovyan/mytest.py
