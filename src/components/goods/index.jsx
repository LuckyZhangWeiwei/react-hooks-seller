import { useEffect, useState, useRef } from 'react'
import produce from 'immer'
import { CSSTransition } from 'react-transition-group'
import { getGoods } from './../../api'
import GoodsNav from './../goods-nav'
import GoodsPanel from './../goods-panel'
import ShopingCartSticky from './../shoping-cart-sticky'
import ModelLayer from './../model-layer'
import ShoppingCartList from './../shopping-cart-list'
import FoodPortal from './../food'
import './index.styl'

const Goods = props => {
  const seller = props.seller

  const [goodsCategory, setGoodsCategory] = useState([])
  const [selectFoods, setSelectFoods] = useState([])
  const [activeNavIndex, setActiveNavIndex] = useState(0)
  const [showPopupModel, setShowPopupModel] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const [showBallFlying, setShowBallFlying] = useState(null)
  const [showFoodDetail, setShowFoodDetail] = useState(false)
  const [food, setFood] = useState(null)

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

  useEffect(() => {
    if (showPopupModel) {
      setShowTransition(true)
    } else {
      setShowTransition(false)
    }
  }, [showPopupModel])

  useEffect(() => {
    if (!selectFoods.length) {
      setShowPopupModel(false)
    }
  }, [selectFoods])

  const onNavItemClick = item => {
    const ele = document.querySelector(`[data-category=${item.name}]`)
    goodsPanelRef.current.scrollToElement(ele, 300)
  }

  const onAddFood = (selectedCategory, selectedFood, target) => {
   
    if (!selectedCategory || !selectedFood) return
    
    const immeredState = produce(draft => {

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
   const immeredFood = produce(food, draft => {
    if (!draft) return
    if(draft.count > 0) {
      draft.count += 1
    } else {
      draft.count = 1
    }
   })
   setFood(immeredFood)
   
   // fix on food page, when click add to cart butn 
   if (target.target.classList[0] !== 'buy') {
    setShowBallFlying({selectedCategory, selectedFood, target})
   }
  }

  const onSubtractFood = (selectedCategory, selectedFood) => {
    if (!selectedCategory || !selectedFood) return

    const immeredState = produce(draft => {

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

     const immeredFood = produce(food, draft => {
      if (!draft) return
      if (draft.count > 0) {
        draft.count -= 1
      } else {
        draft.count = null
      }
     })
     setFood(immeredFood)
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
    setFood(food)
    setShowFoodDetail(true)
  }

  return (
    <>
      <div className="goods-container">
        <div className="goods-panel">
          <GoodsPanel
            category={goodsCategory}
            myRef={goodsPanelRef}
            addFood={(category, food, target) => onAddFood(category, food, target)}
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
        <ModelLayer 
          hide={
            () => { 
              setShowTransition(false)
              setTimeout(() => {
                setShowPopupModel(false)  
              }, 310);
            }}
          >
          <CSSTransition timeout={300} classNames="slide" in={showTransition}>
            <ShoppingCartList
              selectedFoods={selectFoods}
              goodsCategory={goodsCategory}
              addFood={(category, food, target) => onAddFood(category, food, target)}
              subtractFood={(category, food) => onSubtractFood(category, food)}
            />
          </CSSTransition>
        </ModelLayer>
      }
      {
        (props.currentTabIndex === 0 || props.showShoppingCart) &&
        <ShopingCartSticky
          selectFoods={selectFoods}
          minPrice={seller.minPrice}
          deliveryPrice={seller.deliveryPrice}
          showBallFlying={showBallFlying}
          onClick={
            () =>  {
              if (!selectFoods.length) return
              if (showPopupModel) {
                setShowTransition(false)
                setTimeout(() => {
                  setShowPopupModel(false)    
                }, 310);
              } else {
                setShowPopupModel(true)
              }
            }
          }
        />
      }
      {
        showFoodDetail && food &&
        <FoodPortal 
          food={food}
          show={showFoodDetail}
          hideFoodPortal= {() => setShowFoodDetail(false)}
          category={goodsCategory}
          addFood={(category, food, target) => onAddFood(category, food, target)}
          subtractFood={(category, food) => onSubtractFood(category, food)}
        />
      }
    </>
  )
}

export default Goods