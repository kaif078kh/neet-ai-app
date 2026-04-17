const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

const Api_key="process.env.OPENAI_API_KEY";

app.post("/ask", async (req, res) => {
  const { question, type } = req.body;

  let prompt = "";

  if (type === "doubt") {
    prompt = `Explain this NEET question simply: ${question}`;
  }

  if (type === "notes") {
    prompt = `Give short revision notes for NEET: ${question}`;
  }

  if (type === "mcq") {
    prompt = `Create 5 NEET MCQs with answers on: ${question}`;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    res.send("Error");
  }
});

 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));  
