import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ShareButton from "../assets/share.png";

function AnalyticsPage() {
    const [isLoggedIn] = useState(localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState(null);
    const [notes, setNotes] = useState([]);
    const [doneNotes, setDoneNotes] = useState(0);
    const [progressNotes, setProgressNotes] = useState(0);
    const [pendingNotes, setPendingNotes] = useState(0);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterReminderStatus, setFilterReminderStatus] = useState("all");
    const [sortBy, setSortBy] = useState("reminderDateDesc");

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
                const response = await axiosInstance.get('/analytics/notifications', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.data.error) {
                    const allNotes = response.data.notes || [];
                    setNotes(allNotes);

                    const summary = response.data.summary || {};
                    const byStatus = summary.byStatus || {};
                    setDoneNotes(byStatus["Done"] || 0);
                    setPendingNotes(byStatus["Pending"] || 0);
                    setProgressNotes(byStatus["In Progress"] || 0);
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

    const filteredAndSortedNotes = useMemo(() => {
        let list = [...notes];
        if (filterStatus !== "all") {
            list = list.filter(n => n.status === filterStatus);
        }
        if (filterReminderStatus !== "all") {
            list = list.filter(n => (n.reminderStatus || "none") === filterReminderStatus);
        }
        list.sort((a, b) => {
            const aTime = a.reminderDate ? new Date(a.reminderDate).getTime() : 0;
            const bTime = b.reminderDate ? new Date(b.reminderDate).getTime() : 0;
            if (sortBy === "reminderDateAsc") return aTime - bTime;
            if (sortBy === "reminderDateDesc") return bTime - aTime;
            return 0;
        });
        return list;
    }, [notes, filterStatus, filterReminderStatus, sortBy]);

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
                        <div className="d-flex align-items-center justify-content-center">
                            {notes && notes.length > 0 ? (
                                <div className="w-100">
                                    <div className="d-flex gap-3 mb-3 align-items-end">
                                        <div>
                                            <label className="form-label">Task Status</label>
                                            <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                                <option value="all">All</option>
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="form-label">Notification Status</label>
                                            <select className="form-select" value={filterReminderStatus} onChange={(e) => setFilterReminderStatus(e.target.value)}>
                                                <option value="all">All</option>
                                                <option value="upcoming">Upcoming</option>
                                                <option value="overdue">Overdue</option>
                                                <option value="sent">Sent</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="form-label">Sort by Reminder</label>
                                            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                                <option value="reminderDateDesc">Newest first</option>
                                                <option value="reminderDateAsc">Oldest first</option>
                                            </select>
                                        </div>
                                    </div>

                                    <table className="table table-striped table-hover align-middle text-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th className="text-start">Title</th>
                                                <th className="text-start">Description</th>
                                                <th className="text-start">Task Status</th>
                                                <th className="text-start">Notification Status</th>
                                                <th className="text-start">Reminder Date</th>
                                                <th className="text-start">Reminder Set</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredAndSortedNotes.map((note, index) => (
                                                <tr key={note._id || index}>
                                                    <td>{index + 1}</td>
                                                    <td className="fw-semibold text-start">{note.title}</td>
                                                    <td className="text-start" style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                        {note.description}
                                                    </td>
                                                    <td className="text-start">{note.status}</td>
                                                    <td className="text-start">
                                                        <span className={`badge ${
                                                            note.reminderStatus === 'overdue' ? 'bg-danger' :
                                                            note.reminderStatus === 'upcoming' ? 'bg-info text-dark' :
                                                            note.reminderStatus === 'sent' ? 'bg-success' : 'bg-secondary'
                                                        }`}>
                                                            {note.reminderStatus ? note.reminderStatus.toUpperCase() : 'NONE'}
                                                        </span>
                                                    </td>
                                                    <td className="text-start">
                                                        {note.reminderDate
                                                            ? new Date(note.reminderDate).toLocaleString()
                                                            : <span className="text-muted">N/A</span>}
                                                    </td>
                                                    <td className="text-start">
                                                        {note.isReminderSet
                                                            ? <span className="badge bg-primary">Yes</span>
                                                            : <span className="badge bg-secondary">No</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="bg-light w-100 text-center p-2 fs-4">No notes available..!</div>
                            )}
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