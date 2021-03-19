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
        onScroll={value => onScrollValueChanged(value)}>
      </TabContent>
    </div>
  )
}

export default Tab