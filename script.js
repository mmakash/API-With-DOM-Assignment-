document.addEventListener("DOMContentLoaded", function () {

  // Fetch data from the API
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then(response => response.json())
        .then(data => displayCardData(data.drinks))
        .catch(error => console.log(error));

  const form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputField = document.getElementById("inputField");
    const query = inputField.value.trim();
    if (query) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.drinks) {
                    displayCardData(data.drinks);
                } else {
                    displayNotFound();
                }
            })
            .catch(error => console.log(error));
    } else {
        displayNotFound();
    }
});
});

let totalCart = 0;
const cartTableBody = document.querySelector("tbody");

function displayCardData(drinks) {
  // Select the nested row for cards
  const cardContainer = document.querySelector(".col-md-8 .row");

  drinks.forEach((drink, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4"); // Each card takes up 4 columns
    card.innerHTML = `
        <div class="card" style="width: 100%;">
          <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${
      drink.strDrink
    }">
          <div class="card-body">
            <h5 class="card-title">${drink.strDrink}</h5>
            <h5 class="card-title">${drink.strCategory}</h5>
            <p class="card-text">${
              drink.strInstructions.substring(0, 50) + "..."
            }</p>
            <div>
              <a href="#" class="btn btn-primary addToCartBtn">Add To Cart</a>
              <a href="#" class="btn btn-primary cartDetails" data-bs-toggle="modal" data-bs-target="#drinkDetailsModal">Details</a>
            </div>
          </div>
        </div>
      `;
    cardContainer.appendChild(card);
    const addToCartBtn = card.querySelector(".addToCartBtn");
    addToCartBtn.addEventListener("click", () => addToCart(drink));
    const cartDetails = card.querySelector(".cartDetails");
    cartDetails.addEventListener("click", (event) => {
      event.preventDefault();
      drinkDetails(drink.idDrink);
    });
  });
}

function displayNotFound() {
  const cardContainer = document.querySelector(".col-md-8 .row");
  cardContainer.innerHTML = `
      <div class="col-md-12">
          <div class="alert alert-danger" role="alert">
              No drinks found.
          </div>
      </div>
  `;
}


function addToCart(drink) {

  if (totalCart >= 8) {
    alert("You can only add up to 8 items to the cart.");
    return;
}

  totalCart += 1;
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.innerText = `Total Cart: ${totalCart}`;
  } else {
    console.error("Element with ID 'cartCount' not found.");
  }
  const row = document.createElement("tr");
  row.innerHTML = `
    <th scope="row">${totalCart}</th>
    <td><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="img-fluid" style="max-width: 50px;"></td>
    <td>${drink.strDrink}</td>
  `;
  cartTableBody.appendChild(row);
}

function drinkDetails(drinkId) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    .then((response) => response.json())
    .then((data) => showDetails(data.drinks[0]))
    .catch((error) => console.log(error));
}

function showDetails(drink) {
  console.log(drink);
  const modalBody = document.querySelector("#drinkDetailsModal .modal-body");
  modalBody.innerHTML = `
   <h5>${drink.strDrink}</h5>
    <img src="${drink.strDrinkThumb}" class="img-fluid" alt="${drink.strDrink}" style="max-width: 200px">
    <h5>Category: ${drink.strCategory}</h5>
    <h5>Alcoholic: ${drink.strAlcoholic}</h5>
    <p>${drink.strInstructions}</p>
`;

  // Show the modal using Bootstrap
  const drinkDetailsModal = new bootstrap.Modal(
    document.getElementById("drinkDetailsModal")
  );
  drinkDetailsModal.show();
}
