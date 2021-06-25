# teamsumo

DORIS AKPOVWA
[ドリス • アクポブワ]

NADER SALAMEH
[ナダー • セーラメ]

CARLOS PAZOS
[カルロス • パゾス]

# Who will be the next Yokozuna!!?
After the retirement of Yokozuna Kakuryu in March 2021, sumo fans are cheering for their favorite rikishi (sumo wrestler) to raise to the top rank in Sumo! Who will fill this gap? Terunofuji with his Cinderella story climbing back to Oseki rank? Seasoned rikishi Takakeisho? Time to find out and place bets!



# Grand Sumo Data
Our data is provided by @cervus in Data.World who has compiled a series of data sets including data from rikishi and basho (tournaments) from January 1983 to date March 2021. 

URL: https://data.world/cervus/sumo-japan


# Approach
We will build a dashboard to serve in an interactive way:
•	Historical data of past tournaments based on date
•	Highlights of rikishi based on selection
•	Sumo across the years:
o	Explore characteristics of wining rikishi over time to inform bets

The application will be Flask-based serving the data via API to later be visualized in the dashboard:

•	Data will be cleaned in a Python script and augmented to include the Lat and Lng information for each heya (stable or dojo of each wrestler) using a Google API call
•	Data will be stored in Postgres database
•	Data will be read from Postgres and served via a Python API using FLASK in different routes to provide information on rikishi and historical data on basho 
•	Data will be rendered in an html dashboard with the following visualizations:
o	Map of Japan indication heya for all participants of a give tournament
o	Map zooms in the location of a particular heya once a fighter is selected
o	Table of characteristics (weight & height) for selected fighter
o	Table of results for selected fighter for a particular tournament
o	Pie chart of type of kimarite (winning technique) typically used by selected wrestler to inform bet decisions
o	Line chart visualizing cumulative weight of fighters over time
o	Scatter plot visualizing historical weight of fighter vs number of wins (are bigger fighters most likely to win?)

# Application will used Bootstrap to be responsive and hosted in Heroku for final deployment.

 https://grandsumobasho.herokuapp.com/

Learn More!
Next basho is approaching soon in May 9 in Tokyo! Learn more following the broadcasts of Nippon Hoso Kyokai here: https://www3.nhk.or.jp/nhkworld/en/tv/sumo/ 

