import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

function HistoryPage() {
  const { getHistoryOfUser, userData } = useContext(AuthContext);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await getHistoryOfUser();
        // Fallback safely whether the API returns data directly or inside an object
        const historyData = Array.isArray(result) ? result : result?.data || [];
        setMeetingHistory(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0e0e0e",
        color: "#fff",
        p: 4,
      }}
    >
      {/* Top Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <IconButton
          onClick={() => navigate("/home")}
          sx={{
            color: "#fff",
            backgroundColor: "#1e1e1e",
            "&:hover": { backgroundColor: "#2e2e2e" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Meeting History
        </Typography>
      </Box>

      {/* Content Section */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress sx={{ color: "#358ee2" }} />
        </Box>
      ) : meetingHistory.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8, color: "#888" }}>
          <Typography variant="h6">No meeting history found</Typography>
          <Typography variant="body2">
            Join or host a call to see it recorded here.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          {meetingHistory.length !== 0 ? (
            meetingHistory.map((item, index) => (
              <Card
                key={item._id || index}
                sx={{
                  backgroundColor: "#181818",
                  color: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #2a2a2a",
                  transition: "transform 0.2s, border-color 0.2s",
                  "&:hover": {
                    borderColor: "#358ee2",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {/* Meeting Code & User */}
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <VideoCallIcon sx={{ color: "#358ee2" }} />
                      <Typography variant="h6" fontWeight={600}>
                        {item.meetingCode}
                      </Typography>
                    </Box>

                    {/* Username (from backend doc or fallback to logged-in user) */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        color: "#aaa",
                      }}
                    >
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2">
                        {item.username ||
                          item.name ||
                          userData?.username ||
                          "You"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Date & Time Badges */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: "flex-start", sm: "flex-end" },
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        color: "#bbb",
                      }}
                    >
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2">
                        {formatDate(item.date)}
                      </Typography>
                    </Box>

                    <Chip
                      label={formatTime(item.date)}
                      size="small"
                      sx={{
                        backgroundColor: "#242424",
                        color: "#90caf9",
                        fontWeight: 500,
                        border: "1px solid #333",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <h2>History is Empty</h2>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default withAuth(HistoryPage);
