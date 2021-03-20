import './index.styl'

const ShoppingCartList = props => {
  return (
    <div>
      {
        props.selectedFoods.map((food, index) => {
          return <div key={index}>{food.name}</div>
        })
      }
    </div>
  )
}

export default ShoppingCartList