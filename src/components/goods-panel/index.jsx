import { useState, useEffect, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Scroller from './../scroller'
import GoodsFixedCategory from './../goods-fixed-category'
import CartControl from './../cart-control'
import './index.styl'

const GoodsPanel = props => {
  const category = props.category

  const FIXED_TITLE_HEIGHT = 26

  const [listHeight, setListHeight] = useState([])

  const [currentNavItemIndex, setCurrentNavItemIndex] = useState(0)

  const [currentNavItemText, setCurrentNavItemText] = useState(null)

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
      setCurrentNavItemText(category[0].name) // add init value
    }
  }, [props.category])

  useEffect(() => {
    props.changeNavItemIndex(currentNavItemIndex)
    props.adjustNavPosition(currentNavItemIndex)
  }, [currentNavItemIndex])

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
        setCurrentNavItemIndex(i + 1)
        setCurrentNavItemText(category[i + 1].name)
        // handle fixed title transition
        if(h2 - FIXED_TITLE_HEIGHT <= -y) {
          goodsFixedCategoryRef.current.style.transform = `translate3d(0, ${-(FIXED_TITLE_HEIGHT-(h2 + y))}px, 0)`
        } else {
          goodsFixedCategoryRef.current.style.transform = `translate3d(0, 0, 0)`
        }
        return
      }
    }
    setCurrentNavItemIndex(0)
    setCurrentNavItemText(category[0].name)
    // handle fixed title transition
    if (listHeight[0] - (-y) < FIXED_TITLE_HEIGHT) {
      goodsFixedCategoryRef.current.style.transform = `translate3d(0, ${-(FIXED_TITLE_HEIGHT-(listHeight[0] + y))}px, 0)`
    }
  }

  const onClickFoodItem = food => {
    props.jumpToDetailPage(food)
  }

  const descrease = (category, food) => {
    props.subtractFood(category, food)
  }

  const increase = (category, food) => {
    props.addFood(category, food)
  }

  return (
    <>
      <Scroller 
        ref={props.myRef}
        probeType={3}
        data={category}
        listenScroll={pos => onFoodsPanelScrolling(pos)}>
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
                          <li key={foodIndex} className="food-item" onClick={() => onClickFoodItem(food)}>
                            <div className="icon">
                              <LazyLoadImage 
                                src={food.image} 
                                alt={food.name}
                                width="57"
                                height="57"
                                effect="blur"
                              />
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
                                  onAdd={(food) => increase(item, food)}
                                />
                              </div>
                            </div>
                          </li>
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
        categoryTitle={currentNavItemText}
        myRef={goodsFixedCategoryRef}
      />
    </>
  )
}

export default GoodsPanel