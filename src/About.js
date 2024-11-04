import React, { useState, useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import './About.css';
import pigImage from './img/pig.png';
import logo from "./img/logo.png";
import icon_home from "./icon/icon_home.svg";
import icon_account from "./icon/icon_wallet.svg";
import icon_millege from "./icon/icon_millege.svg";
import icon_analytics from "./icon/icon_Analytics.svg";
import icon_transfer from "./icon/icon_transfer.svg";
import icon_notification from "./icon/icon_notification.svg";
import icon_setting from "./icon/icon_setting.svg";
import icon_profile from "./icon/icon_profile.svg";

function About() {

    const location = useLocation();
    const navigate  = useNavigate();
    const [error, setError] = useState('');
    const { id } = location.state || {}; // 전달된 id 값을 받아옴
    const [showNotifications, setShowNotifications] = useState(false);

    // useNavigate으로 페이지 이동 관리
    
    // 사용자 정보를 담을 상태 정의
    const [userInfo, setUserInfo] = useState({
        email: 'asdf@naver.com',
        name: 'gachon',
        gender: 'male',
        age: '24',
        phone: '010-1234-5678',
    });
     // 서버로부터 사용자 정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/accounts/info`, {
                    params: { id }, // 서버로 전달할 id 파라미터
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    // 서버로부터 받은 데이터를 상태로 설정
                    const { email, name, gender, age, phone } = response.data;
                    setUserInfo({ email, name, gender, age, phone });
                } else {
                    setError('사용자 정보를 가져올 수 없습니다.');
                }
            } catch (error) {
                setError('서버 오류. 잠시 후 다시 시도해주세요.');
            }
        };

        if (id) {
            fetchData(); // id가 있을 때만 데이터 가져오기
        }
    }, [id]);

        
        
    
        
        const handleNavigation = (path, extraState = {}) => {
            navigate(path, { state: { id} });
        };
    
        return (
            <div className="background">
                <div className="sidebar">
                    <div className="sidebar_logo">
                        <img className="sidebar_logo_img" src={logo} alt="ReAction Bank" />
                        <div className="sidebar_bank_name">ReAction Bank</div>
                    </div>
                    <div className="sidebar_menu">
                        <div className="sidebar_menu_item" onClick={() => handleNavigation('/main')}>
                            <div className="sidebar_menu_icon">
                                <img className="sidebar_menu_icon_img" src= {icon_home} alt="Transfer" />
                            </div>
                            <div className="sidebar_menu_text">Home</div>
                        </div>
                        <div className="sidebar_menu_item" onClick={() => handleNavigation('/account')}>
                            <div className="sidebar_menu_icon">
                                <img className="sidebar_menu_icon_img" src={icon_account} alt="Transfer" />
                            </div>
                            <div className="sidebar_menu_text"> Account</div>
                        </div><div className="sidebar_menu_item" onClick={() => handleNavigation('/transfer')}>
                            <div className="sidebar_menu_icon">
                                <img className="sidebar_menu_icon_img" src={icon_transfer} alt="Transfer" />
                            </div>
                            <div className="sidebar_menu_text">Transfer</div>
                        </div><div className="sidebar_menu_item" onClick={() => handleNavigation('/millege')}>
                            <div className="sidebar_menu_icon">
                                <img className="sidebar_menu_icon_img" src={icon_millege} alt="Transfer" />
                            </div>
                            <div className="sidebar_menu_text">Millege</div>
                        </div><div className="sidebar_menu_item" onClick={() => handleNavigation('/analyze')}>
                            <div className="sidebar_menu_icon">
                                <img className="sidebar_menu_icon_img" src={icon_analytics}alt="Transfer" />
                            </div>
                            <div className="sidebar_menu_text">Analyze</div>
                        </div>
                    </div>
                </div>
                
                <div className="main_contents">
                    
                    <div className="main_header">
                        <div className="header_icon">
                            <img className="header_icon_img" src={icon_home} alt="Home" />
                        </div>
                        <div className="header_contents">
                            <div className="notification" onClick={() => setShowNotifications(!showNotifications)}>
                                <img src={icon_notification} alt="Notification" />
                                {showNotifications && (
                                    <div className="notification_menu">
                                        <p>New transaction: $500</p>
                                        <p>Payment reminder</p>
                                    </div>
                                )}
                            </div>
                            <div className="setting" onClick={() => handleNavigation('/setting')}>
                                <img src={icon_setting} alt="Setting" />
                            </div>
                            <div className="profile" onClick={() => handleNavigation('/profile', { id })}>
                                <img src={icon_profile} alt="Profile" />
                            </div>
                        </div>
                        
                    </div>
                    <div className="main_body">
                    <div className="first_content">
                        <div className="userIcon_container">
                            <img src={icon_profile} alt="Profile" className="userIcon" />
                        </div>
                        <div className="about_id_container">
                            <div className="about_id_text">ID</div>
                            <div className="about_id_info">{id}</div>
                        </div>
                        <div className="e-mail_container">
                            <div className="e-mail_text">E-mail</div>
                            <div className="e-mail_info">{userInfo.email}</div>
                        </div>
                        <div className="name_container">
                            <div className="name_text">Name</div>
                            <div className="name_info">{userInfo.name}</div>
                        </div>
                        <div className="gender_container">
                            <div className="gender_text">Gender</div>
                            <div className="gender_info">{userInfo.gender}</div>
                        </div>
                        <div className="age_container">
                            <div className="age_text">Age</div>
                            <div className="age_info">{userInfo.age}</div>
                        </div>
                        <div className="phone_container">
                            <div className="phone_text">Phone</div>
                            <div className="phone_info">{userInfo.phone}</div>
                        </div>
                    </div>
                        <div className="second_content">
                            
                        </div>
                        <div className="third_content">
                    
                    </div>    
                </div>
            </div>
        </div>               
    
        );
}    
export default About;