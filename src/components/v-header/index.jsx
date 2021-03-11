import './index.styl'

const VHeader = props => {
  const seller = props.data
  return (
    <div className="header">
      <div className="content-wrapper">
        <div className="avatar">
          <img src={seller.avatar} alt="" width="64" height="64"/>
        </div>
        <div className="content">
          <div className="title">
            <span className="brand"/>
            <span className="name">{seller.name}</span>
          </div>
          <div className="description">
            {`${seller.description}/${seller.deliveryTime}分钟送达`}
          </div>
          {
            seller.supports &&
            <div className="support">
              <span className="description">{seller.supports[0].description}</span>
            </div>
          }
        </div>
        {
          seller.supports &&
          <div className="support-count">
            <span className="count">{seller.supports.length}个</span>
            <i className="icon-keyboard_arrow_right"></i>
          </div>
        }
      </div>
      <div className="bulletin-wrapper">
        <span className="bulletin-title"></span>
        <span className="bulletin-text">{seller.bulletin}</span>
        <i className="icon-keyboard_arrow_right"></i>
      </div>
      <div className="background">
        <img src={seller.avatar} alt="" width="100%" height="100%"/>
      </div>
    </div>
  )
}

export default VHeader