import {BrowserRouter as Router, Links, Switch, Routes, Route} from 'react-router-dom'
import Main from './Pages/Main'
import About from './Pages/About'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route 
          exact path="/home" 
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />

        <Route exact path="/auth" element={<Auth/>}/>
      </Routes>
    </Router>
  );
}

export default App;
