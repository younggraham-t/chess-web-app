import './CenterPanel.css'
import LoginForm from './user-form/LoginForm'

function CenterPanel() {
    return (
        <div class="center-panel">

            <LoginForm />

            <button onclick="showUserPopup()">Create Account</button>
        </div>
    )
}

export default CenterPanel