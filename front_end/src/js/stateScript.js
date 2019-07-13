//state 
var co2Anomaly = false;
var temperatureAnomaly = false;
var DewpointAnomaly = false;
var HumidityAnomaly = false;

// doc.elements 
var co2BorderVal = document.getElementById("co2Border");
var temperatureBorder = document.getElementById("tempBorder");
var DewpointBorder = document.getElementById("dewPointBorder");
var HumidityBorder = document.getElementById("humidityBorder");

//normal day 
function case_1() {
    
    co2Anomaly = false;
    temperatureAnomaly = false;
    DewpointAnomaly = false;
    HumidityAnomaly = false;
    anomalyState();
    resetSensor();
    hideSensors();
}

function case_2() {
    resetSensor();
    hideSensors();
    co2Anomaly = true;
    sensors[0].state = "above";
    sensors[2].state = "below";
    temperatureAnomaly = false;
    DewpointAnomaly = false;
    HumidityAnomaly = false;
    anomalyState();
    showAnomalySensors();
   
}

function case_3() {
    resetSensor();
    hideSensors();
    co2Anomaly = true;
    temperatureAnomaly = false;
    sensors[0].state = "above";
    sensors[3].state = "below";
    DewpointAnomaly = false;
    HumidityAnomaly = true;
    sensors[14].state = "above";
    sensors[15].state = "disable";
    anomalyState();
    showAnomalySensors();
}

function case_4() {
    resetSensor();
    hideSensors();
    co2Anomaly = false;
    temperatureAnomaly = true;
    sensors[4].state = "disable";
    sensors[5].state = "below";
    sensors[6].state = "disable";
    sensors[7].state = "disable";
    DewpointAnomaly = false;
    HumidityAnomaly = false;
    anomalyState();
    showAnomalySensors();
}

function case_5() {
    resetSensor();
    hideSensors();
    co2Anomaly = false;
    temperatureAnomaly = false;
    DewpointAnomaly = true;
    sensors[10].state = "above";
    HumidityAnomaly = false;
    anomalyState();
    showAnomalySensors();
   
    anomalyState();
}



function anomalyState() {
    if (co2Anomaly == true)
        co2BorderVal.className = "card text-white bg-redState";
    else
        co2BorderVal.className = "card text-white bg-greenState";

    if (temperatureAnomaly == true)
        temperatureBorder.className = "card text-white bg-redState";
    else
        temperatureBorder.className = "card text-white bg-greenState";

    if (DewpointAnomaly == true)
        DewpointBorder.className = "card text-white bg-redState";
    else
        DewpointBorder.className = "card text-white bg-greenState";

    if (HumidityAnomaly == true)
        HumidityBorder.className = "card text-white bg-redState";
    else
        HumidityBorder.className = "card text-white bg-greenState";
}

//cards
function Sensor(type, location, state, anomaly) {
    this.type = type;
    this.location = location;
    this.state = state;
    this.anomaly = anomaly;
}

var co2Seonsors = new Array();
var tempSeonsors = new Array();
var dewPointSeonsors = new Array();
var humiditySeonsors = new Array();

for (let i = 0; i < 4; i++) {
    co2Seonsors[i] = new Sensor("co2", i, "normal", false);
    tempSeonsors[i] = new Sensor("Temperature", i, "normal", false);
    dewPointSeonsors[i] = new Sensor("Dew Point", i, "normal", false);
    humiditySeonsors[i] = new Sensor("Humidity", i, "normal", false);
}


// cards
//document.getElementById("showAnomaly").innerHTML = ' <div class="col-sm-6 col-lg-3"> <div class="brand-card"> <div class="brand-card-header bg-danger"> <i class="fa fa-facebook"></i><div class="text-value text-center">Co2</div><div class="chart-wrapper"><canvas id="social-box-chart-1" height="90"></canvas></div></div><div class="brand-card-body"><div><div class="text-value">2</div><div class="text-uppercase text-muted small">Location</div></div><div><div class="text-value">Above</div><div class="text-uppercase text-muted small">Average</div></div></div></div></div>';

var card = new Array();
for (let i = 0; i < 4; i++) {
    card[i] = document.getElementById("card_" + i);
    card[i + 4] = document.getElementById("card_" + (i+4));
    card[i + 8] = document.getElementById("card_" + (i+8));
    card[i + 12] = document.getElementById("card_" + (i+12));
   // card[i].childNodes[1].childNodes[1].childNodes[1].innerHTML = "co2";
    //card[i + 4].childNodes[1].childNodes[1].childNodes[1].innerHTML = "temperature";
}   
for (let i = 0; i < 4; i++) {
 
    card[i + 4].childNodes[1].childNodes[1].childNodes[1].innerHTML = "temperature";
    card[i + 8].childNodes[1].childNodes[1].childNodes[1].innerHTML = "dew Point ";
    card[i + 12].childNodes[1].childNodes[1].childNodes[1].innerHTML = "humidity";
}  

// set up sensors
var sensors = new Array();
var j = 0; 
for (let i = 0; i < card.length; i++) {
    
    if(i < 4){
        sensors[i] =  co2Seonsors[i];
    }
    else if(i < 8){
        sensors[i] =  tempSeonsors[i-4];
    }
    else if(i < 12){
        sensors[i] =  dewPointSeonsors[i-8];
    }
    else{
        sensors[i] =  humiditySeonsors[i-12];
    }
}

// set up block 
for (let i=0; i<card.length;i++){
    card[i].style.display = "none";
}

function showSensors(){
    evaluate();
    for (let i=0; i<card.length;i++){
        card[i].style.display = "block";
    }
}

function showAnomaliesSensors(){
    evaluate();
    showAnomalySensors();
}

function hideSensors(){
    evaluate();
    for (let i=0; i<card.length;i++){
        card[i].style.display = "none";
    }
}

function showAnomalySensors(){
    evaluate();
    for (let i=0; i<card.length;i++){
        if(sensors[i].state != "normal")
            card[i].style.display = "block";

        if(sensors[i].state == "normal")
            card[i].style.display = "none";    
    }
}

function resetSensor(){
    for (let i=0; i<sensors.length;i++){
        sensors[i].state = "normal";
    }
}


// evaluate 
function evaluate(){

    // add the color to the cars 
    for (let i=0; i<card.length;i++){
        if(sensors[i].state == "normal"){
            card[i].childNodes[1].childNodes[1].className = "brand-card-header bg-green";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML = "Normal";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].innerHTML = "State";
        }
        else if(sensors[i].state == "above" ){
            card[i].childNodes[1].childNodes[1].className = "brand-card-header bg-red";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML = "Above";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].innerHTML = "Average";
        }
        else if(sensors[i].state == "below"){
            card[i].childNodes[1].childNodes[1].className = "brand-card-header bg-red";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML = "Below";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].innerHTML = "Average";
        }
        else if(sensors[i].state == "disable"){
            card[i].childNodes[1].childNodes[1].className = "brand-card-header bg-primary";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML = "Disable";
            card[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].innerHTML = "Sensor";
        }
    }
}

// card[0].childNodes[1].childNodes[1] -> <div class="brand-card-header bg-danger">
// card[1].childNodes[1].childNodes[1].childNodes[1].innerHTML ---> text
// card[1].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML -> "normal"
// card[1].childNodes[1].childNodes[3].childNodes[3].childNodes[3].innerHTML = "state"