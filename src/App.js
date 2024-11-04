import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import EnterDeposit from './EnterDeposit';
import EnterWithdraw from './EnterWithdraw';
import CompleteDP from './CompleteDP';
import CompleteWD from './CompleteWD';
import CompleteTF from './CompleteTF';
import InquiryTrans from './InquiryTrans';
import MainPage from './MainPage';
import Transfer from './Transfer';
import Profile from'./ProfilePage';
import EditProfile from './EditProfile';
import About from'./About';
import AccountPage from './AccountPage'; 

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<MainPage />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/transfer' element={<Transfer />}/>
            <Route path="/enterDP" element={<EnterDeposit />} />
            <Route path="/enterWD" element={<EnterWithdraw />} />
            <Route path="/completeDP" element={<CompleteDP />} />
            <Route path="/completeWD" element={<CompleteWD />} />
            <Route path="/completeTF" element={<CompleteTF />} />
            <Route path="/inquiry" element={<InquiryTrans />} />
            <Route path="/about" element={<About/>} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/account" element={<AccountPage />} />
            
            
            {/* Default route to handle direct access to the root */}
          </Routes>
        </Router>
      </div>
  );
}

export default App;