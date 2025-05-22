import React, { useState } from 'react';
import Edit from '../assets/edit.png';
import Delete from '../assets/delete.png';
import PinImg from '../assets/pin.png';
import PinnedImg from '../assets/pinned.png';
import axiosInstance from '../utils/axiosInstance';

function Notes({ id, title, date, description, status, isPinned, handleConfirm, onTogglePin }) {

    const [pinned, setPinned] = useState(isPinned);

    const handleTogglePin = async () => {
        const newPinned = !pinned;
        setPinned(newPinned); // Update UI instantly

        try {
            const response = await axiosInstance.put(`/update-note/${id}`, {
                pinned: newPinned
            });
            console.log("Pinned status updated:", response.data.message);
        } catch (error) {
            console.error("Failed to update pinned status:", error.response?.data?.message || error.message);
            setPinned(!newPinned); // Revert UI if update failed
        }
    };

    return (
        <div>
            <div className='box rounded shadow p-2 mt-1 mb-3' style={{ width: '420px' }}>
                <div className='d-flex align-items-center ps-1'>
                    <div className='me-2'>
                        <h4 className='m-0'>{title}</h4>
                    </div>
                    <div className='d-flex align-items-center ms-auto'>
                        <button className='btn shadow-sm'>
                            <img src={Edit} alt='edit' style={{ width: '20px', height: '20px' }} />
                        </button>
                        <button className='btn shadow-sm' onClick={() => handleConfirm(id)}>
                            <img src={Delete} alt='edit' style={{ width: '20px', height: '20px' }} />
                        </button>
                        <div className='ps-2 mt-1 text-dark'>
                            <span
                                className={`rounded px-1 ${status === "Done"
                                    ? "done-status"
                                    : status === "In Progress"
                                        ? "progress-status"
                                        : "not-started-status"
                                    }`}
                            >
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <span className='text-start rounded px-1 fs-8'>{date}</span>
                </div>
                <div className='m-1 pt-2 pb-2'>
                    {description}
                </div>
                <div className="d-flex justify-content-end">
                    <button className='btn shadow-sm' onClick={handleTogglePin}>
                        <img src={pinned ? PinnedImg : PinImg} alt='show me' style={{ width: "20px", height: "20px" }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notes;
