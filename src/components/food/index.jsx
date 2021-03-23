import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const Food = props => {
  const { food } = props

  useEffect(() => {
    console.log('food:', food)
  }, [food])

  return <div className="food-container"></div>
}

const FoodPortal = props => {
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if (props.show)
      setShowTransition(true)
  }, [props.show])

  return (
    <CSSTransition timeout={300} classNames="slide" in={showTransition}>
      <>
      {
        ReactDOM.createPortal(
          <Food
            food={props.food}
          />
          ,document.body)
      }
      </>
    </CSSTransition>
  )
}

export default FoodPortal