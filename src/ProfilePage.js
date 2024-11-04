import React, { useState, useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import './ProfilePage.css';
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

function ProfilePage() {

    const location = useLocation();
    const navigate  = useNavigate();
    const [error, setError] = useState('');
    const { id } = location.state || {}; // 전달된 id 값을 받아옴
    const [showNotifications, setShowNotifications] = useState(false);

    // useNavigate으로 페이지 이동 관리
    
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/accounts/own`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        const { id, accountNum, balance } = data.data;
                        // localStorage.setItem('accountInfo', JSON.stringify({ id, accountNum, balance }));
                        localStorage.setItem('id', id);
                        localStorage.setItem('accountNum', accountNum);
                        localStorage.setItem('balance', balance);
                        // Handle response data (e.g., update state with account info)
                    } else {
                        setError('계정 정보를 가져올 수 없습니다.');
                    }
                } catch (error) {
                    setError('서버 오류. 잠시 후 다시 시도해주세요.');
                }
            };
    
            fetchData();
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
                            <div className="aboutbutton_container">
                            <button className="about_button" onClick={() => handleNavigation('/about')}>About</button>
                            </div>
                            <div className="editProfilebutton_container">
                            <button className="editprofile_button" onClick={() => handleNavigation('/editprofile')}>Edit Profile</button>
                            </div>
                            <div className="logoutbutton_container">
                            <button className="logout_button" onClick={() => handleNavigation('/')}>Logout</button>
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
export default ProfilePage;