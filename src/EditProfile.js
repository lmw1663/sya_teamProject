import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import './EditProfile.css';
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

function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {}; // 전달된 id 값을 받아옴
    const [error, setError] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    // 사용자 정보를 담을 상태 정의
    const [userInfo, setUserInfo] = useState({
        email: 'sdfdsf@naver.com',
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
                    params: { id },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
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
            fetchData();
        }
    }, [id]);

    // input 값 변경 시 userInfo 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // input이 포커스를 받을 때 value를 지우고, 포커스를 잃으면 원래 값을 복원
    const handleFocus = (e) => {
        e.target.value = '';
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        if (e.target.value === '') {
            e.target.value = userInfo[name];
        }
    };

    // 수정된 데이터 서버로 전송
    const handleEditSubmit = async () => {
        try {
            const response = await axios.put(`/accounts/update`, {
                id,
                ...userInfo,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert("정보가 성공적으로 수정되었습니다.");
                navigate('/profile', { state: { id } }); // 수정 후 프로필 페이지로 이동
            } else {
                setError('정보 수정에 실패했습니다.');
            }
        } catch (error) {
            setError('서버 오류. 잠시 후 다시 시도해주세요.');
        }
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { id } });
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
                        <div className="profile" onClick={() => handleNavigation('/profile')}>
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
                            <label className="e-mail_text">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={userInfo.email} 
                                onChange={handleChange} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="e-mail_info" 
                            />
                        </div>
                        <div className="name_container">
                            <label className="name_text">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={userInfo.name} 
                                onChange={handleChange} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="name_info" 
                            />
                        </div>
                        <div className="gender_container">
                            <label className="gender_text">Gender</label>
                            <input 
                                type="text" 
                                name="gender" 
                                value={userInfo.gender} 
                                onChange={handleChange} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="gender_info" 
                            />
                        </div>
                        <div className="age_container">
                            <label className="age_text">Age</label>
                            <input 
                                type="number" 
                                name="age" 
                                value={userInfo.age} 
                                onChange={handleChange} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="age_info" 
                            />
                        </div>
                        <div className="phone_container">
                            <label className="phone_text">Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={userInfo.phone} 
                                onChange={handleChange} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="phone_info" 
                            />
                        </div>
                        <div className="edit_button_container">
                            <button className="edit_button" onClick={handleEditSubmit}>Edit</button>
                        
                        </div>
                        {error && <p className="error_message">{error}</p>}
                    </div>
                    {/* 추가 콘텐츠 */}
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
