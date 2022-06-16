const container = document.querySelector('.container');
const selected = document.querySelectorAll('.row .seats:not(.occupied)');
const occupied = document.querySelectorAll('.row .seats:not(.selected)');
const empty = document.querySelectorAll('.row .seats:not(.selected, .occupied)')
const count = document.getElementById('count');
const empty_count = document.getElementById('empty')
const occupied_count = document.getElementById('occupied')

let occupiedSeatsCount, selectedSeatsCount, emptySeatsCount = empty.length;

populateUI();

function updateSeatCount() {
  updateSelectedCount();
  updateOccupiedCount(); 
  updateEmptyCount();
}

// Update Selected Seat Count
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
    console.log(seatsIndex)
    console.log('oc', occupiedSeats.length)
    console.log('ss', selectedSeats.length)
    console.log('es', seatsIndex.length)

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
  }, 15 * 60)
});

// Initial seat count and total set
updateSeatCount();
