import React, { useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate, Link } from "react-router-dom";
import "../style/home.css";
import { Button, IconButton, TextField } from "@mui/material";
import { Restore as RestoreIcon } from "@mui/icons-material";
import Auth from "./authenticate";
import phoneImage from '../assets/logo3.png';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const authContext=useContext(AuthContext);
  
  let handleJoinVideoCall = async (e) => {
          e.preventDefault();
          
          if(meetingCode!==""){
            await authContext.addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
          }
  };

  return (
    <>
      <div className="navBar">
        <div className='navHeader' style={{position:"relative",left:"22px"}}>
              <h2><Link to="/" className='link'><b style={{color:"whitesmoke"}}>VMeet</b></Link></h2><span style={{position:"relative",left:"22px"}}>📱</span>
         </div>

        <div className="sidebuttons">
          <div>
            <IconButton onClick={()=>navigate("/history")}>
              <RestoreIcon />
              <p>History</p>
            </IconButton>
          </div>

          <Button
          sx={{ textTransform: "none" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <p> Logout</p>
          </Button>
        </div>
      </div>

    <div className="meetContainer">
  <div className="leftPanel">
    <div className="contentWrapper">
      <h2 className="heroHeading">
        Providing Quality Video Call <br />
        Just Like Quality Education
      </h2>

      <div className="actionGroup">
        <TextField
          onChange={(e) => setMeetingCode(e.target.value)}
          value={meetingCode}
          placeholder="Enter a code or link"
          variant="outlined"
          size="medium"
          className="meetingInput"
          sx={{
            flex: 1,
            "& .MuiInputBase-root": {
              height: "48px",
              backgroundColor: "#161616",
              borderRadius: "8px",
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
              fontSize: "0.95rem",
              padding: "0 14px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#333333",
              },
              "&:hover fieldset": {
                borderColor: "#555555",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#358ee2",
              },
            },
          }}
        />

        <Button
          onClick={handleJoinVideoCall}
          variant="contained"
          sx={{
            height: "48px",
            px: 3.5,
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#1d4ed8",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
            },
          }}
        >
          Join
        </Button>
      </div>
    </div>
  </div>

  <div className="rightPanel">
    <div className="infinite-wrapper">
      <img src={phoneImage} alt="Video Call Preview" className="heroImage" />
    </div>
  </div>
</div>


    </>
  );
}

export default withAuth(Home) ;
///export default Home;