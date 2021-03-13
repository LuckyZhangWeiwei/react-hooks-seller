
import './index.styl'
const TabBarItem = props => {
  return (
    <div 
      className={props.myClassName}
      onClick={() => props.onClick()}>
      <i></i>
      <div>{props.title}</div>
    </div>
  )
}

export default TabBarItem