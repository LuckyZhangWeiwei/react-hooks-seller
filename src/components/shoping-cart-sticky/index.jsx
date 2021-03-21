import ReactDOM from 'react-dom'
import ShopingCart from '../shoping-cart'
import './index.styl'

const ShopingCartSticky = props => {
  const {
    selectFoods,
    minPrice,
    deliveryPrice,
    onClick
  } = props

  return (
    ReactDOM.createPortal(
      <ShopingCart
        selectFoods={selectFoods}
        minPrice={minPrice}
        deliveryPrice={deliveryPrice}
        click={() => onClick()}
      /> 
      ,document.body)
  )
}

export default ShopingCartSticky

