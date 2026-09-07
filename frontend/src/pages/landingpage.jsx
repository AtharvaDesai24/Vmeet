import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import phoneImage from "../assets/mobile.png";

function LandingPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>
            <Link to="/" className="link">
              <b style={{ color: "whitesmoke" }}>VMeet</b>
            </Link>
          </h2>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📱</span>
        </div>
        <div className="navList">
          {!isLoggedIn ? (
            <>
              <p onClick={() => navigate("/1234guest")}>Join as a Guest</p>
              <p onClick={() => navigate("/auth")}>Register</p>
              <Link to="/auth">
                <button>Login</button>
              </Link>
            </>
          ) : (
            <p onClick={() => navigate("/home")}>Home</p>
          )}
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            Ones
          </h1>
          <p className="subtitle">Cover a distance by Apna Video Call</p>

          <div role="button" className="getStartedBtn" onClick={()=>navigate("/auth")}>
            <p>Get Started</p>
          </div>
        </div>

        <div>
          <img src={phoneImage} alt="Phone Display" className="img-phone" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
