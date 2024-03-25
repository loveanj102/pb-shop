

import { useEffect } from 'react';
import Login from './Login'

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
  }, [])
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
