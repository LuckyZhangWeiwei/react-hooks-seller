import { useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get('/api/seller').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div>
      <h1>test</h1>
      <p>test</p>
    </div>
  );
}

export default App;
