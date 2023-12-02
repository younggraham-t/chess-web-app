import './LoginForm.css'


function LoginForm() {
    function doLogin() {
        return
    }
    return (
        <form action={doLogin()}method="post">
        <input id="username" type="text" name="username" placeholder="Username"/>
        <input id="password" type="password" name="password" placeholder="Password"/>
        <p id="message" className="loginError hidden">Invalid Username/Password</p>
        <input type="submit" value="Login"/>
        </form> 

    )
}

export default LoginForm