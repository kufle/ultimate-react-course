import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
import StarRating from './components/StarRating.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating maxRating={10} size={24} color='blue' message={["Terrible", "Bad", "Okay", "Good", "Amazing"]/>
  </React.StrictMode>,
)
