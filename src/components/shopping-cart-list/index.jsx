import './index.styl'
import Scroller from './../scroller'
import CartControl from './../cart-control'

const ShoppingCartLine = props => {
  const { food } = props
  return (
    <div className="food">
      <span className="name">{food.name}</span>
      <div className="price">￥{food.price}</div>
      <div className="cart-control-wrapper">
      <CartControl
        food={food}
      />
      </div>
    </div>
  )
}

const ShoppingCartList = props => {
  return (
    <div className="popup-content" onClick={e => {e.stopPropagation()}}>
      <div className="listHeader">
        <h1 className="title">购物车</h1>
        <span className="empty">清空</span>
      </div>
      <div>
      <div className="list-content">
        <Scroller data={props.selectedFoods} myStyle={{maxHeight: '250px'}}>
          {
            props.selectedFoods.map((food, index) => {
              return (
              <ShoppingCartLine
                key={index}
                food={food}
              />
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