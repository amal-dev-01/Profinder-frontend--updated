
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import UserRegister from './pages/UserRegister';
import Otppage from './pages/Otp';
import UserProfile from './pages/UserProfile';
import EditUserProfile from './pages/EditUserProfile';
import PostView from './pages/PostView';
import ProfileCard from './pages/UserPost';
import EditPost from './pages/EditPost';
import AddPost from './pages/CreatePost';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';
import Like from './pages/Like';

function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/otp/:email' element={<Otppage/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/editprofile' element={<EditUserProfile/>}/>
        <Route path='/postview/:id' element={<PostView/>}/>
        <Route path='/temp' element={<ProfileCard/>}/>
        <Route path='/editpost/:id' element={<EditPost/>}/>
        <Route path='/addpost' element={<CreatePost/>}/>
        <Route path='/postlist' element={<PostList/>}/>
        <Route path='/like' element={<Like/>}/>




        </Routes>
        </Router>

    </div>
  );
}

export default App;
