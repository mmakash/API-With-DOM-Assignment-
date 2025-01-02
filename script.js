document.addEventListener("DOMContentLoaded", function () {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then((response) => response.json())
      .then((data) => displayCardData(data.drinks))
      .catch((error) => console.log(error));
  });
  
  function displayCardData(drinks) {
    // Select the nested row for cards
    const cardContainer = document.querySelector(".col-md-8 .row");
  
    drinks.forEach((drink, index) => {
        console.log(drink);
      const card = document.createElement("div");
      card.classList.add("col-md-4"); // Each card takes up 4 columns
      card.innerHTML = `
        <div class="card" style="width: 100%;">
          <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
          <div class="card-body">
            <h5 class="card-title">${drink.strDrink}</h5>
            <h5 class="card-title">${drink.strCategory}</h5>
            <p class="card-text">${drink.strInstructions.substring(0,50) + "..."}</p>
            <div>
              <a href="#" class="btn btn-primary">Add To Cart</a>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
      `;
      cardContainer.appendChild(card);
    });
  }
  