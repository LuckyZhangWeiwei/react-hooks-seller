import { useState, useEffect } from 'react'
import { getSeller } from './api'
import VHeader from './components/v-header'

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
    </div>
  );
}

export default App;
