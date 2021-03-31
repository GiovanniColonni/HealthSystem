from flask import current_app as app
from flask import g # object used to store data of the request (expires at the end of each request9) used to avoid multiple connection creation 
# for one request
import click
import sqlite3


# this is a wrapper for a peewee database that is an object used to establish connection
# with the db, manage session and query executor
flask_db = FlaskDB(app)
# now the actual peewee db is 
database = flask_db.database

def init_app(app):
	app.teardown_appcontext(close_db)
	app.cli.add_command(init_db_command)


def get_db():
	if 'db' not in g: # if connection is not open then open it
		g.db = sqlite3.connect(
			current_app.config['DATABASE'],
			detect_types = sqlite3.PARSE_DECLTYPES
		)
		g.db.row_factory = sqlite3.Row

	return g.db # otherwise use same connection

def close_db(e=None):

	db = g.pop('db',None)
	if db is not None:
		db.close()

def init_db(): # used only to create the db
	db = get_db()
	with app.open_resource('schema.sql') as f:
		db.executescript(f.read().decode('utf8'))

@click.command('init-db')
@with_appcontext
def init_db_command(): # this is a command and maybe it will not be usefull
	# this command cleare the existing data and create new tables
	init_db()
	click.echo('Initialized  the db')
