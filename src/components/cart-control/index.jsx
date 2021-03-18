import './index.styl'

const CartControl = props => {
  const { food } = props

  const descrease = (e) => {
    e.stopPropagation()
    props.onDescrease(food)
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
          food.count &&
          <div className="cart-decrease" onClick={e => descrease(e)}>
            <span className="inner icon-remove_circle_outline" />
          </div>
        }
        {
          food.count && 
          <div className="cart-count">{food.count}</div>
        }
        <div className="cart-add icon-add_circle" onClick={e => {add(e)}} />
      </div>
    }
    </>
  )
}

export default CartControl