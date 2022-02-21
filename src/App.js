import { Route, Routes } from 'react-router-dom'
import Details from './pages/Details/Details'
import List from './pages/List'

import 'antd/dist/antd.css'
import './App.css'
import React from 'react';

function App() {
  return (
    <div className='mainbox'>
      {/* setup header for app */}
      <h1 className='titlebox'>Welcome to the Country Book!</h1>
      <Routes>
        {/* set up root route for country list page */}
        <Route path="/" element={<List/>} />
        {/* set up detail page based on different country names */}
        <Route path="/:country" element={<Details/>} />
      </Routes>
    </div>
  )

}

export default App;
