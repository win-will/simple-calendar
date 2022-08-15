var today = moment();
var dayWeek = today.format("dddd")
$("#currentDay").text(dayWeek + ", " + today.format("MMM Do"));

let container = document.getElementById("container"); 

//set header of table
var time = ""
let table = `
<table class="table timebox">
  <thead></thead>
  <tbody>
  `;
  //create//append rows
  //<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"></path>
  //viewBox="0 0 16 16"
  //width="16" height="16" 
  for(i = 9; i < 18; i++){
    if (i < 13) {
        time = i + " AM";
    }
    else {
        time = (i - 12) + " PM";
    } 
    table = table +
    `<tr class="row">
      <td class="col-1 hour">` + time + `</td>
      <td class="col-7" contenteditable="true"></td>
      <td class="col-1 lastCell"><button type="button" class="saveBtn btn-block"><i class="fas fa-lock"></i></button></td>
    </tr>`;
}

// let grid = `<div class="timebox">`;
// for(i = 9; i < 18; i++){
//     grid = grid + 
//     `<div class="row">
//         <div class="col-1">1 of 3</div>
//         <div class="col-5">2 of 3</div>
//         <div class="col-1"><button type="button" class="saveBtn"></button>
//         </div>
//     </div>`
// }
//close off table
table = table + `</tbody></table>`;
container.innerHTML = table;
// grid = grid + `</div>`;
// container.innerHTML = grid;