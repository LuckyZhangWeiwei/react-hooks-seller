import { useState, useEffect } from 'react'
import classnames from 'classnames'
import './index.styl'

const ShopCart = props => {
  const {
    goodsCategory,
    minPrice,
    deliveryPrice
  } = props

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [des, setDes] = useState(null)
  const [selectFoods, setSelectFoods] = useState([])

  useEffect(() => {
    let total =0
    let count = 0
    selectFoods.forEach(food => {
      total += food.price * food.count
      count += food.count
    })
    setTotalPrice(total)
    setTotalCount(count)

    if (totalPrice === 0) {
      setDes(`￥${minPrice}元起送`)
    } else if (totalPrice < minPrice) {
      let diff = minPrice - totalPrice
      setDes(`还差${diff}元起送`)
    } else {
      return setDes('去结算')
    }
  }, [selectFoods])

  useEffect(() => {
    let array = []
    goodsCategory.forEach(category => {
      category.foods.forEach(food => {
        if (food.count) {
          array.push(food)
        }
      })
    })
    setSelectFoods(array)
  }, [goodsCategory])

  const payClass = () => {
    if (!totalCount || totalPrice < minPrice) {
      return 'not-enough'
    } else {
      return 'enough'
    }
  }

  return (
    <div className="shopcart-container">
      <div className="shopcart">
        <div className="content">
          <div className="content-left">
            <div className="logo-wrapper">
              <div className={classnames('logo',{'highlight': totalCount > 0})}>
                <i className="icon-shopping_cart"></i>
              </div>
              {
                totalCount &&
                <div className="num"></div>
              }
            </div>
            <div className="price" className={classnames('price', {'highlight': totalCount > 0})}>
              ￥{totalPrice}
            </div>
            <div className="desc">另需配送费￥{deliveryPrice}元</div>
          </div>
          <div className="content-right">
            <div className={`pay ${payClass()}`}>
              {des}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCart