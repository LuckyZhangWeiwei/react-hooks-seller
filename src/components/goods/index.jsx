import { useEffect, useState, useRef } from 'react'
import produce from 'immer'
import { getGoods } from './../../api'
import GoodsNav from './../goods-nav'
import GoodsPanel from './../goods-panel'
import ShopingCartSticky from './../shoping-cart-sticky'
import ModelLayer from './../model-layer'
import './index.styl'

const Goods = props => {
  const seller = props.seller

  const [goodsCategory, setGoodsCategory] = useState([])
  const [selectFoods, setSelectFoods] = useState([])
  const [activeNavIndex, setActiveNavIndex] = useState(0)
  const [showPopupModel, setShowPopupModel] = useState(false)

  const goodsNavRef = useRef(null)
  const goodsPanelRef = useRef(null)

  useEffect(() => {
    getGoods().then(res => {
      setGoodsCategory(res)
    })
  }, [])

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

  const onNavItemClick = item => {
    const ele = document.querySelector(`[data-category=${item.name}]`)
    goodsPanelRef.current.scrollToElement(ele, 300)
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
    // console.log('activeNavIndex:', activeNavIndex)
    // console.log(goodsNavRef.current)
    // if (activeNavIndex >= 4) {
    //   goodsNavRef.current.scroller.scrollBy(0, -156, 300)
    // }
  }

  const onChangeNavItemIndex = activeNavIndex => {
    setActiveNavIndex(activeNavIndex)
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
            changeNavItemIndex={acitveNavIndex => onChangeNavItemIndex(acitveNavIndex)}
          />
        </div>
        <div className="goods-nav">
          <GoodsNav
            category={goodsCategory}
            navItemClick={navItem => onNavItemClick(navItem)}
            myRef={goodsNavRef} 
            ActiveNavIndex={activeNavIndex}
          />
        </div>
      </div>
      {
        showPopupModel &&
        <ModelLayer>
          <div>testtest</div>
        </ModelLayer>
      }
      {
        (props.currentTabIndex === 0 || props.showShoppingCart) &&
        <ShopingCartSticky
          selectFoods={selectFoods}
          minPrice={seller.minPrice}
          deliveryPrice={seller.deliveryPrice}
          onClick={() =>  setShowPopupModel(!showPopupModel)}
        />
      }
    </>
  )
}

export default Goods