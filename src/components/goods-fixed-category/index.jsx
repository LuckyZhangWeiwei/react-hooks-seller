import './index.styl'

const GoodsFixedCategory = props => {
  return (
    <div
      ref={props.myRef}
      className="fixed-title-container">
        <h2>{props.categoryTitle}</h2>
    </div>
  )
}

export default GoodsFixedCategory