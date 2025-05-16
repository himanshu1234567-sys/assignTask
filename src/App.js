import React, { useEffect, useState } from "react";
import { Card, Button, Tag, Spin } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useParams, Link } from "react-router-dom";
import DailyQuiz from "./DailyQuiz";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// const navigate = useNavigate();
const buttonStyles = {
  "Clear All": {
    bgColor: "linear-gradient(to right, #0a2a88, #4a90e2)",
    icon: <PlusCircleOutlined />,
    textColor: "#fff",
  },
};

const statusStyles = {
  Published: { bgColor: "#2ecc71", icon: <CheckCircleOutlined />, textColor: "#fff" },
  "In Progress": { bgColor: "#f39c12", icon: <ClockCircleOutlined />, textColor: "#fff" },
  New: { bgColor: "#3498db", icon: <PlusCircleOutlined />, textColor: "#fff" },


};


function StoryList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://mxpertztestapi.onrender.com/api/sciencefiction")
      .then((response) => {
        const data = response.data;
        setStories(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
        setLoading(false);
      });
  }, []);

  const startIdx = page * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedStories = stories.slice(startIdx, endIdx);
  return (
    <div
      style={{
        background: `
        linear-gradient(to bottom, 
          rgba(0, 0, 0, 0.4) 50%, 
          #120438 50%
        ), 
        url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80')
      `,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "100vh",
        padding: 40,
        fontFamily: "sans-serif",

      }}

    >


      <Navbar />
      <h1 style={{ fontSize: 32, textAlign: "center", margin: "30px 0" }}>
        Science Fiction Stories
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 30 }}>
        {Object.entries(statusStyles).map(([status, style]) => (
          <Tag
            key={status}
            icon={style.icon}
            style={{
              backgroundColor: style.bgColor,
              color: style.textColor,
              borderRadius: 24,
              fontSize: 16,
              padding: "16px 25px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {status}
          </Tag>
        ))}

<Button
  icon={buttonStyles["Clear All"].icon}
  style={{
    background: buttonStyles["Clear All"].bgColor,
    color: buttonStyles["Clear All"].textColor,
    border: "none",
    fontSize:16,
    borderRadius: 24,
    padding: "26px 25px",
    fontWeight: "bold",
  }}
>  Clear All
</Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {paginatedStories.map((story, index) => (
              <Card
                key={story.id || index}
                hoverable
                onClick={() => navigate(`/story/${story.id}`)}
                style={{
                  position: "relative",   // needed for absolute button inside
                  borderRadius: 20,
                  padding: 20,
                  background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
                  color: "white",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  minHeight: 260,        // increased height to fit button nicely
                }}
                bodyStyle={{ padding: 0, width: "100%" }}
              >
                <img
                  alt="story-image"
                  src={"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"}
                  style={{
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 16,
                    marginTop: 5,
                    marginBottom: 20,
                    alignSelf: "center",

                  }}
                />

                <div style={{ textAlign: "center", flexGrow: 1, paddingBottom: 60 }}>
                  <h3 style={{ margin: "0 0 10px", fontWeight: "bold" }}>{story.Title}</h3>
                  <Tag
                    style={{
                      backgroundColor: statusStyles[story.Status]?.bgColor || "#eee",
                      color: statusStyles[story.Status]?.textColor || "#000",
                      borderRadius: 20,
                      fontWeight: "bold",
                      padding: "6px 14px",
                      fontSize: 14,
                      userSelect: "none",
                    }}
                  >
                    {story.Status || "Unknown"}
                  </Tag>
                </div>

                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/story/${story.id}`);
                  }}
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: "5%",
                    background: "#a54eff",
                    border: "none",
                    fontWeight: "600",
                    fontSize: 16,
                    padding: "10px 0",
                    cursor: "pointer",
                  }}
                >
                  Read Story
                </Button>
              </Card>

            ))}

          </div>

          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    padding: "0 40px"
  }}
>
  {/* Previous Link on the Left */}
  {page > 0 ? (
    <Link
      onClick={() => setPage(page - 1)}
      style={{
        background: "transparent",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: 18,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        backgroundImage: "linear-gradient(to right, #0a2a88, #4a90e2)",
        cursor: "pointer",
      }}
    >
      ← Previous
    </Link>
  ) : <div />}

  {/* Next Link on the Right */}
  {endIdx < stories.length && (
    <Link
      onClick={() => setPage(page + 1)}
      style={{
        background: "transparent",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: 18,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        backgroundImage: "linear-gradient(to right, #0a2a88, #4a90e2)",
        cursor: "pointer",
      }}
    >
      Next →
    </Link>
  )}
</div>

        </>
      )}
    </div>

  );
}



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryList />} />
        {/* <Route path="/story/:id" element={<StoryDetails />} /> */}
        <Route path="/quiz" element={<DailyQuiz />} />
      </Routes>
    </Router>
  );
}
