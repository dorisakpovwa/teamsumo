//Default URLs to initialize dashboard
stables_url = 'http://127.0.0.1:5000/api/v1.0/stables'
tournament_url = 'http://127.0.0.1:5000/api/v1.0/tournament/2021.03'

//Make API calls to get data and initializa dashboard
d3.json(stables_url).then((stables_data)=> {

    d3.json(tournament_url).then((tournament_data)=> initDashboard(stables_data,tournament_data))

})
//******************************************************* */
//FUNCTION TO INITIALIZE DASHBOARD

function initDashboard(stables,tournament){
   
    //Initialize Drop Down menu for Tournament Years
    //Create List of Tournament Years
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      };
    var years = range (1983,2021);
    years = years.map(String)
    
    
    tournament_dates = []
    months = ['01','03','05','07','09','11']
    years.forEach(year=>{

        months.forEach(month =>{

            tournament_dates.push(year+'.'+month)

        })

    })
    //Remove the last months for tournaments in 2021 that have not happened
    tournament_dates = tournament_dates.slice(0,230)

    //Initialize Drop down Menu of Tournament Years
    var drop_dates = d3.select('#selDate')

    tournament_dates.forEach( item => {

        op = drop_dates.append('option')
        op.attr('value',item)
        op.text(item)
        //Set Default selection for Fighters Drop Down Menu
        if (item==='2021.03'){
            op.property("selected",true)
        }

    })   

    //Initialize List of Fighters for Default Tournament
    updateFightersList(tournament) 
    
    //Update Map with List of fighters
    updateJapanMap(tournament, stables)
    

}

//******************************************************* */
//FUNCTION TO UPDATE LIST OF FIGHTERS FOR SELECTED TOURNAMENT
function updateFightersList(tournament){

    //Initialize Drop Down Menu for Fighter Names
    var fighters = tournament.map(d => d.fighter1_name)
    var unique_fighters = fighters.filter((item, i, ar) => ar.indexOf(item) === i);
    unique_fighters.sort()

    var drop_fighters = d3.select('#selFighter')

    unique_fighters.forEach( item => {

        op = drop_fighters.append('option')
        op.attr('value',item)
        op.text(item)

    });

}

//******************************************************* */
//FUNCTION TO UPDATE MAP OF JAPAN WITH MARKERS FOR ALL FIGHTERS
function updateJapanMap(tournament, stables){


}







