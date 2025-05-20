import React, { useState } from 'react';
import Edit from '../assets/edit.png';
import Delete from '../assets/delete.png';
import Pin from '../assets/pin.png';
import Pinned from '../assets/pinned.png';

function Notes({ title, date, description, status, pinnedprop }) {
    const [pinned, setPinned] = useState(pinnedprop);
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
                        <button className='btn shadow-sm'>
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
                    <button className='btn shadow-sm' onClick={() => { setPinned(!pinned) }}>
                        <img src={pinned ? Pinned : Pin} alt='show me' style={{ width: "20px", height: "20px" }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Notes;
