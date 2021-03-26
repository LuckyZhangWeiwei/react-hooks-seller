import { useState, useEffect, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import produce from 'immer'
import Scroller from './../scroller'
import GoodsFixedCategory from './../goods-fixed-category'
import CartControl from './../cart-control'
import './index.styl'

const FIXED_TITLE_HEIGHT = 26
const IMAGE_SIZE = 57

const GoodslItem = props => {
  const {food, item, descrease, increase, onClickFoodItem} = props
  return (
    <li className="food-item" onClick={() => onClickFoodItem(food)}>
      <div className="icon">
        <LazyLoadImage 
          src={food.image} 
          alt={food.name}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          effect="blur" />
      </div>
      <div className="content">
        <h2 className="name">{food.name}</h2>
        <p className="desc">{food.description}</p>
        <div className="extra">
          <span className="count">
            月售{food.sellCount}份</span><span>好评率{food.rating}%
          </span>
        </div>
        <div className="price">
          <span className="now">￥{food.price}</span>
          {
            food.oldPrice &&
            <span className="old">￥{food.oldPrice}</span>
          }
        </div>
        <div className="cart-control-wrapper">
          <CartControl
            food={food}
            onDescrease={(food) => descrease(item, food)}
            onAdd={(food, e) => increase(item, food, e)}
            useTransition={true} />
        </div>
      </div>
    </li>
  )
}

const GoodsPanel = props => {
  const category = props.category

  const [listHeight, setListHeight] = useState([])

  const [currentItem, setCurrentItem] = useState({
    index: 0,
    text: null
  })

  const categoryContainerRef = useRef(null)

  const goodsFixedCategoryRef = useRef(null)

  useEffect(() => {
    if (props.category.length > 0) {
      const categoryContainer = document.querySelectorAll('.category-item-container')
      categoryContainerRef.current = categoryContainer

      const list = Array.from(categoryContainerRef.current)
      if (list.length > 0) {
        let tempList = []
        let height = 0
        for (let item of list) {
          height += item.clientHeight
          tempList.push(height)
        }
        setListHeight(tempList)
      }
      const immeredState = produce(currentItem, draft => {
        draft.text = category[0].name
       })
       // add init value
       setCurrentItem(immeredState)
    }
  }, [props.category])

  useEffect(() => {
    if (!props.isJumpScroll) {
      props.changeNavItemIndex(currentItem.index)
    }
    props.adjustNavPosition(currentItem.index)
  }, [currentItem.index])

  const onFoodsPanelScrolling = pos => {
    const { y } = pos
    // when pull down the scroller, should hide the fixed title
    if (y > 0) {
      goodsFixedCategoryRef.current.style.display = "none"
    } else {
      goodsFixedCategoryRef.current.style.display = "block"
    }

    for (let i = 0; i < listHeight.length; i++) {
      let h1 = listHeight[i]
			let h2 = listHeight[i + 1]
      if (-y >= h1 && -y < h2) {
       const immeredState = produce(currentItem, draft => {
         if (!props.isJumpScroll) {
          draft.index = i + 1
         }
        draft.text = category[i + 1].name
       })
       setCurrentItem(immeredState)
        // handle fixed title transition
        if(h2 - FIXED_TITLE_HEIGHT <= -y) {
          let detla2 = -(FIXED_TITLE_HEIGHT-(h2 + y))
          goodsFixedCategoryRef.current.style.transform = `translate3d(0, ${detla2}px, 0)`
        } else {
          goodsFixedCategoryRef.current.style.transform = `translate3d(0, 0, 0)`
        }
      } else if (-y < listHeight[0] && -y > 0) {
        // handle on first category
        const immeredState = produce(currentItem, draft => {
        if (!props.isJumpScroll) {
          draft.index = 0
        }
        draft.text = category[0].name
        })
        setCurrentItem(immeredState)
        // handle the first fixed category transition up
        const value = goodsFixedCategoryRef.current.style.transform
        if (value) {
          if (goodsFixedCategoryRef.current.style.transform !== 'translate3d(0, 0, 0)') {
            // fixed some time fixed categorty transion "too" up bug
          goodsFixedCategoryRef.current.style.transform = 'translate3d(0, 0, 0)'
          }
        }
        if (listHeight[0] - FIXED_TITLE_HEIGHT <= -y) {
          let detla = -(FIXED_TITLE_HEIGHT-(listHeight[0] + y))
          goodsFixedCategoryRef.current.style.transform = `translate3d(0, ${detla}px, 0)`  
        }  
      }
    }
  }

  const onClickFoodItem = food => {
    props.jumpToDetailPage(food)
  }

  const descrease = (category, food) => {
    props.subtractFood(category, food)
  }

  const increase = (category, food, e) => {
    props.addFood(category, food, e)
  }

  return (
    <>
      <Scroller
        className={props.className}
        ref={props.myRef}
        probeType={3}
        data={category}
        listenScroll={pos => onFoodsPanelScrolling(pos) }
        scrollEnd={() => props.onScrollEnd()}>
        <>
          {
            category.map((item, index) => {
              return (
                <div key={index} className="category-item-container">
                  <div className="category-title" data-category={item.name}>
                    <h2 className="category-name">{item.name}</h2>
                  </div>
                  <ul>
                    {
                      item.foods.map((food, foodIndex) => {
                        return (
                          <GoodslItem
                            key={foodIndex}
                            food={food} 
                            item={item} 
                            descrease={descrease}
                            increase={increase} 
                            onClickFoodItem={onClickFoodItem}
                          />
                        )
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
        </>
      </Scroller>
      <GoodsFixedCategory
        categoryTitle={currentItem.text}
        myRef={goodsFixedCategoryRef}
      />
    </>
  )
}

export default GoodsPanel