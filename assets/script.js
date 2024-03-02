import { flavors, stock } from "./data.js";

const basket = {
  "Choco Fudge": "",
  Avocado: "",
  "Mango Cheesecake": "",
  Ubeybe: "",
  "Classic Milk Tea": "",
  "Sweet Taro": "",
  "Black Forest": "",
  "Red Velvet": "",
  "White Rabbit": "",
  "Melon Na": "",
  "Buko Pandan": "",
  Strawberry: "",
};
const dot = document.getElementById("dot");

flavors.forEach((flavor) => {
  const flavorElement = document.createElement("div");
  flavorElement.classList.add("flavor");
  if (stock[flavor.name]) {
    flavorElement.style.backgroundColor = `#${flavor.backgroundColor}`;
  } else {
    flavorElement.style.backgroundColor = "lightgrey";
  }

  const label = document.createElement("div");
  label.classList.add("label");
  if (stock[flavor.name]) {
    label.style.backgroundColor = `#${flavor.labelBackgroundColor}`;
    label.style.color = `#${flavor.fontColor}`;
  } else {
    label.style.backgroundColor = "smoky white";
    label.style.color = "lightgrey";
  }
  label.textContent = flavor.name;

  flavorElement.appendChild(label);
  document.getElementsByClassName("container")[0].appendChild(flavorElement);

  flavorElement.addEventListener("click", handleFlavorClick);
});

const orderForm = document.getElementById("order-form");
orderForm.addEventListener("close", () => {
  basket[document.getElementById("f-name").textContent] =
    document.getElementById("order").value;

  let count = 0;
  for (const flavor in basket) {
    if (basket[flavor] !== "0" && basket[flavor] !== "") {
      count++;
    }
  }

  if (count) {
    dot.style.display = "flex";
    dot.textContent = count;
  } else {
    dot.style.display = "none";
  }
});

const basketContent = document.getElementById("order-tally");
const basketIcon = document.getElementById("basket");
basketIcon.addEventListener("click", () => {
  while (basketContent.firstChild) {
    basketContent.removeChild(basketContent.firstChild);
  }

  let totalQuantity = 0;
  for (const flavor in basket) {
    const order = parseInt(basket[flavor]);
    if (order > 0) {
      totalQuantity += order;
      const entry = document.createElement("p");
      entry.textContent = `${flavor}: ${order}`;
      basketContent.appendChild(entry);
    }
  }

  if (totalQuantity) {
    const totalBill = document.createElement("p");
    totalBill.textContent = `That would be Php ${totalQuantity * 15}.`;
    basketContent.appendChild(document.createElement("hr"));
    basketContent.appendChild(totalBill);
  }

  if (basketContent.firstChild) {
    const cancelBtn = document.createElement("form");
    const btn2 = document.createElement("button");
    btn2.setAttribute("formmethod", "dialog");
    btn2.textContent = "Hide Order";
    cancelBtn.append(btn2);
    basketContent.appendChild(cancelBtn);

    const placeOrderBtn = document.createElement("form");
    const btn = document.createElement("button");
    btn.setAttribute("formmethod", "dialog");
    btn.setAttribute("id", "place-order-btn");
    btn.textContent = "Place Order";
    placeOrderBtn.append(btn);
    basketContent.appendChild(placeOrderBtn);

    btn.addEventListener("click", () => {
      document.getElementById("construction-notice").showModal();
    });
  } else {
    const message = document.createElement("p");
    message.textContent = "Your basket is empty.";
    basketContent.appendChild(message);

    const okBtn = document.createElement("form");
    const btn = document.createElement("button");
    btn.setAttribute("formmethod", "dialog");
    btn.textContent = "Ok";
    okBtn.append(btn);
    basketContent.appendChild(okBtn);
  }

  basketContent.showModal();
});

// events handlers
function handleFlavorClick(e) {
  const flavorName = document.getElementById("f-name");
  flavorName.textContent = e.target.textContent;
  document.getElementById("stock").textContent = stock[flavorName.textContent];
  document
    .getElementById("order")
    .setAttribute("max", stock[flavorName.textContent]);
  document.getElementById("order").value = basket[flavorName.textContent];

  if (stock[flavorName.textContent] === 0) {
    document.getElementById("order-label").style.display = "none";
    document.getElementById("order").style.display = "none";
    document.getElementById("cancelBtn").style.display = "block";
    document.getElementById("confirmBtn").style.display = "none";
  } else {
    document.getElementById("order-label").style.display = "block";
    document.getElementById("order").style.display = "block";
    document.getElementById("cancelBtn").style.display = "none";
    document.getElementById("confirmBtn").style.display = "block";
  }

  orderForm.showModal();
}

// aesthetics
dot.style.top = `${basketIcon.getBoundingClientRect().top + 5}px`;
dot.style.left = `${basketIcon.getBoundingClientRect().left}px`;

// console.log(window.screen.height)
// console.log(window.screen.width)
