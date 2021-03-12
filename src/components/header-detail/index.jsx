import './index.styl'

const HeaderDetail = props => {
  const hide = () => {
    props.hideHeaderDetail()
  }
  return (
    <>
    {
      props.show &&
      <div className="header-detail">
        <div className="detail-close" onClick={() => hide()}>
          <i className="icon-close" />
        </div>
      </div>    
    }
    </>
 )
}

export default HeaderDetail