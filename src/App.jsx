import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0); 
    return(
        <div>
          <button onClick={()=>setCount(count+1)}>Count={count}</button>
        </div>
    );
}
