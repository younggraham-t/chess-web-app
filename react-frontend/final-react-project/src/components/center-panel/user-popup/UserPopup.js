

function UserPopup() {
    return (

        <section id="newUserPopup" class="modal hidden">
            <div class="flex">
                <h2 id="popupTitle">Create Account</h2>
                <button class="btn-close" onClick="hideUserPopup()">x</button>
            </div>
            <div>
                <form id="userForm" action="javascript:submitUser()">
                    <input type="hidden" id="userId" />

                    <div class="formField">
                        <input type="text" id="userName" placeholder="Username" required />
                    </div>
                    <p id="userNameTakenMessage" class="error-message hidden">Username is taken. Enter a different Username.</p>
                    <div class="formField">
                        <input type="password" id="userPassword" placeholder="Password" required />
                    </div>
                    <div class="formField">
                        <input type="text" id="userFullName" placeholder="Full Name (Optional)" />
                    </div>
                    <div class="formField">
                        <label for="userRole">User Role</label>
                        <select id="userRole">
                            <option value="member">Member</option>
                        </select>
                    </div>
                    <div class="formField">
                        <label for="userBirthDate">Birthdate:</label>
                        <input type="date" id="userBirthDate" />
                    </div>
                    <div class="formField">
                        <button class="btn">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}