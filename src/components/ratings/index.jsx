import {useState, useEffect, useRef, useCallback, memo} from 'react'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Scroller from './../scroller'
import Star from './../star'
import SplitLine from './../split-line'
import RatingSelector from './../rating-selector'
import './index.styl'

const ALL =2
const  desc = {
  all: '全部',
  positive: '满意',
  negative: '不满意'
}
const IMAGE_SIZE = 28

const scrollOptions = {
  click: false,
  directionLockThreshold: 0
}

const format = time => {
  return moment(time).format('YYYY-MM-DD hh:mm')
}

const Rating = props => {
  const seller = props.seller

  const [ratings, setRatings] = useState([])
  const [computedRatings, setComputedRatings] = useState([])
  const [onlyContent, setOnlyContent] = useState(true)
  const [selectType, setSelectType] = useState(ALL)

  const scrollerRef = useRef(null)

  useEffect(() => {
    const ratingsList = [
      {
        "username": "3******c",
        "rateTime": 1469281964000,
        "deliveryTime": 30,
        "score": 5,
        "rateType": 0,
        "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": [
          "南瓜粥",
          "皮蛋瘦肉粥",
          "扁豆焖面",
          "娃娃菜炖豆腐",
          "牛肉馅饼"
        ]
      },
      {
        "username": "2******3",
        "rateTime": 1469271264000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "deliveryTime": "",
        "text": "服务态度不错",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": [
          "扁豆焖面"
        ]
      },
      {
        "username": "3******b",
        "rateTime": 1469261964000,
        "score": 3,
        "rateType": 1,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "1******c",
        "rateTime": 1469261864000,
        "deliveryTime": 20,
        "score": 5,
        "rateType": 0,
        "text": "良心店铺",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "2******d",
        "rateTime": 1469251264000,
        "deliveryTime": 10,
        "score": 4,
        "rateType": 0,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "9******0",
        "rateTime": 1469241964000,
        "deliveryTime": 70,
        "score": 1,
        "rateType": 1,
        "text": "送货速度蜗牛一样",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "d******c",
        "rateTime": 1469231964000,
        "deliveryTime": 30,
        "score": 5,
        "rateType": 0,
        "text": "很喜欢的粥店",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "2******3",
        "rateTime": 1469221264000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "量给的还可以",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "3******8",
        "rateTime": 1469211964000,
        "deliveryTime": "",
        "score": 3,
        "rateType": 1,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "a******a",
        "rateTime": 1469201964000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "孩子喜欢吃这家",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": [
          "南瓜粥"
        ]
      },
      {
        "username": "3******3",
        "rateTime": 1469191264000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "粥挺好吃的",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "t******b",
        "rateTime": 1469181964000,
        "deliveryTime": "",
        "score": 3,
        "rateType": 1,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "f******c",
        "rateTime": 1469171964000,
        "deliveryTime": 15,
        "score": 5,
        "rateType": 0,
        "text": "送货速度很快",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "k******3",
        "rateTime": 1469161264000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "u******b",
        "rateTime": 1469151964000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "下雨天给快递小哥点个赞",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "s******c",
        "rateTime": 1469141964000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "好",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "z******3",
        "rateTime": 1469131264000,
        "deliveryTime": "",
        "score": 5,
        "rateType": 0,
        "text": "吃了还想再吃",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "n******b",
        "rateTime": 1469121964000,
        "deliveryTime": "",
        "score": 3,
        "rateType": 1,
        "text": "发票开的不对",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "m******c",
        "rateTime": 1469111964000,
        "deliveryTime": 30,
        "score": 5,
        "rateType": 0,
        "text": "好吃",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "l******3",
        "rateTime": 1469101264000,
        "deliveryTime": 40,
        "score": 5,
        "rateType": 0,
        "text": "还不错吧",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "3******o",
        "rateTime": 1469091964000,
        "deliveryTime": "",
        "score": 2,
        "rateType": 1,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "3******p",
        "rateTime": 1469081964000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "很喜欢的粥",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "o******k",
        "rateTime": 1469071264000,
        "deliveryTime": "",
        "score": 5,
        "rateType": 0,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      },
      {
        "username": "k******b",
        "rateTime": 1469061964000,
        "deliveryTime": "",
        "score": 4,
        "rateType": 0,
        "text": "",
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        "recommend": []
      }
    ]
    setRatings(ratingsList)
  }, [])

  useEffect(() => {
    let ret = []
    ratings.forEach(rating => {
      if (onlyContent && !rating.text) {
        return
      }
      if (selectType === ALL || selectType === rating.rateType) {
        ret.push(rating)
      }
    })
    setComputedRatings(ret)
  }, [ratings, onlyContent, selectType])

  useEffect(() => {
    setTimeout(() => {
      scrollerRef.current.refresh()
    }, 100);
  }, [computedRatings, ratings, onlyContent, selectType])

  const select = useCallback(value => {
    setSelectType(value)
  }, [])

  const toggle = useCallback(() => {
    setOnlyContent(!onlyContent)
  }, [onlyContent])

  return (
    <div className="ratings">
        <Scroller 
          ref={scrollerRef}
          click={false}
          directionLockThreshold={0}>
          <div className="ratings-content">
            <div className="overview">
              <div className="overview-left">
                <h1 className="score">{seller.score}</h1>
                <div className="title">综合评分</div>
                <div className="rank">高于周边商家{seller.rankRate}%</div>
              </div>
              <div className="overview-right">
                <div className="score-wrapper">
                  <span className="title">服务态度</span>
                  <Star size="36" score={seller.serviceScore}></Star>
                  <span className="score">{seller.serviceScore}</span>
                </div>
                <div className="score-wrapper">
                  <span className="title">商品评分</span>
                  <Star size="36" score={seller.foodScore}></Star>
                  <span className="score">{seller.foodScore}</span>
                </div>
                <div className="delivery-wrapper">
                  <span className="title">送达时间</span>
                  <span className="delivery">{seller.deliveryTime}分钟</span>
                </div>
              </div>
            </div>
            <SplitLine />
            {
              ratings.length &&
              <RatingSelector
                ratings={ratings}
                onlyContent={onlyContent}
                selectType={selectType}
                desc={desc}
                onSelect={value => select(value)}
                onToggle={() => toggle()}
              />
            }
           <div className="rating-wrapper">
             <ul>
               {
                 computedRatings.map((rating, index) => {
                   return (
                     <li key={index} className="rating-item border-bottom-1px">
                        <div className="avatar">
                           <LazyLoadImage 
                            src={rating.avatar}
                            alt=""
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            effect="blur" />
                        </div>
                        <div className="content">
                          <h1 className="name">{rating.username}</h1>
                          <div className="star-wrapper">
                            <Star size="24" score={rating.score}/>
                            {
                              rating.deliveryTime &&
                              <span className="delivery">{rating.deliveryTime}</span>
                            }
                          </div>
                          <p className="text">{rating.text}</p>
                          {
                            rating.recommend &&
                            <div className="recommend">
                              <span className="icon-thumb_up"/>
                              {
                                rating.recommend.map((item, index) => {
                                  return (
                                    <span className="item" key={index}>{item}</span>
                                  )
                                })
                              }
                             </div>
                          }
                          <div className="time">{format(rating.rateTime)}</div>
                        </div>
                     </li>
                   )
                 })
               }
             </ul>
           </div>
          </div>
        </Scroller>
    </div>
  )
}

export default memo(Rating)