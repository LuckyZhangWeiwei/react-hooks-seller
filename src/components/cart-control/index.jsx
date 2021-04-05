import { useState, useEffect, memo, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const CartControl = props => {

  const { food, category, useTransition } = props // useTransition - when from shopping cart, we don't need transtiton 

  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if (food.count) {
      useTransition && setShowTransition(true)
    } else {
      useTransition &&  setShowTransition(false)
    }
  }, [food.count])

  const descrease = useCallback((e) => {
    e.stopPropagation()
    if (food.count === 1) {
      useTransition &&  setShowTransition(false)
    }
    if(food.count === 1) {
      setTimeout(() => {
        props.onDescrease(food)  
      }, 301);
    } else {
      props.onDescrease(food)  
    }
   
  }, [food, category])

  const add = useCallback(e => {
    e.stopPropagation()
    props.onAdd(food, e)
  }, [food, category])

  return (
    <>
    {
      food &&
      <div className="cart-control">
        {
          food.count 
          &&
          <CSSTransition 
            timeout={200} 
            classNames="move" 
            in={showTransition}>
            <div 
              className="cart-decrease inner icon-remove_circle_outline"
              style={{transform: !useTransition ? 'translate3d(0, 0, 0)' : null}}
              onClick={e => descrease(e)}>
            </div>
          </CSSTransition>
        }
        {
          food.count && 
          <div className="cart-count">{food.count}</div>
        }
        <div 
          className="cart-add icon-add_circle" 
          onClick={e => add(e)} 
        />
      </div>
    }
    </>
  )
}

export default memo(CartControl)