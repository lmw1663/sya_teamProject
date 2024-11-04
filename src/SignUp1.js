import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import pigImage from './img/pig.png';

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [error, setError] = useState('');
  const [isIdVerified, setIsIdVerified] = useState(false);
  
  const navigate = useNavigate();

  const handleIdCheck = async () => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId : id }),
      });

      if (response.status === 400) {
        setError('이미 회원가입된 사용자입니다.');
        setIsIdVerified(false);
      } else if (response.ok) {
        setError('');
        setIsIdVerified(true);
      } else {
        setError('서버 오류. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      setError('서버 오류. 잠시 후 다시 시도해주세요.');
    }
  };

   // 임시로 ID 확인 기능을 구현한 함수
  const handleIdCheck_temp = () => {
    setIsIdVerified(true);
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextPage = () => {
    if (password !== confirmPassword) {
      setError('입력하신 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateEmailFormat(emailAddress)) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    // 페이지 이동 시, id, password, emailAddress를 state로 전달
    navigate('/signup2', {
      state: { id, password, emailAddress },
    });
  };

  return (
    <div className="signup_page_back">
      <div className='pig_image'>
        <img src={pigImage} alt="돼지 이미지" className="blur-image" />
      </div>

      <div className="signup">
        <div className="login_form">
          <div className="login_text">Login</div>
          <div className="input_container">
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요." />
            <button onClick={handleIdCheck_temp}>ID 확인</button>
            {isIdVerified && (
              <>
                <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="이메일" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요." />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" />
                <button onClick={handleNextPage}>다음</button>
              </>
            )}
          </div>
          {error && <div className="error_message">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
