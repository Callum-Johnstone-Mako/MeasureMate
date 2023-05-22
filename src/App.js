import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Converter from './Components/Converter'
import HomePage from './HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Converter" element={<Converter />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
