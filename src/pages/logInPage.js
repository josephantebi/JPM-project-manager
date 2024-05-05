import "../style.css";
import PageNav from "../components/Header";
import GoogleAuth from "../Providers/auth-provider";

function LogInPage() {
  return (
    <>
      <div className="login-container">
        <p className="login-message">
          Welcome to JPM!
          <br />
          Please log in to see your projects
        </p>
        <GoogleAuth />
      </div>
    </>
  );
}
export default LogInPage;
