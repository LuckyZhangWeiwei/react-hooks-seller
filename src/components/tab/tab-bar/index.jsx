import TabBarSlider from './../tab-bar-slider'
import './index.styl'

const TabBar = props => {
  return (
    <div className="tab">
      {
        props.children
      }
      <TabBarSlider/>
    </div>
  )
}
export default TabBar