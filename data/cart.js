export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[]
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId){
  let matchingItem;
  cart.forEach((item)=>{
    if (item.id===productId){
      matchingItem=item
    }
  })
  if(matchingItem){
    matchingItem.quantity+=1
  }
  else{
  cart.push({
    id:productId,
    quantity:1
  })}
  
saveToStorage()
}


export function removeFromCart(productId){
  const newCart=[]
  cart.forEach((item)=>{
    if (item.id !== productId){
      newCart.push(item)
    }
    
  })
  cart=newCart
  document.querySelector(`.js-cart-item-${productId}`).remove()
  saveToStorage()

}