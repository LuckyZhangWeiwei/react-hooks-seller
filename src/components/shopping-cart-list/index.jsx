import './index.styl'
import Scroller from './../scroller'
import CartControl from './../cart-control'

const ShoppingCartLine = props => {
  const { food, selectedGoodsCategory, addFood, subtractFood } = props

  const onAddFood = (food, target) => {
    addFood(selectedGoodsCategory, food, target)
  }
  const onDescrease = food => {
    subtractFood(selectedGoodsCategory, food)
  }
  return (
    <div className="food">
      <span className="name">{food.name}</span>
      <div className="price">￥{food.price}</div>
      <div className="cart-control-wrapper">
      <CartControl
        food={food}
        onAdd={(food, target) => onAddFood(food, target)}
        onDescrease={() => onDescrease(food)}
        useTransition={false}
      />
      </div>
    </div>
  )
}

const ShoppingCartList = props => {
  const clearShoppingCart = e => {
    console.log(e)
  }
  const getSelectedCategory = (goodsCategory, selectedFood) => {
    for (let categoryIndex = 0; categoryIndex < goodsCategory.length; categoryIndex++) {
      for (let foodIndex = 0; foodIndex < goodsCategory[categoryIndex].foods.length; foodIndex++) {
        if (goodsCategory[categoryIndex].foods[foodIndex].name === selectedFood.name) {
          return goodsCategory[categoryIndex]
        }
      }
    }
  }

  return (
    <div className="popup-content" onClick={e => {e.stopPropagation()}}>
      <div className="listHeader">
        <h1 className="title">购物车</h1>
        <span className="empty" onClick={e => clearShoppingCart(e)}>清空</span>
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
                selectedGoodsCategory={getSelectedCategory(props.goodsCategory, food)}
                addFood={props.addFood}
                subtractFood={props.subtractFood}
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