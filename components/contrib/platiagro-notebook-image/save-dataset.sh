#!/bin/bash
cat << EOF > save_dataset.py
#!/opt/conda/bin/python
from glob import glob
from platiagro import save_dataset
import pandas as pd


csv_path = glob("/tmp/data/*.csv")[-1]
dataset = csv_path.split('/')[-1]

try:
    df = pd.read_csv(csv_path)
    save_dataset(name=dataset, df=df)
except pd.errors.EmptyDataError:
    content = open(csv_path, "rb")
    save_dataset(name=dataset, data=content)

EOF

chmod 755 ./save_dataset.py
./save_dataset.py
