import classnames from 'classnames'
import Scroller from './../scroller'
import SupportIcon from './../support-ico'
import './index.styl'

const GoodsNav = props => {
  const category = props.category

  const foodNavClick = (navItem, clickedItemIndex) => {
    props.navItemClick(navItem)
    _addStyleToNav(clickedItemIndex)
    
  }

  const _addStyleToNav = (clickedItemIndex) => {
    _resetStyle()
    document.querySelectorAll('.category-item')[clickedItemIndex].classList.add('active')
  }

  const _resetStyle = () => {
    const allNavList = document.querySelectorAll('.category-item')
    for (let e of allNavList) {
      e.classList.remove('active')
    }
  }

  return (
    <Scroller
      ref={props.myRef}
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
              onClick={() => foodNavClick(item, index)}>
                {
                  item.type > 0 &&
                  <SupportIcon size="3" type={item.type} style={{width: '40%', marginRight: '3px'}} />
                }
                <span>{item.name}</span>
            </div>
          )
        })
      }
    </Scroller>
  )
}

export default GoodsNav