import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ShareButton from "../assets/share.png";

function AnalyticsPage() {
    const [isLoggedIn] = useState(localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState(null);
    const [notes, setNotes] = useState(null);
    const [doneNotes, setDoneNotes] = useState(0);
    const [progressNotes, setProgressNotes] = useState(0);
    const [pendingNotes, setPendingNotes] = useState(0);

    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get("/get-user");
                if (response.data && response.data.user) {
                    setUserInfo(response.data.user);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
            }
        }
    };

    const CountNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.get('/get-all-notes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.data.error) {
                    const allNotes = response.data.notes;
                    setNotes(allNotes);

                    let done = 0;
                    let pending = 0;
                    let progress = 0;

                    allNotes.forEach(note => {
                        if (note.status === "Done") {
                            done++;
                        } else if (note.status === "Pending") {
                            pending++;
                        } else {
                            progress++;
                        }
                    });

                    setDoneNotes(done);
                    setPendingNotes(pending);
                    setProgressNotes(progress);
                }
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleShareAnalytics = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert("Page link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    useEffect(() => {
        getUserInfo();
        CountNotes();
    }, []); //Update not oon the initial load here --

    return (
        <>
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
                                        class="btn btn-white shadow-sm"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="bottom"
                                        title="Copy link"
                                        onClick={handleShareAnalytics}
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
                                <h1 className="text-center text-success fw-bold display-2">{doneNotes}</h1>
                            </div>
                            <div
                                className="task-card shadow rounded-3 p-4 border-top border-5 border-warning mx-5 my-3"
                                style={{ maxHeight: "170px", objectFit: 'cover' }}
                            >
                                <h2 className="text-warning text-start">In Progress Tasks</h2>
                                <h1 className="text-center text-warning fw-bold display-2">{progressNotes}</h1>
                            </div>
                            <div
                                className="task-card shadow rounded-3 p-4 border-top border-5 border-danger mx-5 my-3"
                                style={{ maxHeight: "170px", objectFit: 'cover' }}
                            >
                                <h2 className="text-danger text-start">Pending Tasks</h2>
                                <h1 className="text-center text-danger fw-bold display-2">{pendingNotes}</h1>
                            </div>
                        </div>
                        {/* Cache table */}
                        <div className="text-center">
                            <h2>Remainders section</h2>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div class="table table-hover w-50">
                                <table class="table table-striped align-middle">
                                    <thead class="table-primary">
                                        <tr>
                                            <th>Note</th>
                                            <th>Date & Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-row">
                                            <td>Gaming Mouse</td>
                                            <td>2025-05-28</td>
                                            <td><span class="badge bg-danger">Pending</span></td>
                                        </tr>
                                        <tr className="table-row">
                                            <td>Bluetooth Speaker</td>
                                            <td>2025-05-27</td>
                                            <td><span class="badge bg-success text-white">done</span></td>
                                        </tr>
                                        <tr className="table-row">
                                            <td>Bluetooth Speaker</td>
                                            <td>2025-05-27</td>
                                            <td><span class="badge bg-success text-white">done</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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