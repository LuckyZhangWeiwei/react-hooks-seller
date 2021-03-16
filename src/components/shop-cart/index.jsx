import './index.styl'

const ShopCart = props => {
  return (
    <div className="shopcart-container">
      <div className="shopcart">
        <div className="content">
          <div className="content-left">
            <div className="logo-wrapper">
              <div className="logo">
                <i className="icon-shopping_cart"></i>
              </div>
              <div className="num"></div>
            </div>
            <div className="price">
              ￥100
            </div>
            <div className="desc">另需配送费￥100元</div>
          </div>
          <div className="content-right">
            <div className="pay">
              payDesc
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCart