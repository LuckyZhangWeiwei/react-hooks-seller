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

  const descrease = (e) => {
    e.stopPropagation()
    if (food.count === 1) {
      useTransition &&  setShowTransition(false)
      setTimeout(() => {
        props.onDescrease(food)  
      }, !useTransition ? 0 : 310);
    } else {
      props.onDescrease(food)  
    }
  }

  const add = (e) => {
    e.stopPropagation()
    props.onAdd(food)
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
            timeout={300} 
            classNames="move" 
            in={showTransition}>
            <div 
              className="cart-decrease"
              style={{transform: !useTransition ? 'translate3d(0, 0, 0)' : null}}
              onClick={e => descrease(e)}>
              <span className="inner icon-remove_circle_outline" />
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