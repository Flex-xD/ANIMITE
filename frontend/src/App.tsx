import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>        
        <Route path="/profile" element={<Profile/>}/>        
        <Route path="*" element={<Auth/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
