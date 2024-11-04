import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './SignUp.css';
import logo from "./img/logo.png";
import pigImage from './img/pig.png';

function SignUp2() {

  const location = useLocation();
  const navigate = useNavigate();

  // 첫 번째 페이지에서 전달된 state 데이터 가져오기
  const { id, password, emailAddress } = location.state || {};


  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountNum, setAccountNum] = useState('');
  const [error, setError] = useState('');
  
  const handleSignUp = async () => {

    // 계좌번호 양식
    const validateAccountNum = (num) => {
      const regex = /^\d{3}-\d{3}-\d{4}$/;
      return regex.test(num);
    };

    if (!validateAccountNum(accountNum)) {
      setError('계좌번호 형식이 올바르지 않습니다. 형식: xxx-xxx-xxxx');
      return;
  }


    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // id, password, emailAddress와 함께 추가 정보도 포함하여 서버로 전달
        body: JSON.stringify({ userId: id, pw: password, emailAddress, name, gender, age, phoneNumber, accountNum }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const responseData = await response.json();
        setError(responseData.message || '회원가입 실패. 입력한 정보를 다시 확인하세요.');
      }
    } catch (error) {
      setError('서버 오류. 잠시 후 다시 시도해주세요.');
    }
  };



  

  return (
    <div className="signup_page_back">
      <div className='pig_image'>
      <img src={pigImage} alt="돼지 이미지" className="blur-image" />
      </div>

      <div className="signup">
        <div className = "login_form">
          <div className="login_text">  Login</div>
          <div className="input_container">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="성별" />
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="나이" />
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="전화번호" />
          <input type="text" value={accountNum} onChange={(e) => setAccountNum(e.target.value)} placeholder="계좌번호 (형식: xxx-xxx-xxxx)" />
          <button onClick={handleSignUp}>회원가입 완료</button>
        
          {error && <div className="error_message">{error}</div>}
        </div>  
          
        </div>
      </div>

    </div>
  );
}

export default SignUp2;