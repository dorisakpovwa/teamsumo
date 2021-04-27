
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
    

    //Initialize Drop Down Menu of Tournament Years
    var drop_dates = d3.select('#selYear')

    years.forEach( item => {

        op = drop_dates.append('option')
        op.attr('value',item)
        op.text(item)
        
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

    console.log(stables)
    console.log(tournament) 
    //create the map object
    let myMap = MapObject();
    myMap.invalidateSize()

    //create the base layers.baselayers is a dictionary/Object
    let baseLayers = createBaseLayers();

    //Add Default Layer
    myMap.addLayer(baseLayers["Dark Map"]);
    

    markers = createMarkers(stables);
    

    //Create Overlay Maps
    var overlayMaps = {

        "Markers": markers

    }

    //Add Default Layer
    L.control.layers(baseLayers,overlayMaps, {
        collapsed: false
    }).addTo(myMap)
      

};

function MapObject(){

    var centerCoords = [38.652832, 139.839478];
    var mapZoomLevel = 5;
    var myMap = L.map("mapid", {
      center: centerCoords,
      zoom: mapZoomLevel    
    });
    return myMap

};

function createBaseLayers(){

    var lightmap = L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "light-v10",
          accessToken: API_KEY,
        }
      );
    
    var darkmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY,
    }
    );

    var baseMaps = {
        "Light Map": lightmap,
        "Dark Map": darkmap
      };
      return baseMaps;
};

function createMarkers(stables){

    // Initialize an object containing icons for each layer group
    var icons = {
        
        FIGHTER: L.ExtraMarkers.icon({
        icon: "heart",
        iconColor: "white",
        markerColor: "red",
        shape: "penta"
        })
    };
    //Create Markers 
    markers=[]
    stables.forEach(d =>{      

       markers.push(
            L.marker([d.Dojo.latitude,d.Dojo.longitude],{

                icon: icons.FIGHTER
            })        
        
        )       

    }) 

    return L.layerGroup(markers)

}

//END OF FUNCTIONS TO UPDATE MAP OF JAPAN
//******************************************************* */

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
    console.log(YearFilter)

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






