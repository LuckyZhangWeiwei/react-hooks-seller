import TabBarSlider from './../tab-bar-indicator'
import './index.styl'

const TabBar = props => {
  return (
    <div className="tab">
      {
        props.children
      }
      <TabBarSlider transfromX={props.transfromX} tabCount={props.itemCount}/>
    </div>
  )
}
export default TabBar