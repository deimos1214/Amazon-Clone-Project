import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


function pageLoad() {
  let html=''
  cart.forEach((product, index) => {
    const productId = product.id;
    let matchingProduct;
    products.forEach((item) => {
      if (item.id == productId) {
        matchingProduct = item;
      }
    });
    const deliveryOptionId = product.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.deliveryId === deliveryOptionId) deliveryOption = option;
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, "day");
    const dateString = deliveryDate.format("dddd, MMMM, D");
    html += `
  <div class="cart-item-container js-cart-item-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      product.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-cart-item"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${updateDeliveryDate(matchingProduct.id, product)}
            </div>
          </div>`;

    ;
  });
  function updateDeliveryDate(matchingProductId, product) {
    console.log(product.deliveryOptionId);
    let deliveryOptionsHTML = "";
    deliveryOptions.forEach((deliveryOption, i) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryTime, "day");
      const dateString = deliveryDate.format("dddd, MMMM, D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
      const isChecked = deliveryOption.deliveryId === product.deliveryOptionId;
      deliveryOptionsHTML += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProductId}"
    data-delivery-option-id="${deliveryOption.deliveryId}">
     <input type="radio" ${
       isChecked ? "checked" : ""
     } class="delivery-option-input"name="delivery-option-${matchingProductId}">
    <div>
    <div class="delivery-option-date">
    ${dateString}
    </div>
    <div class="delivery-option-price">
    ${priceString}
    </div>
    </div>
    </div>
    `;
    });
    return deliveryOptionsHTML;
  }
  //console.log(updateDeliveryDate())
    document.querySelector(".js-cart-item-grid").innerHTML= html;

  document.querySelectorAll(".js-delete-cart-item").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      pageLoad()
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((optn) => {
    optn.addEventListener("click", () => {
      const { productId, deliveryOptionId } = optn.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      pageLoad();
    });
  });
}
pageLoad();
