import './index.styl'
const TabBar = props => {
  return (
    <div className="tab">
      {
        props.children
      }
    </div>
  )
}
export default TabBar