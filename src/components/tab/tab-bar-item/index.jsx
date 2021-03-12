import './index.styl'
const TabBarItem = props => {
  return (
    <div className="tab-bar-item">
      <i></i>
      <div>{props.title}</div>
    </div>
  )
}

export default TabBarItem