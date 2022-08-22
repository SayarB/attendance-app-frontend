import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import { AuthProvider } from './Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App () {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position='top-right'
          theme='colored'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='welcome' element={<Welcome />} />
          <Route exact path='login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
