from flask import Flask, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from config import password
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

################################################
# Database Setup
#################################################
#Connect to Postgress
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/sumo_db')
connection = engine.connect()

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


# route to stables 
@app.route("/api/v1.0/stables")
def fighter():

    # create session
    session = Session(engine)

    #collect fighters
    fighter = session.query(fighters.fighter).all()

    dictionary_list = []
    for fighter in fighter:

        # gather fighter names
        fighter_dictionary = {}
        fighter_dictionary["Fighter_Name"] = fighter[0]

        #gather fighter stats
        attributes = session.query(fighters.id, fighters.rank, fighters.birth_date, fighters.height, fighters.weight).filter(fighters.fighter == fighter).all()
        for Id, rank, birth_date, height, weight in attributes:
            attribute_dictionary = {}
            attribute_dictionary["id"] = Id
            attribute_dictionary["rank"] = rank
            attribute_dictionary["birth_date"] = birth_date.strftime("%m/%d/%Y")  
            attribute_dictionary["height"] = height 
            attribute_dictionary["weight"] = weight 

        #gather dojo data
        dojo_location = session.query(fighters.dojo, fighters.district, fighters.lat, fighters.lng).filter(fighters.fighter == fighter).all()
        for dojo, district, lat, lng, in dojo_location:
            dojo_location_dictionary = {}
            dojo_location_dictionary["dojo_name"] = dojo 
            dojo_location_dictionary["district"] = district
            dojo_location_dictionary["latitude"] = lat
            dojo_location_dictionary["longitude"] = lng

        #setting up the json 
        fighter_dictionary["Fighter_Info"] = attribute_dictionary
        fighter_dictionary["Dojo"] = dojo_location_dictionary
        
        dictionary_list.append(fighter_dictionary)

    return jsonify(dictionary_list)


if __name__ == "__main__":
    app.run(debug=True)