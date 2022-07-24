'''
	quick-and-dirty.
	just adds the things to the ends
	of the files because we can't seek
	backwards anymore for encoding reasons.

	we're likely to reorganize the added lines anyway.

	example:
	  python3 add_action.py -r loading_reducer set_loading_songs_pending
	or use the bash script:
	  ./add_action -r loading_reducer set_loading_songs_pending
	  ./add_action -r loading_reducer -t function reset_round
'''

from os import path, getcwd
from sys import argv


reducer_file = ''
action_args = []
pwd = getcwd()


def validate():
	if not argv[1].startswith('-r'):
		print("please specify a reducer with -r option")
		return

def create_action():
	action_type = 'object'
	reducer_file = f'{argv[2]}.js'

	if argv[3].startswith('-t'):
		if argv[4].__contains__('func'):
			action_type = 'function'
			action_args = argv[5:]
	else:
		action_args = argv[3:]

	for action in action_args:
		action_constant = f'\tstatic {action.upper()} = "{action.upper()}";\n'
		action_object = f'\tstatic {action.lower()} = {{ type: CONSTANTS.{action.upper()} }}'
		action_function = \
f'''	static {action.lower()}(a) {{
			return {{type: CONSTANTS.{action.upper()}, data: a}}	
	}}'''
		reducer_case = \
f'''	case CONSTANTS.{action.upper()}:
		return {{...state}};
'''

		with open(path.join(pwd, 'CONSTANTS.js'), 'a+') as ff:
			ff.seek(0, 2)
			ff.writelines(['\n', action_constant])

		with open(path.join(pwd, 'state', 'actions.js'), 'a+') as ff:
			ff.seek(0,2)
			added_action = ''
			if action_type == 'object': 
				added_action = action_object 
			else: 
				added_action =  action_function
			ff.writelines(['\n', added_action])

		with open(path.join(pwd, 'state', reducer_file), 'a+') as ff:
			ff.seek(0,2)
			ff.writelines(['\n', reducer_case])

if __name__ == '__main__':
	validate()
	create_action()