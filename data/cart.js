
export let cart=[
  {id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
   quantity:2
  },
  {id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity:2
  }
]

export function removeFromCart(productId){
  const newCart=[]
  cart.forEach((item)=>{
    if (item.id !== productId){
      newCart.push(item)
    }
    
  })
  console.log(newCart)
  cart=newCart
  document.querySelector(`.js-cart-item-${productId}`).remove()

}