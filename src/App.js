import { useState, useEffect } from 'react'
import { getSeller } from './api'
import VHeader from './components/v-header'
import Tab from './components/tab'

import Goods from './components/goods'
import Seller from './components/seller'
import Rating from './components/ratings'

function App() {
  const [seller, setSeller] = useState({})

  const tabData = {
    initTabIndex: 0,
    tabInfo:[{
      title: '商品',
      component: Goods
    },{
      title: '评价',
      component: Rating
    },{
      title: '商家',
      component: Seller
    }]
  }
  
  useEffect(() => {
    getSeller().then(res => {
      setSeller(res)
    })
  }, [])

  return (
    <div>
      <VHeader data={seller} />
      <Tab 
        data={tabData}
        seller={seller} 
      />
    </div>
  );
}

export default App;
