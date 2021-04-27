
//******************************************************* */
//FUNCTION TO INITIALIZE DASHBOARD

function initDashboard(){
   
    //Change flag for function to be callend just one time
    initDashboard = noop; // swap the functions

    //Initialize Drop Down menu for Tournament Years
    //Create List of Tournament Years
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      };
    var years = range (1983,2021);
    years = years.map(String)
    
    
    // tournament_dates = []
    months = ['01','03','05','07','09','11']
    // years.forEach(year=>{

    //     months.forEach(month =>{

    //         tournament_dates.push(year+'.'+month)

    //     })

    // })
    // //Remove the last months for tournaments in 2021 that have not happened
    // tournament_dates = tournament_dates.slice(0,230)

    //Initialize Drop Down Menu of Tournament Years
    var drop_dates = d3.select('#selYear')

    years.forEach( item => {

        op = drop_dates.append('option')
        op.attr('value',item)
        op.text(item)
        // //Set Default selection for Fighters Drop Down Menu
        // if (item==='2021.03'){
        //     op.property("selected",true)
        // }

    })
    
    //Initialize Drop Down Menu of Tournament Months
    var drop_months = d3.select('#selMonth')

    months.forEach( item => {

        op = drop_months.append('option')
        op.attr('value',item)
        op.text(item)

    })

    

}

//******************************************************* */
//FUNCTION TO UPDATE LIST OF FIGHTERS FOR SELECTED TOURNAMENT
function updateFightersList(tournament){

    //Initialize Drop Down Menu for Fighter Names
    var fighters = tournament.map(d => d.fighter1_name)
    var unique_fighters = fighters.filter((item, i, ar) => ar.indexOf(item) === i);
    unique_fighters.sort()

    var drop_fighters = d3.select('#selFighter')
    drop_fighters.html("")
    unique_fighters.forEach( item => {

        op = drop_fighters.append('option')
        op.attr('value',item)
        op.text(item)

    });

    updateImage()

}

//******************************************************* */
//FUNCTION TO UPDATE MAP OF JAPAN WITH MARKERS FOR ALL FIGHTERS
function updateJapanMap(tournament, stables){


}

//******************************************************* */
//FUNCTION TO UPDATE IMAGE OF FIGHTER
function updateImage(){

        //Get the filter for Fighter
        var Fighter = document.getElementById("selFighter");
        var FighterFilter = Fighter.options[Fighter.selectedIndex].text;
        console.log(FighterFilter)

        //Default URLs to initialize dashboard
        image_url = 'http://127.0.0.1:5000/api/v1.0/img/'+FighterFilter

        //Call API to get url
        d3.json(image_url).then((img_data)=>{

            console.log(img_data[0].image_url)
            image_div = d3.select('#fighter_img')
            image_div.html("")
            image_div.append('img')
            .attr('class','picture')
            .attr('src',img_data[0].image_url)
            .attr('width','50')
            .attr('height','60')
            
        })

}

//******************************************************* */
//TRIGGER EVENT FOR DATE CHANGE
var dropYear = d3.select('#selYear')
var dropMonth = d3.select('#selMonth')
dropYear.on('change', newTournament)
dropMonth.on('change', newTournament)

function newTournament(){

    
    //Get the filter for Year
    var Year = document.getElementById("selYear");
    var YearFilter = Year.options[Year.selectedIndex].text;
    console.log(DateFilter)

    //

    //Get the filter for Month
    var Month = document.getElementById("selMonth");
    var MonthFilter = Month.options[Month.selectedIndex].text;



    //concatenate date to be used in API
    var DateFilter = YearFilter+'.'+MonthFilter

    
    //Default URLs to initialize dashboard
    stables_url = 'http://127.0.0.1:5000/api/v1.0/stables'
    tournament_url = 'http://127.0.0.1:5000/api/v1.0/tournament/'+DateFilter

    //Make API calls to get data and initializa dashboard
    d3.json(stables_url).then((stables_data)=> {

        d3.json(tournament_url).then((tournament_data)=> {
            
            initDashboard(stables_data,tournament_data)
            //Initialize List of Fighters for Default Tournament
            updateFightersList(tournament_data) 
    
            //Update Map with List of fighters
            updateJapanMap(tournament_data, stables_data)

            //Update Fighter Stats

            //Update Fighter Image
            

            //Update Pie Chart

            //Update Table
        
        
        })

    })

};

initDashboard()
// this function does nothing, 
function noop() {};
d3.select("#selYear").dispatch("change")






