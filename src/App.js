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
      test
    </div>
  );
}

export default App;
