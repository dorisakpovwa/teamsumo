from flask import Flask, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

################################################
# Database Setup
#################################################
#Connect to Postgress
rds_connection_string = "carlospazos@127.0.0.1:5432/sumo_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
results = Base.classes.tournament_results
fighters = Base.classes.stables

# Create an instance of Flask
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Route to render index.html template using data from Mongo
@app.route("/")
def home():


    # Return template and data
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)