import TabBarSlider from './../tab-bar-slider'
import './index.styl'

const TabBar = props => {
  return (
    <div className="tab">
      {
        props.children
      }
      <TabBarSlider transfromX={props.transfromX}/>
    </div>
  )
}
export default TabBar