#!/bin/bash
cat << EOF > save_dataset.py
#!/opt/conda/bin/python
from os import getenv
from platiagro import save_dataset
import pandas as pd


dataset = getenv("DATASET", "")
try:
    dataframe = pd.read_csv(dataset)
    save_dataset(dataset, dataframe)
except pd.errors.EmptyDataError:
    file_open = open(dataset,'rb')
    save_dataset(dataset, file_open)
   
EOF

chmod 755 save_dataset.py
./save_dataset.py