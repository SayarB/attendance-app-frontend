import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import { AuthProvider } from './Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FailurePage from './pages/FailurePage'
import SuccessPage from './pages/SuccessPage'
function App () {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position='top-right'
          theme='colored'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/failure' element={<FailurePage />} />
          <Route exact path='/success' element={<SuccessPage />} />
          <Route exact path='welcome' element={<Welcome />} />
          <Route exact path='login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
