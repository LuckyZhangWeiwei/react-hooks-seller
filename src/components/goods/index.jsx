import { useEffect, useState, useRef } from 'react'
import { getGoods } from './../../api'
import GoodsNav from './../goods-nav'
import GoodsPanel from './../goods-panel'
import ShopCart from './../shop-cart'
import './index.styl'

const Goods = props => {
  const [goodsCategory, setGoodsCategory] = useState([])

  const goodsNavRef = useRef(null)
  const goodsPanelRef = useRef(null)

  useEffect(() => {
    getGoods().then(res => {
      setGoodsCategory(res)
    })
  }, [])

  const onNavItemClick = item => {
    // console.log(item)
    const ele = document.querySelector(`[data-category=${item.name}]`)
    goodsPanelRef.current.scrollToElement(ele, 0)
  }

  return (
    <>
      <div className="goods-container">
        <div className="goods-panel">
          <GoodsPanel
            category={goodsCategory}
            myRef={goodsPanelRef} />
        </div>
        <div className="goods-nav">
          <GoodsNav
            category={goodsCategory}
            navItemClick={navItem => onNavItemClick(navItem)}
            myRef={goodsNavRef} />
        </div>
      </div>
      <ShopCart />
    </>
  )
}

export default Goods