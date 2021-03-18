import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const CartControl = props => {

  const { food } = props

  const [showTransition, setShowTransition] = useState(false) 

  useEffect(() => {
    if (food.count) {
      setShowTransition(true)
    } else {
      setShowTransition(false)
    }
  }, [food.count])

  const descrease = (e) => {
    e.stopPropagation()
    if (food.count === 1) {
      setShowTransition(false)
      setTimeout(() => {
        props.onDescrease(food)  
      }, 310);
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