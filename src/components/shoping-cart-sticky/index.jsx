import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import ShopingCart from '../shoping-cart'
import './index.styl'

const ShopingCartSticky = props => {
  const {
    goodsCategory,
    minPrice,
    deliveryPrice,
    onClick 
  } = props
  return (
    ReactDOM.createPortal(
      <ShopingCart
        goodsCategory={goodsCategory}
        minPrice={minPrice}
        deliveryPrice={deliveryPrice}
        click={() => onClick()}
      /> 
      ,document.body)
  )
}

export default ShopingCartSticky

