import { useState, useEffect } from 'react'
import classnames from 'classnames'
import TabBar from './tab-bar'
import TabBarItem from './tab-bar-item'
import TabContent from './tab-content'

const Tab = props => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const [transfromX, setTransfromX] = useState(0)

  const [tabInfo, setTabInfo] = useState(null)

  const [showShoppingCart, setShowShoppingCart] = useState(false)

  useEffect(() => {
    const { tabInfo } = props.data
    setTabInfo(tabInfo)
  }, [])

  useEffect(() => {
    if (props.data) {
      setCurrentIndex( props.data.initTabIndex)
    }
  }, [props.data])
 
  const goToPage = pageIndex => {
    setCurrentIndex(pageIndex)
  }

  const onScrollValueChanged = value => {
    setTransfromX(value)
     _transformShoppingCart(value)
     if (value < 1) { // when from tab2 moving to tab1
       if (!document.querySelector('.shopcart-container')) {
        setShowShoppingCart(true)
       }
     }
  }

  const _transformShoppingCart = value => {
    const shoppingCard = document.querySelector('.shopcart-container')
    if (shoppingCard) {
      shoppingCard.style.transform = `translateX(${-value * shoppingCard.clientWidth}px)`
    }
  }

  return (
    <div>
      <TabBar transfromX={transfromX}>
        {
          tabInfo &&
          tabInfo.map((item, index) => {
           return (
            <TabBarItem
              key={index}
              title={item.title}
              pageIndex={index}
              className={
                classnames('tab-bar-item', {
                'active-tab-bar-item': currentIndex === index
              })}
              onClick={() => goToPage(index)} 
            />
           )
          })
        }
      </TabBar> 
      <TabContent
        data={tabInfo}
        seller={props.seller}
        currentIndex={currentIndex}
        onPageChanged={currentPage => goToPage(currentPage.pageX)}
        onScroll={value => onScrollValueChanged(value)}
        showShoppingCart={showShoppingCart} 
      />
    </div>
  )
}

export default Tab