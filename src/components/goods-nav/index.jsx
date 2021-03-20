import { useState, useEffect } from 'react'
import produce from 'immer'
import classnames from 'classnames'
import Scroller from './../scroller'
import SupportIcon from './../support-ico'
import Bubble from './../bubble'
import './index.styl'

const GoodsNav = props => {
  const category = props.category

  const [navItems, setNavItems] = useState(category)

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!category.length) return
    let immeredState = produce(category, draft => {
      draft.forEach(category => {
        let categoryCount = 0
        category.foods.forEach(food => {
          let count = !food.count ? 0 : food.count
          categoryCount += count
        })
        category.totalCount = categoryCount
      })
      return draft
    })

    setNavItems(immeredState)
  }, [category])

  useEffect(() => {
    setActiveIndex(props.ActiveNavIndex)
  }, [props.ActiveNavIndex])

  const foodNavClick = (navItem) => {
    props.navItemClick(navItem)
  }

  return (
    <Scroller
      ref={props.myRef}
      data={navItems}>
      {
        navItems.map((item, index) => {
          return (
            <div 
              key={index} 
              className={
                classnames('category-item', {
                'active': index === activeIndex
              })}
              onClick={() => foodNavClick(item, index)}>
                {
                  item.type > 0 &&
                  <SupportIcon 
                    size="3" 
                    type={item.type} 
                    style={{width: '40%', marginRight: '3px'}} 
                  />
                }
                <span>{item.name}</span>
                {
                  item.totalCount > 0 &&
                  <Bubble count={item.totalCount} />
                }
            </div>
          )
        })
      }
    </Scroller>
  )
}

export default GoodsNav