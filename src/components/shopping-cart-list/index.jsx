import './index.styl'
import Scroller from './../scroller'
import CartControl from './../cart-control'

const ShoppingCartList = props => {
  return (
    <div className="cube-popup-content" onClick={e => {e.stopPropagation()}}>
      <div className="listHeader">
        <h1 className="title">购物车</h1>
        <span className="empty">清空</span>
      </div>
      <div>
      <div className="list-content">
        <Scroller data={props.selectedFoods}>
          {
            props.selectedFoods.map((food, index) => {
              return (
              <div key={index} className="food">
                <span className="name">{food.name}</span>
                <div className="price">￥{food.price}</div>
                <div className="cart-control-wrapper">
                <CartControl
                  food={food}
                />
                </div>
              </div>
              )
            })
          }
        </Scroller>
      </div>
      </div>
    </div>
   
  )
}

export default ShoppingCartList