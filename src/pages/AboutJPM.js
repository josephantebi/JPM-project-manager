import PageNav from "../components/Header";

function AboutJPM() {
  return (
    <>
      <PageNav />
      <div className="about-div">
        <p className="about">
          JPM, a project management application, was born out of a personal need
          to manage large-scale projects effectively, a need that became
          apparent after serving as a reserve officer. <br />
          This unique background provided me with an intimate understanding of
          the intricacies involved in project management, especially under
          conditions where precision and accountability are paramount. <br />
          Motivated by a desire to bridge the gap between complex project
          objectives and their successful execution, I designed this app to
          simplify the management process.
          <br /> It facilitates the addition of new projects, breaking them down
          into manageable tasks, and closely monitoring progress. <br /> Each
          subtask is carefully assigned to at least one designated role,
          ensuring responsibility is clearly defined.
          <br />
          The user-friendly homepage presents a consolidated list of all
          projects, making them easily accessible for editing or deletion.
        </p>
        <p className="about">
          I invite you to discover a project management tool that is not only
          inspired by necessity but also enhanced by the leadership and
          strategic planning skills honed during my military service.
        </p>
        <p className="about">
          Join me in redefining the approach to project management, where
          efficiency, clarity, and collaboration are at the forefront.
        </p>
      </div>
    </>
  );
}

export default AboutJPM;
