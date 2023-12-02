import './CenterPanel.css'
import LoginForm from './user-form/LoginForm'
import UserPopup from './user-popup/UserPopup'
import { addUser, saveUser } from '../../services/userService'
import React, { useState, useEffect } from 'react'


function CenterPanel() {

    async function submitUserForm(user) {
        let userResponse = await saveUser(user)
        if (userResponse && userResponse != null) {
            setShowPopup(false)
            return false;
        } 
        else {
            return true;
        }
    }
    const [showPopup, setShowPopup] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    return (
        <>
        <div className="center-panel">

            <LoginForm />

            <button onClick={() => {setShowPopup(true); console.log("showPopup")}}>Create Account</button>
        </div>
        {showPopup && <UserPopup user={currentUser} closePopup={() => { setShowPopup(false); setCurrentUser({}) }} onFormSubmit={submitUserForm}/>}
        </>
    )
}

export default CenterPanel