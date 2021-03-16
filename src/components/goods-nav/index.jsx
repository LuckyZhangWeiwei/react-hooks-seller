import Scroller from './../scroller'
import './index.styl'

const GoodsNav = props => {
  const category = props.category

  const foodNavClick = navItem => {
    props.navItemClick(navItem)
  }

  return (
    <Scroller 
      probeType="3" 
      data={category}>
      {
        category.map((item, index) => {
          return (
            <div 
              key={index} 
              className="categoryItem" 
              onClick={() => foodNavClick(item)}>
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