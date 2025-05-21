import React from "react";
import Failed from '../assets/cancel.png';
import Success from '../assets/checked.png';

function Notify(success, message) {
    return (
        <>
            <div className="border-start border-5 border-success rounded-start shadow p-1 notify bg-white d-flex align-items-center justify-content-start">
                <div className="">
                    <img src={success ? Success : Failed} alt="Show me" style={{ width: "40px", height: "40px" }}></img>
                </div>
                <div className="p-2">
                    <h5 className={`${success ? 'text-success' : 'text-danger'}`}>Note added Successfully</h5>
                </div>
            </div>
        </>
    )
}

export default Notify