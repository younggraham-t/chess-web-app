import UserForm from "../user-form/UserForm"
import './UserPopup.css'

function UserPopup({user, onFormSubmit, closePopup}) {
    return (

        <section id="newUserPopup" className="modal">
            <div className="flex">
                <h2 id="popupTitle">Create Account</h2>
                <button className="btn-close" onClick={closePopup}>x</button>
            </div>
            <UserForm submitCallback={onFormSubmit} user={user}/>
        </section>
    )
}
 export default UserPopup;