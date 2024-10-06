//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

const movieDropdown = document.getElementById("selectMovie");
const movieName = document.getElementById("movieName");
const moviePrice = document.getElementById("moviePrice");
const totalPrice = document.getElementById("totalPrice");
const seats = document.querySelectorAll(".seat:not(.occupied)");
const newSelectedSeats = [];
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const selectedSpans = selectedSeatsHolder.querySelectorAll("span");
const noOfSeats = document.getElementById("numberOfSeat");
const noSelectedSpan = selectedSeatsHolder.querySelector("span.noSelected");

const rows = document.querySelectorAll(".row");

// const seatsNotLegend = document.querySelectorAll(".seat:not(.occupied)");
// Use moviesList array for displaing the Name in the dropdown menu
// creating options for select tag of movie.
moviesList.forEach((movie) => {
  let option = document.createElement("option");
  option.text = movie.movieName;
  option.value = movie.movieName;
  option.className = "movieOption";
  movieDropdown.appendChild(option);
});
// changing movie name, price & totalePrice

movieDropdown.addEventListener("change", function () {
  // Find the selected movie in the array
  const selectedMovie = moviesList.find(
    (movie) => movie.movieName === movieDropdown.value
  );
  // Update the name and price
  movieName.textContent = selectedMovie.movieName;
  moviePrice.textContent = `$ ${selectedMovie.price}`;
  totalPrice.textContent = `$ ${selectedMovie.price}`;
  // removing only those seats that are newly added
  // const seats = document.querySelectorAll(".seat.occupied:not(.legend)");
  // seats.forEach((seat) => {
  //   seat.classList.remove("occupied");
  // });
  newSelectedSeats.forEach((seat) => {
    seat.classList.remove("occupied");
  });
  // removing selected seat numbers.
  const noSelectedSpan =
    selectedSeatsHolder.querySelectorAll("span.selectedSeat");
  noSelectedSpan.forEach((span) => {
    selectedSeatsHolder.removeChild(span);
  });

  // selectedSpans.forEach((span) => {
  //   selectedSeatsHolder.remove("selectedSeat");
  // });
  const newSelectedSpan = document.createElement("span");
  newSelectedSpan.className = "noSelected";
  newSelectedSpan.textContent = "No Seat Selected";
  selectedSeatsHolder.appendChild(newSelectedSpan);
});

//Add eventLister to each unoccupied seat
seats.forEach((seat) => {
  seat.addEventListener("click", function () {
    // storing selected seat in array.
    newSelectedSeats.push(seat);
    // if the seat is already selected diselect it: otherwise select it.
    seat.classList.toggle("selected");
    // adding selected seat numbers
    displaySeatNumber();

    updateTotalPrice(movieDropdown.value);
  });
});

function displaySeatNumber() {
  // if (noSelectedSpan) {
  //   selectedSeatsHolder.removeChild(noSelectedSpan);
  // }
  if (noSelectedSpan && selectedSeatsHolder.contains(noSelectedSpan)) {
    selectedSeatsHolder.removeChild(noSelectedSpan);
  }
  // Clear previous selected seat numbers
  // selectedSeatsHolder.innerHTML = "";
  const span = document.createElement("span");
  span.className = "selectedSeat";
  span.textContent = 50;
  selectedSeatsHolder.appendChild(span);
}

function updateTotalPrice(dropdownName) {
  let selectedMovie = moviesList.find(
    (movie) => movie.movieName === dropdownName
  );
  const finalSelectedSeats = document.querySelectorAll(
    ".seat.selected:not(.legend)"
  );
  const finalPrice = finalSelectedSeats.length * selectedMovie.price;
  totalPrice.textContent = `$ ${finalPrice}`;
  // Updteing seat numbers.
  const noOfSeats = document.getElementById("numberOfSeat");
  noOfSeats.textContent = finalSelectedSeats.length;
}

// function updateTotalPrice(dropdownName) {
//   let selectedMovie = moviesList.find(movie => movie.movieName === dropdownName);
//   const selectedSeats = document.querySelectorAll(".seat.selected:not(.legend)");
//   const finalPrice = selectedSeats.length * selectedMovie.price;

//   totalPrice.textContent = `$ ${finalPrice}`;
//   const noOfSeats = document.getElementById("numberOfSeat");
//   noOfSeats.textContent = selectedSeats.length;

//   // Update selected seats display
//   updateSelectedSeatsDisplay();
// }

// function updateSelectedSeatsDisplay() {
//   const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
//   const selectedSeats = document.querySelectorAll(".seat.selected:not(.legend)");

//   if (selectedSeats.length > 0) {
//       const seatNumbers = Array.from(selectedSeats).map(seat => seat.textContent);
//       selectedSeatsHolder.innerHTML = seatNumbers.join(', ');
//   } else {
//       selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
//   }
// }

//Add eventLsiter to continue Button

const continueBtn = document.getElementById("proceedBtn");
continueBtn.addEventListener("click", function () {
  const selectedSeats = document.getElementById("numberOfSeat").textContent;
  if (selectedSeats === "0") {
    alert("Oops no seat Selected");
  } else {
    alert("Yayy! Your Seats have been booked");
  }

  // removing selected class and adding occupied.
  const allSelectedSeats = document.querySelectorAll(
    ".seat.selected:not(.legend)"
  );
  allSelectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });

  // Update the total price and set it to 0
  totalPrice.textContent = `$ 0`;
  noOfSeats.textContent = 0;
  // const noOfSeats = document.getElementById("numberOfSeat");
});

//Add eventListerner to Cancel Button

const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", function () {
  const allSelectedSeats = document.querySelectorAll(
    ".seat.selected:not(.legend)"
  );
  allSelectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  // Update the total price and set it to 0
  totalPrice.textContent = `$ 0`;
  // const noOfSeats = document.getElementById("numberOfSeat");
  noOfSeats.textContent = 0;

  const noSelectedSpan =
    selectedSeatsHolder.querySelectorAll("span.selectedSeat");
  noSelectedSpan.forEach((span) => {
    selectedSeatsHolder.removeChild(span);
  });
});
