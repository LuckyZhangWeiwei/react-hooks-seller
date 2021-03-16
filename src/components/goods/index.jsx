import { useEffect, useState, useRef } from 'react'
import { getGoods } from './../../api'
import GoodsNav from './../goods-nav'
import GoodsPanel from './../goods-panel'
import ShopCart from './../shop-cart'
import './index.styl'

const Goods = props => {
  const [goodsCategory, setGoodsCategory] = useState([])

  useEffect(() => {
    getGoods().then(res => {
      setGoodsCategory(res)
    })
  }, [])

  const onNavItemClick = item => {
    console.log(item)
  }

  return (
    <>
      <div className="goods-container">
        <div className="goods-panel">
          <GoodsPanel
            category={goodsCategory}
          />
        </div>
        <div className="goods-nav">
          <GoodsNav
            category={goodsCategory}
            navItemClick={navItem => onNavItemClick(navItem)}
          />
        </div>
      </div>
      <ShopCart />
    </>
  )
}

export default Goods