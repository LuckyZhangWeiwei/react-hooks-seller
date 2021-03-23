import {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import Scroller from './../scroller'
import './index.styl'

const Food = props => {
  const { food } = props
  const scrollerRef = useRef(null)

  useEffect(() => {
    console.log('food:', food)
  }, [food])

  const hide = () => {
    props.hide()
  }

  return (
    <div className="food-container">
      <Scroller myRef={scrollerRef} data={food}>
        <div className="food-content">
        <div className="image-header">
            <img src={food.image} alt="" />
            <div className="back" onClick={() => hide()}>
              <i className="icon-arrow_lift" />
            </div>
          </div>
        </div>
      </Scroller>
    </div>
  )
}

const FoodPortal = props => {
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if (props.show)
      setShowTransition(true)
  }, [props.show])
  
  const hide = () => {
    setShowTransition(false)
    setTimeout(() => {
      props.hideFoodPortal()
    }, 310);
  }

  return (
    <CSSTransition timeout={300} classNames="slide" in={showTransition}>
      <>
      {
        ReactDOM.createPortal(
          <Food
            food={props.food}
            hide={() => hide()}
          />
          ,document.body)
      }
      </>
    </CSSTransition>
  )
}

export default FoodPortal