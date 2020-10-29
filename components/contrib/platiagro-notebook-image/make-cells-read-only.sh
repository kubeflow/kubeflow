#!/bin/bash
cat << EOF > make_cells_read_only.py
#!/opt/conda/bin/python
from json import dumps, loads


with open("output.ipynb", "rb") as notebook_file:
	notebook = loads(notebook_file.read())
	cells = notebook['cells']
	for cell in cells:
		metadata = cell['metadata']
		metadata['deletable'] = False
		metadata['editable'] = False

	f = open("output.ipynb", "w")
	f.write(dumps(notebook, sort_keys=True, indent=4))
	f.close()

EOF

chmod 755 make_cells_read_only.py
./make_cells_read_only.py
