import ReactDOM from 'react-dom'
import './index.styl'

const HeaderDetail = props => {
  const hide = () => {
    props.hideHeaderDetail()
  }
  return (
    <>
    {
      props.show &&
      ReactDOM.createPortal(
        <div className="header-detail">
          <div className="detail-close" onClick={() => hide()}>
            <i className="icon-close" />
          </div>
        </div>
        ,
        document.body
      )
      
    }
    </>
 )
}

export default HeaderDetail