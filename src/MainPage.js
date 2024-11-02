import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from "axios";
import './MainPage.css';
import logo from "./img/logo.png";
import icon_home from "./icon/icon_home.svg";
import icon_account from "./icon/icon_wallet.svg";
import icon_millege from "./icon/icon_millege.svg";
import icon_analytics from "./icon/icon_Analytics.svg";
import icon_transfer from "./icon/icon_transfer.svg";
import icon_notification from "./icon/icon_notification.svg";
import icon_setting from "./icon/icon_setting.svg";
import icon_profile from "./icon/icon_profile.svg";

function MainPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const { id, accountNum, balance } = location.state || {};
    const [error, setError] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    
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

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/login');
            } else {
                setError('로그아웃에 실패했습니다.');
            }
        } catch (error) {
            setError('서버 오류. 잠시 후 다시 시도해주세요.');
        }
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { id, accountNum, balance } });
    };

    return (
        <div className="background">
            <div className="sidebar">
                <div className="sidebar_logo">
                    <img className="sidebar_logo_img" src={logo} alt="ReAction Bank" />
                    <div className="sidebar_bank_name">ReAction Bank</div>
                </div>
                <div className="sidebar_menu">
                    <div className="sidebar_menu_item" onClick={() => handleNavigation('/transfer')}>
                        <div className="sidebar_menu_icon">
                            <img className="sidebar_menu_icon_img" src= {icon_home} alt="Transfer" />
                        </div>
                        <div className="sidebar_menu_text">Home</div>
                    </div>
                    <div className="sidebar_menu_item" onClick={() => handleNavigation('/transfer')}>
                        <div className="sidebar_menu_icon">
                            <img className="sidebar_menu_icon_img" src={icon_account} alt="Transfer" />
                        </div>
                        <div className="sidebar_menu_text"> Account</div>
                    </div><div className="sidebar_menu_item" onClick={() => handleNavigation('/transfer')}>
                        <div className="sidebar_menu_icon">
                            <img className="sidebar_menu_icon_img" src={icon_transfer} alt="Transfer" />
                        </div>
                        <div className="sidebar_menu_text">Transfer</div>
                    </div><div className="sidebar_menu_item" onClick={() => handleNavigation('/transfer')}>
                        <div className="sidebar_menu_icon">
                            <img className="sidebar_menu_icon_img" src={icon_millege} alt="Transfer" />
                        </div>
                        <div className="sidebar_menu_text">Millege</div>
                    </div><div className="sidebar_menu_item" onClick={() => handleNavigation('/transfer')}>
                        <div className="sidebar_menu_icon">
                            <img className="sidebar_menu_icon_img" src={icon_analytics}alt="Transfer" />
                        </div>
                        <div className="sidebar_menu_text">Analyze</div>
                    </div>
                </div>
            </div>
            <div className="content_container">
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
                        <div className="profile" onClick={() => handleNavigation('/profile')}>
                            <img src={icon_profile} alt="Profile" />
                        </div>
                    </div>
                    
                </div>
                <div className="main_body">
                    <div className="first content">
                        <div className="summarize balance">
                            <div className="Total_Accounts_Balance_container">
                                <div className="Total_Accounts_Balance_text">Total_Accounts_Balance</div>
                                <div className="Total_Accounts_Balance">$324k</div>
                            </div>
                            <div className="Total_Spend_Amount_container">
                                <div className="Total_Spend_Amount_text">Total_Spend_Amount</div>
                                <div className="Total_Spend_Amount">$324k</div>
                            </div>
                            <div className="Mileage_container">
                                <div className="Mileage_text">Mileage</div>
                                <div className="Mileage">$324k</div>
                            </div>
                        </div>
                        

                    </div>
                    <div className="second content">
                        <div className="transfer_history">

                        </div>
                        <div className="statistics consume">

                        </div>

                </div>
            </div>
        </div>
            </div>
            
    </div>               

    );
}

export default MainPage;