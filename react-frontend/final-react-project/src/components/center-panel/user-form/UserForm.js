import { useState } from 'react';
import './UserForm.css'

function UserForm({submitCallback, user}) {
    const [formData, setFormData] = useState(user || {})
    const [displayUserNameTaken, setUserNameTaken] = useState(false);
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    
    function handleSubmit(e) {
       e.preventDefault();
        if (submitCallback) {
            let submisionSuccess = submitCallback(formData)
            setUserNameTaken(submisionSuccess)
        }


    } 
    return (
        <form id="userForm" onSubmit={handleSubmit}>
        <input type="hidden" id="userId" />

        <div className="formField">
            <input type="text" id="userName" name="userName" placeholder="Username" required onChange={handleChange}/>
        </div>
        {displayUserNameTaken && <p id="userNameTakenMessage" className="error-message">Username is taken. Enter a different Username.</p>}
        <div className="formField">
            <input type="password" id="userPassword" name="userPassword" placeholder="Password" required onChange={handleChange}/>
        </div>
        <div className="formField">
            <input type="text" id="userFullName" name="userFullName" placeholder="Full Name (Optional)" onChange={handleChange}/>
        </div>
        <div className="formField">
            <label htmlFor="userRole">User Role</label>
            <select id="userRole" name="userRole" onChange={handleChange}>
                <option value="member">Member</option>
            </select>
        </div>
        <div className="formField">
            <label htmlFor="userBirthDate">Birthdate:</label>
            <input type="date" id="userBirthDate" name="userBirthDate" onChange={handleChange}/>
        </div>
        <div className="formField">
            <button className="btn">Submit</button>
        </div>
    </form>
    )
}

export default UserForm;