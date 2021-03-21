import ReactDOM from 'react-dom'
import ShopingCart from '../shoping-cart'
import Balls from './../balls'
import './index.styl'

const ShopingCartSticky = props => {
  const {
    selectFoods,
    minPrice,
    deliveryPrice,
    showBallFlying,
    onClick
  } = props

  return (
    ReactDOM.createPortal(
      <>
        <ShopingCart
          selectFoods={selectFoods}
          minPrice={minPrice}
          deliveryPrice={deliveryPrice}
          click={() => onClick()}
        />
        <Balls showBallFlying={showBallFlying} />
      </> 
      ,document.body)
  )
}

export default ShopingCartSticky

