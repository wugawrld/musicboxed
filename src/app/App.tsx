import './App.css'
import HomePage from '../pages/Homepage'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App;
