import { useState, useEffect } from 'react'
import classnames from 'classnames'
import TabBar from './tab-bar'
import TabBarItem from './tab-bar-item'
import TabContent from './tab-content'

const Tab = props => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const [transfromX, setTransfromX] = useState(0)

  const [tabInfo, setTabInfo] = useState(null)

  useEffect(() => {
    const { tabInfo } = props.data
    setTabInfo(tabInfo)
  }, []) 
 
  const goToPage = pageIndex => {
    setCurrentIndex(pageIndex)
  }

  const onSlideChange = value => {
    setTransfromX(value)
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
              myClassName={
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
        currentIndex={currentIndex}
        onPageChanged={currentPage => goToPage(currentPage.pageX)}
        onScroll={value => onSlideChange(value)}>
      </TabContent>
    </div>
  )
}

export default Tab