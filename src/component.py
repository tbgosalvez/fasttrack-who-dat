from ast import arg
from os import path
from sys import argv

fileArgs = []
componentPath = "components"
nestedFolder = ""

if argv[1].startswith("nested="):
	nestedFolder = argv[1][7:]
	componentPath = path.join(componentPath, nestedFolder)
	fileArgs = argv[2:]
else:
	fileArgs = argv[1:]

if __name__ == '__main__':
	for param in fileArgs:
		with open(path.join(componentPath, f"{param}.js"), 'w') as ff:
			ff.write(f'''
import React from 'react';
import styles from "./{param}.module.css";

const {param} = props => {{
	return (
		<div>
			
		</div>
	);
}}

export default {param};
''')
		
			print(f"{param} component created.")

		with open(path.join(componentPath, f"{param}.module.css"), 'w') as css:
			css.write("")
			print(f"{param} stylesheet created.")

