export const uniqueList = (productList, text) => {
  let types = [];
  for (let i = 0; i < productList.length; i++) {
    const element = productList[i][text];
    let appendStatus = true;
    for (let j = 0; j < types.length; j++) {
      if (types[j] === element) {
        appendStatus = false;
        break;
      }
    }
    if (appendStatus) {
      types.push(element);
    }
  }

  return types; //Elimina los repetidos
};

export const optionHtml = (text) => `<option>${text}</option>`;

export const productHtml = (img, name, price) => {
  return `<article>
    <img src=${img} alt=${name}>
    <H3>${name}</H3>
    <p> ${price}$</p>
    <button class="BUY">Consigue el tuyo ahora</button>
  </article>`;
};

export const filterList = (list, id, val) => {
  let retList = [];
    // console.log(val)
  for (let i = 0; i < list.length; i++) {
    if (list[i][id] === val) {
      retList.push(list[i]);
    } else if (val === "All") {
      retList.push(list[i]);
    }
  }
  return retList;
};

export const productParser = (prodList, prodElement) => {
  let retString = "";
  prodList.forEach((prod) => {
    retString += productHtml(prod.image, prod.name, prod.price);
  });
//   console.log(retString)

  prodElement.innerHTML = retString;
};

export const filterElements = (label, inner, list) => {
  const div$$ = document.createElement("div");
  div$$.className = label;

  const label$$ = document.createElement("label");
  label$$.htmlFor = label;
  label$$.innerText = inner;
  const select$$ = document.createElement("select");
  select$$.id = label;
  select$$.innerHTML += optionHtml("All");

  for (let i = 0; i < list.length; i++) {
    select$$.innerHTML += optionHtml(list[i]);
  }

  div$$.appendChild(label$$);
  div$$.appendChild(select$$);
  // filters$$.appendChild(div$$);
  return div$$;
};

export const filterPriceElements = (label, inner) => {
  // return `<label for=${label}>${inner}</label>
  // <input id=${label} type="number" min="1" max="990" value="1">`
  const div$$ = document.createElement("div");
  div$$.className = label;

  const label$$ = document.createElement("label");
  label$$.htmlFor = label;
  label$$.innerText = inner;

  const input$$ = document.createElement("input");
  input$$.type = "Number";
  input$$.min = "0";
  input$$.max = "999";
  input$$.value = 0;
  div$$.appendChild(label$$);
  div$$.appendChild(input$$);
  return div$$;
};
export const filterContetnt= () => {
  const porductsCopy = [...products];
  const type = divType$$.querySelector("#type-filter").value;
  const brand = divBrands$$.querySelector("#brand-filter").value;
  const input = divMinPrice$$.querySelector("input").value;
  let allType = type === "All";
  let allBrand = brand === "All";
  
  let productFiltered = [];
  
  if (allBrand && allType) {
    productFiltered=porductsCopy;
  } else if (!allBrand && allType) {
    productFiltered = filterList(porductsCopy, "brand", brand);
  }else if (allBrand && !allType) {
    console.log(type)
    productFiltered = filterList(porductsCopy, "type", type);
  }else{
    const productFiltered1 = filterList(porductsCopy, "type", type);
    productFiltered = filterList(productFiltered1, "brand", brand);
  }

  const prod=productFiltered.map(()=>{

  })
  productParser(productFiltered, productos$$);
  
}
export const graterThan=(list,val)=>{
  let greaterList = [];

  for (const obj of list) {
    if (obj.price > val) {
      greaterList.push(obj);
    }
  }
  return greaterList 
}

