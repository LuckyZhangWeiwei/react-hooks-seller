import classnames from 'classnames'
import Scroller from './../scroller'
import './index.styl'

const GoodsNav = props => {
  const category = props.category

  const foodNavClick = (navItem, ele) => {
    props.navItemClick(navItem)
    _addStyleToNav(ele)
    
  }

  const _addStyleToNav = (ele) => {
    const allNavList = document.querySelectorAll('.category-item')
    for (let e of allNavList) {
      e.classList.remove('active')
    }
    ele.target.classList.add('active')
  }

  return (
    <Scroller
      ref={props.myRef}
      probeType="3" 
      data={category}>
      {
        category.map((item, index) => {
          return (
            <div 
              key={index} 
              className={
                classnames('category-item', {
                'active': index === 0
              })}
              onClick={e => foodNavClick(item, e)}>
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