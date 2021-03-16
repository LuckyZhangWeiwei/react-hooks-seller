import { useEffect, useState } from 'react'
import { getGoods } from './../../api'
import GoodsNav from './../goods-nav'
import GoodsPanel from './../goods-panel'
import './index.styl'

const Goods = props => {
  const [goodsCategory, setGoodsCategory] = useState([])
  useEffect(() => {
    getGoods().then(res => {
      setGoodsCategory(res)
    })
  }, [])
  return (
    <div className="goods-container">
      <div className="goods-panel">
        <GoodsPanel
          category={goodsCategory}
        />
      </div>
      <div className="goods-nav">
        <GoodsNav
          category={goodsCategory}
        />
      </div>
    </div>
  )
}

export default Goods