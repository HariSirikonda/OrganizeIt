import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import PlusIcon from '../assets/plus.png';
import CloseIcon from '../assets/remove.png';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Notespage() {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
                setIsLoggedIn(true);
            }
        }
    };
    useEffect(() => {
        getUserInfo()
        return () => { };
    },)
    const notesData = [
        {
            title: "This is the title",
            date: "09-04-2025",
            discription: "This is the discription of the notes",
            status: "Done",
            isPinned: true
        },
        {
            title: "Meeting Notes",
            date: "10-04-2025",
            discription: "Discuss project milestones and deliverables",
            status: "In Progress",
            isPinned: true
        },
        {
            title: "Grocery List",
            date: "11-04-2025",
            discription: "Milk, eggs, bread, coffee, fruits",
            status: "Pending",
            isPinned: false
        },
        {
            title: "Workout Plan",
            date: "12-04-2025",
            discription: "Upper body workout and cardio session",
            status: "Done",
            isPinned: true
        },
        {
            title: "Study Schedule",
            date: "13-04-2025",
            discription: "Revise DSA and React topics",
            status: "Done",
            isPinned: false
        },
        {
            title: "Birthday Reminder",
            date: "14-04-2025",
            discription: "Buy a gift and plan surprise for friend",
            status: "Pending",
            isPinned: true
        }
    ];


    const [addNote, setAddNote] = useState(false);
    const [filterOption, setFilterOption] = useState("Filter");
    const FilteredNotes = notesData.filter(note => {
        if (filterOption === "Pinned") return note.isPinned;
        if (filterOption === "Unpinned") return !note.isPinned;
        return true;
    });

    return (
        <div>
            <Navbar UserInformation={userInfo} showSearch={true} showLR={!isLoggedIn} showProfile={true} />
            <div className='container d-flex justify-content-between align-items-center p-3 mb-2'>
                <h1 className='bottom-border'>All Notes</h1>
                <select
                    className="form-select shadow-none border-dark"
                    style={{ width: "170px" }}
                    aria-label="Default select example"
                    value={filterOption}
                    onChange={(e) => { setFilterOption(e.target.value) }}
                >
                    <option selected>Filter</option>
                    <option value="Pinned">Pinned</option>
                    <option value="Unpinned">Unpinned</option>
                </select>
            </div>
            <div className='container-fluid mb-2'>
            </div>
            <div className="container webkit-scrollbar">
                <div className="row">
                    {FilteredNotes.map((note, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-2 d-flex">
                            <Notes
                                title={note.title}
                                date={note.date}
                                discription={note.discription}
                                status={note.status}
                                pinnedprop={note.isPinned}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {addNote && (
                <div className='notes-form bg-light' style={{ width: '1000px', height: '500px' }}>
                    <div className='d-flex align-items-end justify-content-end'>
                        <img className='m-1' src={CloseIcon} alt='Close' style={{ width: '30px', height: '30px' }} onClick={() => setAddNote(false)} />
                    </div>
                    <div className='p-2 mb-1'>
                        <h5>Title of the Notes</h5>
                        <input className='form-control shadow-none' type='text' placeholder='Write your title here' required />
                    </div>
                    <div className='p-2 mb-1'>
                        <h5>Description</h5>
                        <textarea className='form-control shadow-none' style={{ height: '150px' }} placeholder='Write your description here' required></textarea>
                    </div>
                    <div className='d-flex p-2 mb-1 align-items-center'>
                        <div className='d-flex w-50 align-items-center justify-content-start mx-1'>
                            <div className='me-2'>
                                <h5 className='m-0'>Current Status:</h5>
                            </div>
                            <div className="btn-group p-1" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                                <label className="btn-sm btn-outline-primary shadow-none" htmlFor="btnradio1">Pending</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                <label className="btn-sm btn-outline-primary shadow-none" htmlFor="btnradio2">In Progress</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                                <label className="btn-sm btn-outline-primary shadow-none" htmlFor="btnradio3">Done</label>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-end justify-content-end mt-2 mb-0'>
                        <div>
                            <button className='btn btn-sm btn-primary shadow-none mx-1'>Save</button>
                            <button className='btn btn-sm btn-light shadow-none mx-1' onClick={() => setAddNote(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <div
                className='plus rounded-circle shadow add-notes'
                onClick={() => {
                    setAddNote(!addNote);
                    console.log("add notes clicked");
                }}
            >
                <img className='rounded-circle' src={PlusIcon} alt='Add' style={{ width: '30px', height: '30px' }} />
            </div>
        </div>
    );
}

export default Notespage;
