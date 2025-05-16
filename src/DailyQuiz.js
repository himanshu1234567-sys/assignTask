// src/pages/DailyQuiz.js
import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import axios from "axios";
import { BookOutlined, CompassOutlined, BulbOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";


export default function DailyQuiz() {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://mxpertztestapi.onrender.com/api/sciencefiction")
            .then((response) => {
                const data = response.data;
                setQuizData(Array.isArray(data) ? data[0] : data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching quiz data:", error);
                setLoading(false);
            });
    }, []);

    if (loading || !quizData) {
        return (
            <div
                style={{
                    background: "linear-gradient(to right, #120438, #3e1f74)",
                    color: "white",
                    minHeight: "100vh",
                    padding: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    const wordExplorer = quizData.Wordexplore?.[0];
    console.log('word=>', wordExplorer);

    const storyAdventure = quizData.Storyadvenure?.content || [];
    // console.log("-->",storyAdventure);


    return (
        <>
            <div
                style={{
                    background: "linear-gradient(to right, #120438, #3e1f74)",
                    color: "white",
                    minHeight: "100vh",
                    padding: 40,
                }}
            >
                <Navbar />
                <h1 style={{ textAlign: "center", fontSize: 32, fontWeight: "bold" , marginTop: "20px" , marginBottom:"30px" }}>
                    <span
                        style={{
                            background: "linear-gradient(to right, #0d47a1, #42a5f5)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        The Lost city Of
                    </span>{" "}
                    Future Earth
                </h1>

                <div style={{ textAlign: "center", marginBottom: 40, display: "flex", justifyContent: "center", gap: 20 }}>
                    <Button
                        icon={<CompassOutlined style={{ fontSize: 20 }} />}
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 10,
                            background: "linear-gradient(to right, #0a2a88, #4a90e2)",
                            color: "white",
                            border: "none",
                            padding: "25px 18px",
                            borderRadius: 20,
                            fontWeight: 600,
                            fontSize: 16,
                            minWidth: 180,
                        }}
                    >
                        Word Explorer
                    </Button>

                    <Button
                        icon={<BookOutlined style={{ fontSize: 20 }} />}
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 10,
                            background: "#a14ef0",
                            color: "white",
                            border: "none",
                            padding: "25px 18px",

                            borderRadius: 12,
                            fontWeight: 600,
                            fontSize: 16,
                            minWidth: 180,
                        }}
                    >
                        Story Adventure
                    </Button>

                    <Button
                        icon={<BulbOutlined style={{ fontSize: 20 }} />}
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 10,
                            background: "#ff3d78",
                            color: "white",
                            border: "none",
                            padding: "25px 18px",

                            borderRadius: 12,
                            fontWeight: 600,
                            fontSize: 16,
                            minWidth: 180,
                        }}
                    >
                        Brain Quest
                    </Button>
                </div>



                <p
                    style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        background: "linear-gradient(to right, #0a2a88, #4a90e2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",

                        // display: "inline-block",
                    }}
                >
                    Drag Pictures to the matching Words, light up correct pairs, shake for a retry
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 3fr",
                        gap: 20,
                        paddingTop: 30,
                    }}
                >
                    {/* Left Panel */}
                    <div style={{ background: "linear-gradient(to right, #0a2a88, #4a90e2)", borderRadius: 16, padding: 20, borderStyle: "dotted" }}>
                        <h3 style={{ color: "#00d26a" }}>
                            {wordExplorer?.Noun}{" "}
                            <span style={{ fontWeight: "normal", color: "white" }}>(Noun)</span>
                        </h3>
                        <p>{wordExplorer?.Storyttext}</p>
                        <img
                            src={`https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80`}
                            alt={wordExplorer?.Noun}
                            style={{ width: "100%", borderRadius: 8 }}
                        />

                        <p>
                            <strong>Synonyms:</strong> {wordExplorer?.Synonyms}
                        </p>
                        <p>
                            <strong>Antonyms:</strong> {wordExplorer?.Antonyms}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
  {/* Left Arrow */}
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(to right, #0a2a88, #4a90e2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      fontSize: 20,
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    }}
    onClick={() => console.log("Go Left")}
  >
    &#8592;
  </div>

  {/* Right Arrow */}
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(to right, #0a2a88, #4a90e2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      fontSize: 20,
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    }}
    onClick={() => console.log("Go Right")}
  >
    &#8594;
  </div>
</div>
                    </div>
                 
                    {/* Right Panel */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 4fr)",
                            gap: 20,
                        }}
                    >
                        {storyAdventure.flatMap((item, contentIndex) =>
                            item.Storyimage.map((img, imgIndex) => (
                                <div
                                    key={`${contentIndex}-${imgIndex}`}
                                    style={{
                                        background: "linear-gradient(to right, #0a2a88, #4a90e2)",
                                        padding: 10,
                                        borderRadius: 12,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: "50%",
                                    }}
                                >
                                    <img
                                        src={"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"}
                                        alt={`Image ${imgIndex + 1}`}
                                        style={{
                                            width: "100%",
                                            borderRadius: 10,
                                            objectFit: "cover",
                                            // height: 120,
                                        }}
                                    />
                                    <p
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                            marginTop: 8,
                                            fontSize: 14,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.Paragraph?.[imgIndex] || "No description"}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
