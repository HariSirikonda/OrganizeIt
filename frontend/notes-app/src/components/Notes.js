import React, { useState } from 'react';
import Edit from '../assets/edit.png';
import Delete from '../assets/delete.png';
import PinImg from '../assets/pin.png';
import PinnedImg from '../assets/pinned.png';

function Notes({ id, title, date, description, status, isPinned, handleConfirmDelete, handleTogglePin, handleEdit }) {

    const [pinned, setPinned] = useState(isPinned);
    const [expanded, setExpanded] = useState(false);
    const limit = 70;

    const toggleExpanded = () => setExpanded(!expanded);

    const getDisplayText = () => {
        if (description.length <= limit) return description;
        if (expanded) return description;
        return description.slice(0, limit) + '...';
    };

    const togglePin = () => {
        const newPinStatus = !pinned;
        setPinned(newPinStatus);
        handleTogglePin(id, newPinStatus);
    }

    return (
        <div>
            <div className='box rounded shadow p-2 mt-1 mb-3' style={{ width: '420px' }}>
                <div className='d-flex align-items-center ps-1'>
                    <div className='me-2'>
                        <h4 className='m-0'>{title}</h4>
                    </div>
                    <div className='d-flex align-items-center ms-auto'>
                        <button className='btn shadow-sm' onClick={handleEdit}>
                            <img src={Edit} alt='edit' style={{ width: '20px', height: '20px' }} />
                        </button>
                        <button className='btn shadow-sm' onClick={() => handleConfirmDelete(id)}>
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
                <div className='m-1 pt-2 pb-2' style={{ wordBreak: 'break-word' }}>
                    {getDisplayText()}
                    {description.length > limit && (
                        <span
                            onClick={toggleExpanded}
                            style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px', fontSize: '14px' }}
                        >
                            {expanded ? 'Show less' : 'Show more'}
                        </span>
                    )}
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        className='btn shadow-sm'
                        onClick={togglePin}

                    >
                        <img src={pinned ? PinnedImg : PinImg} alt='show me' style={{ width: "20px", height: "20px" }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notes;
