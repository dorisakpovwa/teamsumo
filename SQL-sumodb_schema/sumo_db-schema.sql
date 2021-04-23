DROP TABLE IF EXISTS tournament_results;
CREATE TABLE tournament_results 
(
	--.-Name--------------------.Type----------------------.Null/NotNull
	    tournament_id         	 SERIAL  			PRIMARY KEY  
	,   tournament           	 VARCHAR(7)         NOT NULL      
	,   day                      INTEGER        	NOT NULL 
	,   fighter1_id        	     INTEGER        	NOT NULL    
	,   fighter1_rank	         VARCHAR(25)        NOT NULL 
	,   fighter1_name	         VARCHAR(60)		NOT NULL
	,   fighter1_result	         VARCHAR(60)	 	NOT NULL 
	,   fighter1_win	         INTEGER 			NOT NULL 
	,   finishing_move	         VARCHAR(60)		NOT NULL 
	,   fighter2_id        	     INTEGER        	NOT NULL    
	,   fighter2_rank	         VARCHAR(25)        NOT NULL 
	,   fighter2_name	         VARCHAR(60)	 	NOT NULL
	,   fighter2_result	         VARCHAR(60)		NOT NULL 
	,   fighter2_win	         INTEGER 			NOT NULL 
);
COPY tournament_results (tournament,	day,	fighter1_id,	fighter1_rank,	fighter1_name,	fighter1_result,	fighter1_win,	finishing_move,	fighter2_id,	fighter2_rank,	fighter2_name,	fighter2_result,	fighter2_win)
FROM '/Users/nadersalameh/repo/teamsumo/Data_Preprocessing/Tournament_Results.csv'
DELIMITER ','
CSV HEADER;

SELECT * 
FROM tournament_results

DROP TABLE IF EXISTS stables;
CREATE TABLE stables
(
	--.-Name--------------------.Type----------------------.Null/NotNull
	    id               	     INTEGER             	NOT NULL PRIMARY KEY      
	,   rank                     VARCHAR(25)           	NOT NULL 
	,   fighter        	     VARCHAR(60)             	NOT NULL
	,   dojo		     VARCHAR(25)             	NOT NULL 
	,   district		     VARCHAR(60)		NOT NULL
	,   birth_date		     DATE		 	NOT NULL 
	,   height		     FLOAT 			NOT NULL 
	,   weight		     FLOAT			NOT NULL 
	,   Lat 		     FLOAT			NOT NULL 
	,   Lng			     FLOAT			NOT NULL
	
);
COPY tournament_results (tournament,	day,	fighter1_id,	fighter1_rank,	fighter1_name,	fighter1_result,	fighter1_win,	finishing_move,	fighter2_id,	fighter2_rank,	fighter2_name,	fighter2_result,	fighter2_win)
FROM '/Users/nadersalameh/repo/teamsumo/Data_Preprocessing/stables.csv'
DELIMITER ','
CSV HEADER;
