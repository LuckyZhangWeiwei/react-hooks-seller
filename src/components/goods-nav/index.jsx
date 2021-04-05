import { useState, useEffect, memo, useCallback } from 'react'
import produce from 'immer'
import classnames from 'classnames'
import Scroller from './../scroller'
import SupportIcon from './../support-ico'
import Bubble from './../bubble'
import './index.styl'

const GoodsNavItem = memo(props => {
  const {item, activeIndex, foodNavClick, index} = props
  return (
    <div 
      className={
        classnames('category-item', {
        'active': index === activeIndex
      })}
      onClick={e => {
        e.stopPropagation(); 
        foodNavClick(item, index)
        }}>
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

const GoodsNav = props => {
  const  {ActiveNavIndex, category} = props

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
    setActiveIndex(ActiveNavIndex)
  }, [ActiveNavIndex])

  useEffect(() => {
    props.myRef.current.refresh()
  }, [navItems])

  const foodNavClick = useCallback(navItem => {
    props.navItemClick(navItem)
  }, [navItems])

  return (
    <Scroller
      ref={props.myRef}
      data={navItems}
      className={props.className}>
      {
        navItems.map((item, index) => {
          return (
            <GoodsNavItem
             item={item} 
             activeIndex={activeIndex} 
             foodNavClick={foodNavClick}
             key={index}
             index={index}
            />
          )
        })
      }
    </Scroller>
  )
}

export default memo(GoodsNav)