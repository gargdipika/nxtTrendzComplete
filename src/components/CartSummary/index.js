// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const count = cartList.length

      const priceAndQuantityDetails = cartList.map(eachItem => ({
        eachItemPrice: eachItem.price,
        eachItemQuantity: eachItem.quantity,
      }))
      console.log(priceAndQuantityDetails)
      const price = priceAndQuantityDetails.map(
        eachItem => eachItem.eachItemPrice * eachItem.eachItemQuantity,
      )

      const totalPrice = price.reduce((first, second) => first + second)

      return (
        <div>
          <h1 className="order-detail">
            Order Total: <span className="span-style">{totalPrice}/-</span>
          </h1>
          <p className="order-item-number">{count} items in cart</p>
          <button type="button" className="bg-primary">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
