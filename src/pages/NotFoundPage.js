import React from "react";
import "../style.css";
import page404 from "../data/404.jpg";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <div className="nf-container">
        <h1 className="nf-header">404 - Uncharted Territory!</h1>
        <img className="nf-image" src={page404} alt="404 Illustration" />
        <p className="nf-text">
          Whoops! Even our expert detective can't seem to find this page. Maybe
          it's hiding in a secret location? Or perhaps it joined a witness
          protection program?
        </p>
        <p className="nf-text">
          While we solve this mystery, why not head back to familiar grounds?
        </p>
        <Link className="nf-home-link" to="/">
          Go to Homepage
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
