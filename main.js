import "./style.css";
import products from "./products";
import {
  uniqueList,
  filterList,
  productParser,
  filterElements,
  filterPriceElements,
  graterThan,
  getRandomElements,
} from "./functions.js";

const app$$ = document.querySelector("#app");
//Main
const main$$ = document.createElement("main");

//Header
const header$$ = document.createElement("header");
header$$.innerHTML = `<img src="./logo.jpeg" alt="logo rubik as a planet">
<h1>puzzleplanet</h1>`;

//------Sections------
////FILTERS---------------
const filters$$ = document.createElement("section");

// Filter h2
filters$$.className = "filters";
const filterH2$$ = document.createElement("h2");
filterH2$$.textContent = "FILTROS: ";

// FilterH2 to filter section
filters$$.appendChild(filterH2$$);

// Type filter
const types = uniqueList(products, "type");
const divType$$ = filterElements("type-filter", "Tipo de cubo: ", types);
filters$$.appendChild(divType$$);

// brand filters

const brands = uniqueList(products, "brand");
const divBrands$$ = filterElements("brand-filter", "Marcas: ", brands);
filters$$.appendChild(divBrands$$);

// min price filter
const divMinPrice$$ = filterPriceElements("minPrice-filter", "Min Price: ");
filters$$.appendChild(divMinPrice$$);

// filters buttons
const FiltersButtons$$ = document.createElement("div");
FiltersButtons$$.className = "filter-buttons";

const filterButton$$ = document.createElement("button");
filterButton$$.className = "filter";
const searchImg$$ = document.createElement("img");
searchImg$$.src = "./filtrar.png";

const deleteFilterButton$$ = document.createElement("button");
deleteFilterButton$$.className = "delete-filter";
const searchDeleImg$$ = document.createElement("img");
searchDeleImg$$.src = "./Quitar filtros.png";

filterButton$$.appendChild(searchImg$$);
FiltersButtons$$.appendChild(filterButton$$);
deleteFilterButton$$.appendChild(searchDeleImg$$);
FiltersButtons$$.appendChild(deleteFilterButton$$);

filters$$.appendChild(FiltersButtons$$);

// All filters to main
main$$.appendChild(filters$$);

////Products
const productos$$ = document.createElement("section");
productos$$.className = "products";
productos$$.id = "products";

!  productParser(products, productos$$);

// Products to section
//appends to app
app$$.appendChild(header$$);
main$$.append(productos$$);
app$$.appendChild(main$$);

//----------------------EVENTS------------------------//

filterButton$$.addEventListener("click", () => {
  const porductsCopy = [...products];
  const type = divType$$.querySelector("#type-filter").value;
  const brand = divBrands$$.querySelector("#brand-filter").value;
  const input = divMinPrice$$.querySelector("input").value;
  let allType = type === "All";
  let allBrand = brand === "All";

  let productFiltered = [];

  if (allBrand && allType) {
    productFiltered = porductsCopy;
  } else if (!allBrand && allType) {
    productFiltered = filterList(porductsCopy, "brand", brand);
  } else if (allBrand && !allType) {
    productFiltered = filterList(porductsCopy, "type", type);
  } else {
    const productFiltered1 = filterList(porductsCopy, "type", type);
    productFiltered = filterList(productFiltered1, "brand", brand);
  }

  productFiltered=productFiltered.filter((obj) => obj.price >= input);

  productParser(
    productFiltered,
    productos$$,
    getRandomElements(products,3)
  );

});

deleteFilterButton$$.addEventListener("click", () => {
  productParser(products, productos$$);

  divType$$.querySelector("#type-filter").value = "All";
  divBrands$$.querySelector("#brand-filter").value = "All";
  divMinPrice$$.querySelector("input").value = 0;
});
