
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
import PostDetailsView from './pages/Post/PostDetailsView';
import UserView from './pages/Profile/UserView';
import Book from './pages/Booking/Book';
import UserBookingList from './pages/Booking/UserBookingList';
import ProfessionalBook from './pages/Booking/ProfessionalBook';
import ProfessionalBookAccept from './pages/Booking/ProfessionalBookAccept';
import ProfessionalCompletion from './pages/Booking/ProfessionalCompletion';
import UserConfirmation from './pages/Booking/UserConfirmation';
import ListUser from './pages/admin/ListUser';
import ListProfessionals from './pages/admin/ListProfessionals';
import Profileview from './pages/admin/profileview';
import BookList from './pages/admin/BookList';
import { BookDetails } from './pages/admin/BookDetails';
import FilterBooking from './pages/admin/FilterBooking';
import Payment from './pages/admin/Payment';
import AdminPage from './pages/admin/AdminPage';
import UserSelection from './pages/Login/UserSelection';
import ProfessionalRegister from './pages/Login/ProfessionalRegister';
import ChatList from './pages/ChatList';
import User from './pages/UserProfile';
import Post from './pages/UserPost';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/postview/:id' element={<PostView />} />
          <Route path='/temp' element={<Post />} />
          <Route path='/like' element={<Like />} />

          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/success' element={<PaymentSucess />} />

          <Route path='/admin' element={<AdminPage/>} >
          <Route path='/admin/userlist' element={<ListUser/>} />
          <Route path='/admin/professionallist' element={<ListProfessionals/>} />
          <Route path='/admin/profile/:id' element={<Profileview/>} />
          <Route path='/admin/bookings' element={<BookList/>} />
          <Route path='/admin/booking/details/:id' element={<BookDetails/>} />
          <Route path='/admin/booking/filter' element={<FilterBooking/>} />
          <Route path='/admin/booking/payment' element={<Payment/>} />
          </Route>


          {/* <Route path="start" element={<Conversations />} /> */}

          {/* <Route path='/chatlist' element={<ChatList />} />
          <Route path='/chat/:username' element={<ChatArea />}></Route> */}

        <Route path='/chatlist' element={<ChatList />}>
        <Route path='/chatlist/chat/:username' element={<ChatArea />}></Route>
          <Route path='/chatlist/chating/:roomName' element={<Chat />} />
      </Route>


          <Route path='/booking/:id/:username' element={<Book />} />
          <Route path='/postlist' element={<PostList />}>
          <Route path='/postlist/:id' element={<PostView />} />
          </Route>
          
          <Route path='userview/:id' element={<UserView />} />
          <Route path='/userprofile' element={<User />} />

          <Route path='/userbooking' element={<UserBookingList />} />
          <Route path='/userconfirmation/:id' element={<UserConfirmation/>} />
          <Route path='/probooking' element={<ProfessionalBook />} />
          <Route path='/probookingcompleted' element={<ProfessionalCompletion />} />

          <Route path='/probookingaccept' element={<ProfessionalBookAccept/>} />
          <Route path='/probookingcomplete' element={<ProfessionalCompletion/>} />

          <Route path='postlist/userview/:id' element={<UserView />} />
          <Route path='/postdetails/:id' element={<PostDetailsView />} />
          <Route path='/editpost/:id' element={<EditPost />} />
       
          <Route path='/' element={<Login />} />
          <Route path='/otp/:email' element={<Otppage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/addpost' element={<CreatePost />} />
          <Route path='/editprofile' element={<EditUserProfile />} />

          <Route path='/profile' element={<ProfileView />} />

          <Route path='/userselection' element={<UserSelection />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/professionalregister' element={<ProfessionalRegister />} />









        </Routes>
      </Router>

    </div>
  );
}

export default App;
