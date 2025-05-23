import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import PlusIcon from '../assets/plus.png';
import CloseIcon from '../assets/remove.png';
import axiosInstance from '../utils/axiosInstance';


function Notespage() {
    const [isLoggedIn] = useState(localStorage.getItem('token'));
    const [addNote, setAddNote] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editNoteId, setEditNoteId] = useState(null);
    const [filterOption, setFilterOption] = useState("Filter");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [notes, setNotes] = useState([]); //All notes
    const [showConfirm, setShowConfirm] = useState();
    const [noteId, setNoteId] = useState("");

    const handleAddNote = async (e) => {
        e.preventDefault();

        try {
            if (!title || !description) {
                alert("Please enter both title and description.");
                return;
            }

            if (isEditMode) {
                const response = await axiosInstance.put(`/edit-note/${editNoteId}`, {
                    title,
                    description,
                    status,
                });

                if (!response.data.error) {
                    setIsEditMode(false);
                    setEditNoteId(null);
                } else {
                    alert(response.data.message);
                    return;
                }
            } else {
                const response = await axiosInstance.post(
                    "/add-note",
                    { title, description, status },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.data.error) {
                    alert(response.data.message);
                    return;
                }
            }

            setTitle("");
            setDescription("");
            setAddNote(false);
            await fetchNotes();

        } catch (err) {
            console.error(err);
            alert("Something went wrong while saving the note.");
        }
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setStatus(note.status);
        setEditNoteId(note._id);
        setIsEditMode(true);
        setAddNote(true);
    };

    const deleteNote = async (ID) => {
        try {
            const response = await axiosInstance.delete(`/delete-note/${ID}`);
            setShowConfirm(false);
            console.log(response.data.message);
            await fetchNotes();
            setNoteId("");

        } catch (error) {
            alert("Problem Deleting the note..!");
            console.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleConfirm = (notesId) => {
        setNoteId(notesId);
        setShowConfirm(true);
    };

    const handleRevert = () => {
        alert("Notes cannot be updated at this movement..!");
    };

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/get-all-notes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data.error) {
                setNotes(response.data.notes);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <Navbar showSearch={true} showLR={!isLoggedIn} showProfile={true} />
            {showConfirm && (
                <div className="alert alert-danger border-0 shadow-sm text-dark slide-down confirm-delete d-flex align-items-center jusrify-content-center" role="alert" style={{ width: "450px", height: "60px" }}>
                    <span className='mx-3'>Are you sure, want to delete ?</span>
                    <button
                        type="button"
                        className="btn m-1 text-decoration shadow-none btn-danger"
                        onClick={() => { deleteNote(noteId) }}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="btn m-1 text-decoration shadow-none btn-light"
                        onClick={() => { setShowConfirm(false) }}
                    >
                        cancel
                    </button>
                </div>
            )}
            <div className='container d-flex justify-content-between align-items-center p-3 mb-2'>
                <h1 className='bottom-border'>All Notes</h1>
                <select
                    className="form-select shadow-none border-dark"
                    style={{ width: "170px" }}
                    aria-label="Default select example"
                    value={filterOption}
                    onChange={(e) => { setFilterOption(e.target.value) }}
                >
                    <option selected value="All">All Notes</option>
                    <option value="Pinned">Pinned</option>
                    <option value="Unpinned">Unpinned</option>
                </select>
            </div>
            <div className="container webkit-scrollbar">
                <div className="row">
                    {notes
                        .filter((note) => {
                            if (filterOption === "Pinned") return note.isPinned === true;
                            if (filterOption === "Unpinned") return note.isPinned === false;
                            return true;
                        })
                        .map((note, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-2 d-flex">
                                <Notes
                                    title={note.title}
                                    date={note.createdAt.slice(0, 10)}
                                    description={note.description}
                                    status={note.status}
                                    isPinned={note.isPinned}
                                    handleEdit={() => { handleEdit(note) }}
                                    handleConfirm={handleConfirm}
                                    handleRevert={handleRevert}
                                    id={note._id}
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
                        <input
                            className='form-control shadow-none'
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            type='text'
                            placeholder='Write your title here'
                            required
                        />
                    </div>
                    <div className='p-2 mb-1'>
                        <h5>Description</h5>
                        <textarea
                            className='form-control shadow-none'
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            style={{ height: '150px' }}
                            placeholder='Write your description here'
                            required></textarea>
                    </div>
                    <div className='d-flex p-2 mb-1 align-items-center'>
                        <div className='d-flex w-50 align-items-center justify-content-start mx-1'>
                            <div className='me-2'>
                                <h5 className='m-0'>Current Status:</h5>
                            </div>
                            <div className="btn-group p-1" role="group" aria-label="Basic radio toggle button group">
                                <select
                                    className="form-select border-dark text-decoration shadow-none"
                                    aria-label="Default select example"
                                    value={status}
                                    onChange={(e) => { setStatus(e.target.value) }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-end justify-content-end mt-2 mb-0'>
                        <div>
                            <button
                                className='btn btn-sm btn-primary shadow-none mx-1'
                                onClick={handleAddNote}
                                disabled={!title.trim() || !description.trim()}
                            >
                                {isEditMode ? "Update" : "Save"}
                            </button>
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