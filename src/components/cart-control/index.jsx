import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const CartControl = props => {

  const { food, useTransition } = props // useTransition - when from shopping cart, we don't need transtiton 

  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if (food.count) {
      useTransition && setShowTransition(true)
    } else {
      useTransition &&  setShowTransition(false)
    }
  }, [food.count])

  const descrease = e => {
    e.stopPropagation()
    if (food.count === 1) {
      useTransition &&  setShowTransition(false)
    }
    setTimeout(() => {
      props.onDescrease(food)  
    }, 301);
  }

  const add = (e) => {
    e.stopPropagation()
    props.onAdd(food, e)
  }

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

export default CartControl