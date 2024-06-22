import "../style.css";
import GoogleAuth from "../Providers/auth-provider";
import EmailAndPasswordLogIn from "../components/EmailAndPasswordLogIn";

function LogInPage() {
  return (
    <>
      <div className="login-container">
        <p className="login-message">
          Welcome to JPM!
          <br />
          Please log in to see your projects
        </p>
        {/* <p className="sign-in-message">Sign in with Email and Password</p>
        <EmailAndPasswordLogIn /> */}
        <GoogleAuth />
      </div>
    </>
  );
}
export default LogInPage;
