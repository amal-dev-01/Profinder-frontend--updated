
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import UserRegister from './pages/UserRegister';
import Otppage from './pages/Otp';
import UserProfile from './pages/UserProfile';
import EditUserProfile from './pages/EditUserProfile';
import PostView from './pages/Post/PostView';
import EditPost from './pages/EditPost';
import AddPost from './pages/CreatePost';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';
import Like from './pages/Like';
import ChatArea from './pages/ChatArea';
import Chat from './pages/Chat';
import CheckOut from './pages/CheckOut';
import PaymentSucess from './pages/PaymentSucess';
import ProfileView from './pages/Profile/ProfileView';
import Sidebar from './pages/Sidebar';
import UserPost from './pages/UserPost';

function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/postview/:id' element={<PostView/>}/>
        <Route path='/temp' element={<UserPost/>}/>
        <Route path='/postlist' element={<PostList/>}/>
        <Route path='/like' element={<Like/>}/>
        <Route path='/chat' element={<ChatArea/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/success' element={<PaymentSucess/>}/>
        {/* <Route path="start" element={<Conversations />} /> */}


        <Route path='/editpost/:id' element={<EditPost/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/otp/:email' element={<Otppage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/editprofile' element={<EditUserProfile/>}/>
        <Route path='/addpost' element={<CreatePost/>}/>
        <Route path='/register' element={<UserRegister/>}/>

        <Route path='/chating/:roomName' element={<Chat/>}/>

        <Route path='/profile' element={<ProfileView/>}/>






        </Routes>
        </Router>

    </div>
  );
}

export default App;
