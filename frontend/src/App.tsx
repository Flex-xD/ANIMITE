import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import { useAppStore } from './store';
import { privateAndAuthRouteProps } from './constants/types';

function App() {
  const {userInfo} = useAppStore();

  const PrivateRoute = ({children}:privateAndAuthRouteProps) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to={"/auth"}/>
  }

  const AuthRoute = ({children}:privateAndAuthRouteProps) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to={"/"}/> : children
  }

  console.log(userInfo)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>        
        <Route path="/profile" element={<PrivateRoute>
          <Profile/>
        </PrivateRoute>}/>        
        <Route path="*" element={<AuthRoute>
          <Auth/>
        </AuthRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
