//intialize variables storing date information
var today = moment();
var dayWeek = today.format("dddd")
var currentDay = dayWeek + "_" + today.format("MMM") + "_" + today.format("Do")

//Get main element so we can append the table to it later
var container = document.getElementById("container"); 

//Add current day and date to the heading
$("#currentDay").text(dayWeek + ", " + today.format("MMM Do"));

//initialize local storage if it doesn't exist create it, else import object from local storage
var obj = {};
var dateEntry = {};
var jsonIndex = null;

if (localStorage.getItem('simpleCalendar') === null){
    obj = {
        dateEntries: [{
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: "",
            date: currentDay
        }]
    };
}
else {
    obj = JSON.parse(window.localStorage.getItem('simpleCalendar'));

}

//Check if the date exists in the simpleCalender local storage
//jsonIndex will track the location of the item with the current date
for (let i = 0;i < obj['dateEntries'].length; i++){
    if (obj['dateEntries'][i].date === currentDay){
        jsonIndex = i;
        break;
    }
}

//When date doesn't exist then add a new element to the timeEntries array
if (jsonIndex === null){
    obj['dateEntries'].push({
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        date: currentDay
    });
    jsonIndex = obj['dateEntries'].length - 1;
    
}

//Creating table for the calendar
//set header of table
var time = "";
var colorScheme = "";
let table = `
<table class="table timebox">
  <thead></thead>
  <tbody id=tableBody>
  `;
  
  //create//append rows
  for(i = 9; i < 18; i++){
    var rowEl = $('tbody');
    var cellData = "";
     
    //Using 24 hour time to measure if something is in the past or future
    if (i < moment().format('H')) {
        colorScheme = "past";
    }
    else if (i > moment().format('H')){
        colorScheme = "future";
    }
    else {
        colorScheme = "present";
    }

    //set the time to 12 hour time to adhere to the mock up
    if (i < 13) {
        time = i + " AM";
    }
    else {
        time = (i - 12) + " PM";
    } 

    //Check if anything is in local storage for each row
    if (obj['dateEntries'][jsonIndex][i]){
        cellData = obj['dateEntries'][jsonIndex][i];
    }

    //create rows in table
    table = table +
    `<tr class="row">
      <td class="col-1 hour">` + time + `</td>
      <td class="col-8 textField ` + colorScheme + `"><textarea  id="field` + i + `">` + cellData + `</textarea></td>
      <td class="col-1 lastCell"><button type="button" class="saveBtn btn-block" id="lock-btn` + i + `"><i class="fas fa-lock"></i></button></td>
    </tr>`;

}

table = table + `</tbody></table>`;
container.innerHTML = table;


//Create buttons for each row in the table 
//Add entries to local storage when the buttons are clicked
for (let i=9;i < 18;i++) {

    $('#lock-btn'+i).on('click', function () {
        var field = $('#field'+i);
        obj['dateEntries'][jsonIndex][i] = field[0].value;
        console.log(obj['dateEntries'][jsonIndex][i])
        localStorage.setItem("simpleCalendar", JSON.stringify(obj))
        
    });
}

