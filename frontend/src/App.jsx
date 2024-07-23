
import {Routes,Route,Navigate, BrowserRouter} from "react-router-dom"
import Home from './pages/home/Home'
import Login from "./pages/login/Login"
import Signup from "./pages/Signup/Signup"
import Assessment from "./pages/assessment/Assessment"
import Chatbot from "./pages/chatbot/Chatbot"
import Analytics from "./pages/analytics/Analytics"
import ForgotPassword from "./pages/forgot/Forgot"
import ResetPassword from "./pages/reset-password/ResetPassword"
import AboutUs from "./pages/assessment/about/AboutUs"
import Article from "./pages/article/Article"

function App() {

  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/about' element={<AboutUs/>} />
     <Route path="/assessment" element={<Assessment/>}/>
     <Route path="/chatbot" element={<Chatbot/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/forgot" element={<ForgotPassword/>}/>
     <Route path="/asd/reset-password/:uid/:token" element={<ResetPassword/>}/>
     <Route path="/analytics" element={<Analytics/>}/>
     <Route path="/chatbot" element={<Chatbot/>}/>
     <Route path="/article" element={<Article/>}/>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App
