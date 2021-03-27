import { useState, useEffect, useRef } from 'react'
import Scroller from './../scroller'
import SupportIcon from './../support-ico'
import Star from './../star'
import SplitLine from './../split-line'
import './index.styl'

const Seller = props => {
  const seller = props.seller

  const scrollerRef = useRef(null)
  const [favorite, setFavorite] = useState(false)
  const [favoriteText, setFavoriteText] = useState()

  useEffect(() => {
    setFavoriteText(favorite ? '已收藏' : '收藏')
  }, [favorite])

  const toggleFavorite = () => {}

  return (
    <Scroller
      className='seller'
      ref={scrollerRef}
      click={false}
      directionLockThreshold={0}>
        <div className="seller-content">
          <div className="overview">
            <h1 className="title">{seller.name}</h1>
            <div className="desc border-bottom-1px">
              <Star size="36" score={seller.score} />
              <span className="text">{seller.ratingCount}</span>
              <span className="text">{seller.sellCount}单</span>
            </div>
            <ul className="remark">
              <li className="block">
                <h2>起送价</h2>
                <div className="content">
                  <span className="stress">
                    {seller.minPrice}元
                  </span>
                </div>
              </li>
              <li className="block">
                <h2>商家配送</h2>
                <div className="content">
                  <span className="stress">{seller.deliveryPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>平均配送时间</h2>
                <div className="content">
                  <span className="stress">{seller.deliveryTime}</span>分钟
                </div>
              </li>
            </ul>
            <div className="favorite" onClick={() => toggleFavorite()}>
              <span className={`icon-favorite ${favorite ? 'favorite' : null}`} />
              <span className="text">{favoriteText}</span>
            </div>
          </div>
          <SplitLine />
          <div className="bulletin">
            <h1 className="title">公告与活动</h1>
            <div className="content-wrapper border-bottom-1px">
              <p className="content">{seller.bulletin}</p>
            </div>
            {
              seller.supports &&
              <ul className="supports">
                {
                  seller.supports.map((item, index) => {
                    return (
                      <li 
                      className="support-item border-bottom-1px"
                      key={index}>
                        <SupportIcon size={4} type={seller.supports[index].type}/>
                        <span className="text">{seller.supports[index].description}</span>
                      </li>
                    )
                  })
                  }
              </ul>
            }
          </div>
          <SplitLine />
          <div className="pics">
            <h1 className="title">商家实景</h1>
            <Scroller 
              className="pic-wrapper"
              scrollX={true}
              stopPropagation={true}
              directionLockThreshold={0}>
              <ul className="pic-list">
                {
                  seller.pics.map((pic,index) => {
                    return (
                      <li key={index} className="pic-item">
                        <img src={pic} width="120" height="90" />
                      </li>
                    )
                  })
                }
              </ul>
            </Scroller>
          </div>
          <SplitLine />
          <div className="info">
            <h1 className="title border-bottom-1px">商家信息</h1>
            <ul>
              {
                seller.infos &&
                seller.infos.map((info,index) => {
                  return (
                    <li key={index} className="info-item border-bottom-1px" >
                      {info}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
    </Scroller>
  )
}

export default Seller