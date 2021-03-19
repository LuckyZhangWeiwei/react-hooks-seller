import { useEffect, useState, useRef } from 'react'
import produce from 'immer'
import { getGoods } from './../../api'
import GoodsNav from './../goods-nav'
import GoodsPanel from './../goods-panel'
import ShopCart from './../shop-cart'
import './index.styl'

const Goods = props => {
  const [goodsCategory, setGoodsCategory] = useState([])

  const goodsNavRef = useRef(null)
  const goodsPanelRef = useRef(null)

  useEffect(() => {
    getGoods().then(res => {
      setGoodsCategory(res)
    })
  }, [])

  const onNavItemClick = item => {
    const ele = document.querySelector(`[data-category=${item.name}]`)
    goodsPanelRef.current.scrollToElement(ele, 500)
  }

  const onAddFood = (selectedCategory, selectedFood) => {
   const immeredState = produce((draft) => {

    const selectedCateIndex = goodsCategory.findIndex(category => {
      return category.name === selectedCategory.name
    })

    const selectedFoodIndex = goodsCategory[selectedCateIndex].foods.findIndex(food => {
      return food.name === selectedFood.name
    })

    if (draft[selectedCateIndex].foods[selectedFoodIndex].count) {
      draft[selectedCateIndex].foods[selectedFoodIndex].count += 1
    } else {
      draft[selectedCateIndex].foods[selectedFoodIndex].count = 1
    }
    
   })
   setGoodsCategory(immeredState)
  }

  const onSubtractFood = (selectedCategory, selectedFood) => {
    const immeredState = produce((draft) => {

      const selectedCateIndex = goodsCategory.findIndex(category => {
        return category.name === selectedCategory.name
      })
  
      const selectedFoodIndex = goodsCategory[selectedCateIndex].foods.findIndex(food => {
        return food.name === selectedFood.name
      })
  
      if (draft[selectedCateIndex].foods[selectedFoodIndex].count > 1) {
        draft[selectedCateIndex].foods[selectedFoodIndex].count -= 1
      } else {
        draft[selectedCateIndex].foods[selectedFoodIndex].count = undefined
      }
      
     }) 
     setGoodsCategory(immeredState)
  }

  const adjustNavPos = activeNavIndex => {
    console.log('activeNavIndex:', activeNavIndex)
    console.log(goodsNavRef.current)
  }
  
  const onJumpToDetailPage = food => {
    console.log('onJumpToDetailPage:', food)
  }

  return (
    <>
      <div className="goods-container">
        <div className="goods-panel">
          <GoodsPanel
            category={goodsCategory}
            myRef={goodsPanelRef}
            addFood={(category, food) => onAddFood(category, food)}
            subtractFood={(category, food) => onSubtractFood(category, food)}
            jumpToDetailPage={food => onJumpToDetailPage(food)}
            adjustNavPosition={acitveNavIndex => adjustNavPos(acitveNavIndex)}
          />
        </div>
        <div className="goods-nav">
          <GoodsNav
            category={goodsCategory}
            navItemClick={navItem => onNavItemClick(navItem)}
            myRef={goodsNavRef} />
        </div>
      </div>
      <ShopCart goods={goodsCategory} />
    </>
  )
}

export default Goods