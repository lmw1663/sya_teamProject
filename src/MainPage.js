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
    const [budget, setBudget] = useState(100); // 총 예산 (예시값)
    const [remaining, setRemaining] = useState(80); // 남은 예산 (예시값)
    const [transactionHistory, setTransactionHistory] = useState([
        {
            amount: "$1000",
            sourceAccount: "75**-**-**-****71",
            recipientAccount: "75**-**-**-****71",
            date: "2024-10-25"
        },
        {
            amount: "$1000",
            sourceAccount: "75**-**-**-****71",
            recipientAccount: "75**-**-**-****71",
            date: "2024-10-25"
        },
        {
            amount: "$1000",
            sourceAccount: "75**-**-**-****71",
            recipientAccount: "75**-**-**-****71",
            date: "2024-10-25"
        },
        {
            amount: "$1000",
            sourceAccount: "75**-**-**-****71",
            recipientAccount: "75**-**-**-****71",
            date: "2024-10-25"
        },
        {
            amount: "$1000",
            sourceAccount: "75**-**-**-****71",
            recipientAccount: "75**-**-**-****71",
            date: "2024-10-25"
        }
    ]);
    
    const [statisticsData, setStatisticsData] = useState([
        { category: "Online Shopping", value: 40, color: "#34c759" },
        { category: "Household Expenses", value: 20, color: "#ff9500" },
        { category: "Convenience Store", value: 25, color: "#af52de" },
        { category: "Dining Out", value: 15, color: "#ff3b30" },
    ]);

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

    useEffect(() => {
        // 서버로부터 예산 정보를 가져오는 비동기 함수
        const fetchBudgetData = async () => {
            try {
                const response = await axios.get("/api/budget"); // 서버에서 예산 데이터를 가져옴
                const data = response.data;
                setBudget(data.totalBudget);
                setRemaining(data.remainingBudget);
            } catch (error) {
                console.error("Error fetching budget data", error);
            }
        };

        fetchBudgetData();
    }, []);

    // 예산 대비 남은 비율 계산
    const remainingPercentage = (remaining / budget) * 100;

    // const handleLogout = async () => {
    //     try {
    //         const response = await fetch('/logout', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             navigate('/login');
    //         } else {
    //             setError('로그아웃에 실패했습니다.');
    //         }
    //     } catch (error) {
    //         setError('서버 오류. 잠시 후 다시 시도해주세요.');
    //     }
    // };
    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const transactionResponse = await axios.get("/api/transaction-history", {
                    params: { userId: "user123", password: "pass123" }
                });
                setTransactionHistory(transactionResponse.data);

                const statisticsResponse = await axios.get("/api/statistics", {
                    params: { userId: "user123", password: "pass123" }
                });
                setStatisticsData(statisticsResponse.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchTransactionData();
    }, []);


    function TransactionHistory({ data }) {
        return (
            <div className="transaction_history">
                <div className="transaction_history_text">Transaction History</div>
                <table className="transaction_history_table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Source Account</th>
                            <th>Recipient Account</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.amount}</td>
                                <td>{item.sourceAccount}</td>
                                <td>{item.recipientAccount}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    function StatisticsChart({ data }) {
        const total = data.reduce((sum, item) => sum + item.value, 0);
    
        return (
            <div className="statistics_chart">
                <div className="statistics_chart_text">Statistics Chart</div>
                <div className="pie_chart">
                    {data.map((item, index) => {
                        const angle = (item.value / total) * 360;
                        return (
                            <div
                                key={index}
                                className="pie_slice"
                                style={{
                                    '--start-angle': `${index === 0 ? 0 : data[index - 1].cumulativeAngle}deg`,
                                    '--end-angle': `${angle}deg`,
                                    background: item.color,
                                }}
                            >
                                <span>{item.category}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    
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
                        <div className="summarize_balance" >
                            <div className="Total_Accounts_Balance_container">
                                <div className="Total_Accounts_Balance_text">Total Accounts Balance</div>
                                <div className="Total_Accounts_Balance">$324k</div>
                            </div>
                            <div className="Total_Spend_Amount_container">
                                <div className="Total_Spend_Amount_text">Total Spend Amount</div>
                                <div className="Total_Spend_Amount">$324k</div>
                            </div>
                            <div className="Mileage_container">
                                <div className="Mileage_text">Mileage</div>
                                <div className="Mileage">$324k</div>
                            </div>
                        </div>
                        

                    </div>
                    <div className="second_content">
                        <div className="remaining_budget">
                        <div className="remaining_budget_text">Remaining Budget</div>
                            <div className="remaining_percentage">
                                <div className="remaining_percentage_stick_graph"
                                    style={{ width: `${remainingPercentage}%` }}>
                                        <div className="remaining_percentage_text">{remainingPercentage}%</div>
                                    </div>
                            </div>
                            <div className="remaining_budget_left_text">You have ${remaining} left to spend</div>
                        </div>
                    </div>
                    <div className="third_content">
                    <div className="dashboard">
                        <TransactionHistory data={transactionHistory} />
                        <StatisticsChart data={statisticsData} />
                    </div>
                </div>    
            </div>
        </div>
    </div>               

    );
}

export default MainPage;