import React, { useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const { Configuration, OpenAIApi } = require("openai");

const LessonPlanWriter = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 2500,
      });
      console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  
  return (
    <div>
      <Navbar />
        
        <div style={{ position: "relative" }}>
          
          <img
            src={process.env.PUBLIC_URL + "/images/AI.jpg"}
            alt="AI"
            style={{ maxWidth: "100%" }} // Make the image fit the container
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            
            <form onSubmit={handleSubmit}>
              <textarea
                type="text"
                value={prompt}
                placeholder="Please enter your lesson plan details"
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
              <button disabled={loading || prompt.length === 0} type="submit">
                {loading ? "Generating..." : "Generate Lesson Plan"}
              </button>
            </form>
          {/* </div> */}
        </div>
        

        {apiResponse && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "50px",
              marginLeft: "50px",
              marginRight: "50px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <em>Lesson Plan:</em>
            <p
              style={{
                marginTop: "10px",
                whiteSpace: "pre-wrap",
                backgroundColor: "#F2F2F2",
                color: "#AD8D76",
                padding: "20px",
              }}
            >
              {apiResponse}
            </p>
          </div>
        )}
      </div>
      <ul className="student-nav-links" style={{ marginTop: "2%" }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      </ul>
      <Footer />
    </div>
  );
};

export default LessonPlanWriter;