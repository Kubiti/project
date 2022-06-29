const container = document.querySelector('.container');
const chair_count = document.querySelectorAll('.seats');
const chairs = document.getElementById('chairs')
const selected = document.querySelectorAll('.row .seats:not(.occupied)');
const occupied = document.querySelectorAll('.row .seats:not(.selected)');
const empty = document.querySelectorAll('.row .seats:not(.selected, .occupied)')
const count = document.getElementById('count');
const empty_count = document.getElementById('empty')
const occupied_count = document.getElementById('occupied')
const rows = document.getElementsByClassName('row');
const tables_html = document.getElementsByClassName('table');


let occupiedSeatsCount, selectedSeatsCount, emptySeatsCount = empty.length;

populateUI();

function updateSeatCount() {
  updateSelectedCount();
  updateOccupiedCount(); 
  updateEmptyCount();
  updateTable();
  chairs.textContent = chair_count.length;

}

// Update Selected Seat Count

function updateTable() {
  let table_rows = [], tables = [], tables_dict = [], chair_rows = [], chairs = [], chairs_status = [];

  // Getting the different chairs and tables and grouping them together

  for (let i = 0; i < rows.length; i++) {
    if (i == 0) {
      chair_rows.push(rows[i]);
      // rows[i].style.border = '5px solid white';
    }

    if (i % 3 == 0) {
      let t_i = i + 1
      table_rows.push(rows[t_i]);
      
      let first_child = rows[t_i].children[0];
      let second_child = rows[t_i].children[1];
      tables.push(first_child), tables_dict[first_child] = [];
      tables.push(second_child), tables_dict[second_child] = [];
  
      chair_rows.push(rows[t_i+1], rows[t_i+2]); // Maybe split
      let c1 = rows[t_i]
    }
  }


  for (let i = 0; i < chair_rows.length; i+=2) {
    let first_row = chair_rows[i];
    let first_row_seats = chair_rows[i];
    let second_row_seats = chair_rows[i+1];

    if (chair_rows[i+1]) {
      chairs.push([first_row_seats.children[0], first_row_seats.children[1], first_row_seats.children[2], second_row_seats.children[0], second_row_seats.children[1], second_row_seats.children[2]]);
      chairs.push([first_row_seats.children[3], first_row_seats.children[4], second_row_seats.children[3], second_row_seats.children[4]]);
    }
    
  }

  chairs_status = chairs.map(elem => {
    let return_val = true
    for (val of elem) {
      if (val.className == 'seats') {
        return_val = false;
        break
      }
    }
    return return_val;
})
  // tables[0].style.border = '5px solid white';
  for (let i = 0; i < tables.length; i++) {
    if (chairs_status[i]) {
      tables[i].classList.add('filled');
      tables[i].children[0].textContent = 'Full';
    } else {
      tables[i].classList.remove('filled');
      tables[i].children[0].textContent = 'Table';
    }
  }

}


function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seats.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...selected].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
}

// Update Occupied Seat Count
function updateOccupiedCount() {
    const occupiedSeats = document.querySelectorAll('.row .seats.occupied');
    const seatsIndex = [...occupiedSeats].map(seat => [...occupied].indexOf(seat));
    localStorage.setItem('occupiedSeats', JSON.stringify(seatsIndex));
    occupiedSeatsCount = occupiedSeats.length;
    occupied_count.innerText = occupiedSeatsCount;
  }

// Update Empty Seat Count
function updateEmptyCount() {
    // !!!!!! Code bug
    const emptySeats = document.querySelectorAll('.row .seats:not(.selected, .occupied)')
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));
    const allSeatsIndex = Array.from(Array(48).keys())

    const seatsIndex = allSeatsIndex.filter((elem, index) => occupiedSeats.indexOf(elem) < 0 && selectedSeats.indexOf(elem) < 0)
    // console.log(seatsIndex)
    // console.log('oc', occupiedSeats.length)
    // console.log('ss', selectedSeats.length)
    // console.log('es', seatsIndex.length)

    localStorage.setItem('emptySeats', JSON.stringify(seatsIndex));  // !!!!!! Code bug !!!!!
    emptySeatsCount = emptySeats.length; 
    empty_count.innerText = emptySeatsCount;
}



// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));
//   const emptySeats = JSON.parse(localStorage.getItem('emptySeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    selected.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (occupiedSeats !== null && occupiedSeats.length > 0) {
    occupied.forEach((seat, index) => {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add('occupied');
      }
    });
  }

}


// Seat click event function
function toggleSeat(e) {
  if (
    e.target.classList.contains('seats') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSeatCount();
  }
}


// Seat click event handler
container.addEventListener('click', e => {
  toggleSeat(e);

  setTimeout(() => {
    if (
      e.target.classList.contains('seats') &&
      !e.target.classList.contains('occupied') &&
      e.target.classList.contains('selected')
    ) {
      e.target.classList.toggle('selected');
      updateSeatCount();

      // !!!!!!!!!!!!! booking offense !!!!!!!!!!!!!!!
    }
    }, 15 * 60 * 1000)
  });


  // UPDATING TABLE

// Initial seat count and total set
updateSeatCount();
