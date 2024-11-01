import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';
import EnterDeposit from './EnterDeposit';
import EnterWithdraw from './EnterWithdraw';
import CompleteDP from './CompleteDP';
import CompleteWD from './CompleteWD';
import CompleteTF from './CompleteTF';
import InquiryTrans from './InquiryTrans';
import MainPage from './MainPage';
import Transfer from './Transfer';

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/atm-react" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup1" element={<SignUp1 />} />
            <Route path="/signup2" element={<SignUp2 />} />
            <Route path="/main" element={<MainPage />} />
            <Route path='/transfer' element={<Transfer />}/>
            <Route path="/enterDP" element={<EnterDeposit />} />
            <Route path="/enterWD" element={<EnterWithdraw />} />
            <Route path="/completeDP" element={<CompleteDP />} />
            <Route path="/completeWD" element={<CompleteWD />} />
            <Route path="/completeTF" element={<CompleteTF />} />
            <Route path="/inquiry" element={<InquiryTrans />} />
            {/* Default route to handle direct access to the root */}
          </Routes>
        </Router>
      </div>
  );
}

export default App;