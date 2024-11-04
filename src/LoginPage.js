import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from "./img/logo.png";
import pigImage from './img/pig.png';
function LoginPage() {
  // id, pw를 저장할 state 생성
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate으로 페이지 이동 관리
  const navigate  = useNavigate();

  // 로그인 버튼 클릭 시 실행.
  const handleLogin = async  () => {
    try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id, pw: password }),
        });
  
        if (response.ok) {
          navigate('/main');
        } else {
          setError('아이디와 비밀번호를 다시 입력하세요.');
        }
    } catch (error) {
        setError('서버 오류. 잠시 후 다시 시도해주세요.');
    }
  };
  const handleLogin_temp = () => {
    navigate('/main');
  };
  return (
    <div className="login_page_back">
      <div className="login">
        <div className = "login_form">
          <div className="login_text">  Login</div>
          <div className="input_container">
            <div className ="id_text" >  ID</div>
            <div className="input-wrapper">
              <input type="text" value={id} onChange={(e) => setId(e.target.value)}  /> 
            </div>
            <div className ="password_text" >Password</div>
            <div className="input-wrapper">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          {error && <div className="error_message">{error}</div>}
          <div className="login_button_box">
            <button className="login_button" onClick={handleLogin_temp}>Login</button>  
          </div>
          <div className="login_button_box">
          <a href="/signup"className="signup_link">SignUp</a>
          </div>
          
        </div>
      </div>
      <div className='pig_image'>
      <img src={pigImage} alt="돼지 이미지" className="blur-image" />
      </div>
    </div>
  );
}
export default LoginPage;