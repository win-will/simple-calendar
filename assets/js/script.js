
var today = moment();
var dayWeek = today.format("dddd")
$("#currentDay").text(dayWeek + ", " + today.format("MMM Do"));
var container = document.getElementById("container"); 

// console.log(localStorage.getItem('simpleCalendar'));

//initialize local storage if it doesn't exist create it, else import object from local storage
var obj = {};
if (localStorage.getItem('simpleCalendar') === null){
    obj = {
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: ""
    };
}
else {
    obj = JSON.parse(window.localStorage.getItem('simpleCalendar'));

}


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

    //set the time to 12 hour
    if (i < 13) {
        time = i + " AM";
    }
    else {
        time = (i - 12) + " PM";
    } 

    //Check if anything is in local storage for each row    
    if (obj[i]){
        cellData = obj[i];
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


var eachButton = "";
for (let i=9;i < 18;i++) {

    // console.log(lockButton);
    $('#lock-btn'+i).on('click', function () {
        var field = $('#field'+i);
        obj[i] = field[0].innerHTML;
        localStorage.setItem("simpleCalendar", JSON.stringify(obj))
        
    });
}

