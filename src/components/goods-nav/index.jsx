import Scroller from './../scroller'
import './index.styl'

const GoodsNav = props => {
  const category = props.category
  return (
    <Scroller probeType="3" data={category}>
      {
        category.map((item, index) => {
          return (
            <div key={index} className="categoryItem">
              {
                item.name
              }
            </div>
          )
        })
      }
    </Scroller>
  )
}

export default GoodsNav