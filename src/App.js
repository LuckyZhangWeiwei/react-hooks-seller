import { useState, useEffect } from 'react'
import { getSeller } from './api'
import VHeader from './components/v-header'
import Tab from './components/tab'

function App() {
  const [seller, setSeller] = useState({})
  
  useEffect(() => {
    getSeller().then(res => {
      setSeller(res)
    })
  }, [])

  return (
    <div>
      <VHeader data={seller} />
      <Tab />
    </div>
  );
}

export default App;
