import React from 'react';
import Edit from '../assets/edit.png';
import Delete from '../assets/delete.png';

function Notes({ title, date, discription, status }) {
    return (
        <div>
            <div className='box border-0 rounded shadow p-3 m-1 mb-3' style={{ width: '420px' }}>
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
                <div className='ps-1 text-dark'><span className='bg-light rounded px-1'>{date}</span></div>
                <div className='p-1'>
                    {discription}
                </div>
                <div className='p-1'>
                    --- Attachments
                </div>
            </div>
        </div>
    )
}

export default Notes;
