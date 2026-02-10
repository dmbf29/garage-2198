// Task: Display all the cars in the awesome garage

// 0a. Select the cars-list
// 0b. Create a function to fetchCars
// 1. set the URL
// 2. Make a GET request
// 3. user the data (from the API) to build a car div
// 4. add the car div into the cars-list

const buildCar = (car) => {
  return `<div class="car">
    <div class="car-image">
      <img src="https://random-pic-a92f0baa4c2c.herokuapp.com/${car.brand}" />
    </div>
    <div class="car-info">
      <h4>${car.brand} - ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
    </div>
  </div>`;
};

// const carsList = document.getElementById("cars-list");
const carsList = document.querySelector(".cars-list");
const url = "https://garage.api.lewagon.com/awesome/cars";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((car) => {
      // car is an object -> build html using the object
      carsList.insertAdjacentHTML("beforeend", buildCar(car)); // return an "html" string
      // carsList.innerHTML += buildCar(car); // return an "html" string
    });
  });

// 0. select the form on the page "car-form"
const carForm = document.querySelector(".car-form");
const stringify = JSON.stringify({ model: "asdasldkj" });
// 1. add event listener for submit
carForm.addEventListener("submit", (event) => {
  // 2. prevent the refreshing of the page
  event.preventDefault();
  // 3. get form data (get the values from the input)
  const formData = new FormData(event.target);
  const dataString = JSON.stringify(Object.fromEntries(formData));

  // const formInfo = JSON.stringify({model: ,brand: , owner: , plate:})
  // 4. POST the new car info with fetch and the awesome url
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataString,
  })
    .then((response) => response.json())
    .then((data) => {
      carsList.insertAdjacentHTML("beforeend", buildCar(data));
    });
  // 5. display the car that was created
});
