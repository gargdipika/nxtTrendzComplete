import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        let updatedEachItem
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity + 1
          updatedEachItem = {...eachItem, quantity: updatedQuantity}
        } else {
          updatedEachItem = eachItem
        }
        return updatedEachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const cartList = this.state
    console.log(cartList)

    const findItem = cartList.cartList.find(eachItem => eachItem.id === id)

    console.log(findItem)

    if (findItem.quantity === 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          let updatedEachItem
          if (eachItem.id === id) {
            if (eachItem.quantity > 1) {
              const updatedQuantity = eachItem.quantity - 1
              updatedEachItem = {...eachItem, quantity: updatedQuantity}
            }
          } else {
            updatedEachItem = eachItem
          }
          return updatedEachItem
        }),
      }))
    }
  }

  addCartItem = product => {
    const cartList = this.state
    console.log(cartList)

    const findItem = cartList.cartList.find(
      eachItem => eachItem.id === product.id,
    )

    if (findItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          let updatedEachItem
          if (eachItem.id === product.id) {
            const updatedQuantity = eachItem.quantity + 1
            updatedEachItem = {...eachItem, quantity: updatedQuantity}
          } else {
            updatedEachItem = eachItem
          }
          return updatedEachItem
        }),
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
