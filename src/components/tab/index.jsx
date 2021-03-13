import { useState } from 'react'
import classnames from 'classnames'
import TabBar from './tab-bar'
import TabBarItem from './tab-bar-item'
import TabContent from './tab-content'

const Tab = props => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const [transfromX, setTransfromX] = useState(0)

  const goToPage = pageIndex => {
    setCurrentIndex(pageIndex)
  }
  const onSlideChange = value => {
    setTransfromX(value)
  }

  return (
    <div>
      <TabBar transfromX={transfromX}>
        <TabBarItem 
          title="商品" 
          pageIndex = '0' 
          myClassName={
            classnames('tab-bar-item', {
            'active-tab-bar-item': currentIndex === 0
          })}
          onClick={() => goToPage(0)} 
        />
        <TabBarItem 
          title="评论" 
          pageIndex = '1' 
          myClassName={
            classnames('tab-bar-item', {
            'active-tab-bar-item': currentIndex === 1
          })}
          onClick={() => goToPage(1)} 
        />
        <TabBarItem
         title="商家"
         pageIndex = '2' 
         myClassName={
          classnames('tab-bar-item', {
          'active-tab-bar-item': currentIndex === 2
        })}
         onClick={() => goToPage(2)} 
        />
      </TabBar>
      <TabContent 
        currentIndex={currentIndex}
        onPageChanged={currentPage => goToPage(currentPage.pageX)}
        onScroll={value => onSlideChange(value)}>
      </TabContent>
    </div>
  )
}

export default Tab