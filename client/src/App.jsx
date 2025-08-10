import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import  ProtectRoute  from './lib/ProtectRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import SinglePostPage from './pages/SinglePostPage';

const App = () => {
  return (
    <Router>  
      <Navbar />
      <div className='max-w-4xl mx-auto p-4 mt-12'>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<ProtectRoute><Dashboard /></ProtectRoute>} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <Route path='/create-post' element={<ProtectRoute><CreatePost /></ProtectRoute>  } />
          <Route path='/edit-post/:id' element={ <ProtectRoute><EditPost /></ProtectRoute> } />
          <Route path='/post/:id' element={ <ProtectRoute><SinglePostPage /></ProtectRoute> }  />

        </Routes>
      </div>
    </Router>
  );
}

export default App;