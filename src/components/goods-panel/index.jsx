import { LazyLoadImage } from 'react-lazy-load-image-component'
import Scroller from './../scroller'
import './index.styl'

const GoodsPanel = props => {
  const category = props.category
  return (
    <Scroller probeType="3" data={category}>
      {
        category.map((item, index) => {
          return (
            <div key={index} className="category-item-container">
              <div className="category-title">
                <h2 className="category-name">{item.name}</h2>
              </div>
              <ul>
                {
                  item.foods.map((food, foodIndex) => {
                    return (
                      <li key={foodIndex} className="food-item">
                        <div className="icon">
                          <LazyLoadImage 
                            src={food.image} 
                            alt={food.name}
                            width="57"
                            height="57"
                            effect="blur"
                            />
                        </div>
                        <div className="content">
                          <h2 className="name">{food.name}</h2>
                          <p className="desc">{food.description}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </Scroller>
  )
}

export default GoodsPanel