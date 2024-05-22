import PageNav from "../components/Header";
import qr from "../data/qr.png";
import linkedinLogo from "../data/linkedin-logo.avif";
import "../style.css";

function AboutMe() {
  return (
    <>
      <PageNav />
      <div className="about-div">
        <p className="about">
          My name is Joseph Antebi, and I'm currently completing a Full-Stack
          Web Development Program at Google and Reichman Tech School. <br />
          For my capstone project, I've developed JPM, an application designed
          to oversee and manage the large-scale projects I encountered during my
          reserve service. <br />
          Drawing upon my military experience, where precision, accountability,
          and strategic planning are paramount, JPM embodies my vision for a
          tool that bridges the gap between complex project objectives and their
          successful execution. <br />
          This app simplifies the project management process by facilitating the
          addition of new projects, breaking them down into manageable tasks,
          and closely monitoring progress, with each subtask assigned to
          designated roles for clear responsibility. <br />
          My user-friendly platform aggregates all projects, making them easily
          accessible for editing or deletion. <br />I invite you to explore JPM,
          a project management tool not only inspired by necessity but also
          enhanced by the leadership and strategic planning skills I honed
          during my military service.
        </p>
        <div
          className="about"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginTop: "8px",
              textAlign: "center",
              padding: "12px 20px 12px",
            }}
          >
            For more insights into my professional journey and updates about the
            JPM application, I invite you to connect with me on LinkedIn.
          </p>
          <span
            style={{
              padding: "12px 20px 12px",
              display: "flex",
              gap: "60px",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <img
              src={qr}
              alt="qr"
              width="100"
              height="100"
              style={{
                borderRadius: "10px",
                border: "2px solid white",
                width: "130px",
                height: "130px",
              }}
            ></img>
            <a
              href="https://www.linkedin.com/in/joseph-sefi-antebi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinLogo}
                alt="qr"
                width="100"
                height="100"
                style={{
                  cursor: "pointer",
                  borderRadius: "20px",
                  border: "2px solid white",
                  width: "130px",
                  height: "130px",
                  marginTop: "12px",
                }}
              ></img>
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
