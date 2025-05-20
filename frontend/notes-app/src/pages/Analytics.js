import React from "react";
import Navbar from "../components/Navbar";

function AnalyticsPage() {
    return (
        <>
            <Navbar showSearch={true} showProfile={true} />
            <div>
                This is the analytics page.
            </div>
        </>
    );
}

export default AnalyticsPage;