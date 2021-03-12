import TabBar from './tab-bar'
import TabBarItem from './tab-bar-item'
import TabContent from './tab-content'

const Tab = props => {
  return (
    <div>
      <TabBar>
        <TabBarItem title="商品" />
        <TabBarItem title="评论" />
        <TabBarItem title="商家" />
      </TabBar>
      <TabContent></TabContent>
    </div>
  )
}

export default Tab