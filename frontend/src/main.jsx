import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Landingpage from './pages/landingpage';
import Auth from "./pages/authenticate";
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home';
import HistoryPage from './pages/historyPage';
import VideoMeetComponent from './pages/Video';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <Routes>
      
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/:url' element={<VideoMeetComponent/>}/>
      <Route path='/history' element={<HistoryPage/>}/>
      
    </Routes>
       </AuthProvider>
  </BrowserRouter>,
)
