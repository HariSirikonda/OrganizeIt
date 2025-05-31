import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";
import ShareButton from "../assets/share.png";

function AnalyticsPage() {
    const [isLoggedIn] = useState(localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
            }
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar showSearch={true} showProfile={true} />
            <div className="container p-5 my-5 shadow">
                {isLoggedIn ? (
                    <>
                        <div>
                            <div className="d-flex align-items-center justify-content-between p-2">
                                <div>
                                    <h1 className="fw-bold display-6">Welcome, {userInfo?.fullName}</h1>
                                </div>
                                <div className="">
                                    <button
                                        type="button"
                                        class="btn btn-white border shadow-sm"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Share your progress"
                                    >
                                        <img src={ShareButton} alt="show me" style={{ width: "18px", height: "18px" }} />
                                    </button>
                                </div>
                            </div>
                            <div className="px-2 align-items-center">
                                <span className="display-7">Analize your tasks here...</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center m-2 p-3">
                            <div
                                className="task-card shadow rounded-3 p-4 border-top border-5 border-success mx-3 my-3"
                                style={{ maxHeight: "170px", objectFit: 'cover' }}
                            >
                                <h2 className="text-start text-success">Completed Tasks</h2>
                                <h1 className="text-center text-success fw-bold display-2">34</h1>
                            </div>
                            <div
                                className="task-card shadow rounded-3 p-4 border-top border-5 border-warning mx-5 my-3"
                                style={{ maxHeight: "170px", objectFit: 'cover' }}
                            >
                                <h2 className="text-warning text-start">In Progress Tasks</h2>
                                <h1 className="text-center text-warning fw-bold display-2">40</h1>
                            </div>
                            <div
                                className="task-card shadow rounded-3 p-4 border-top border-5 border-danger mx-5 my-3"
                                style={{ maxHeight: "170px", objectFit: 'cover' }}
                            >
                                <h2 className="text-danger text-start">Pending Tasks</h2>
                                <h1 className="text-center text-danger fw-bold display-2">32</h1>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped align-middle">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Note</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gaming Mouse</td>
                                        <td>2025-05-28</td>
                                        <td><span class="badge bg-danger">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>Bluetooth Speaker</td>
                                        <td>2025-05-27</td>
                                        <td><span class="badge bg-success text-dark">done</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* cache */}
                        {/* <div className="container border-top p-2">
                            <div className="container border-5 border-start border-secondary m-1">
                                <span className="lead">3 tasks done today</span>
                            </div>
                            <div className="container border-5 border-start border-secondary m-1">
                                <span className="lead">+2 in last hour</span>
                            </div>
                        </div> */}
                    </>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <span className="display-6">Please login to see the analytics...</span>
                            </div>
                            <div class="spinner-border text-secondary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AnalyticsPage;