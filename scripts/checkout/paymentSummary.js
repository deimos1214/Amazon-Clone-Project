import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function paymentSummary(){
let totalPriceInCents = 0;
let matchingProduct;
let matchingOption;
let itemQuantity = 0
let priceString=0;

cart.forEach((product, index) => {
  const productId = product.id;
  itemQuantity += product.quantity
  products.forEach((item) => {
    if (item.id == productId) {
      matchingProduct = item;
    }
    
  });
  totalPriceInCents += matchingProduct.priceCents;
})  
cart.forEach((cartProduct)=>{
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.deliveryId===cartProduct.deliveryOptionId){
      matchingOption=deliveryOption
    }
    
  })
  priceString+=matchingOption.priceCents
})

const totalPrice = (totalPriceInCents / 100).toFixed(2)

const totalBeforeTax=((totalPriceInCents+priceString)/100).toFixed(2);
const totalTax=((((totalPriceInCents+priceString)/100)*0.1))*100
let totalAfterTax;
totalAfterTax=((totalBeforeTax*100+totalTax)/100).toFixed(2)
document.querySelector('.payment-summary').innerHTML=`
<div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemQuantity}):</div>
            <div class="payment-summary-money">$${totalPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(priceString/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(totalTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalAfterTax}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`
console.log(priceString,"Price")
      }