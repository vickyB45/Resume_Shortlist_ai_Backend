const dotenv = require("dotenv").config();
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { CohereClient } = require("cohere-ai");
const resumeModel = require("../models/resumeModel");

// ✅ Initialize Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_TOKEN,
});

const uploadResume = async (req, res) => {
  try {
    const { job_desc } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No PDF file uploaded." });
    }
    if (!job_desc) {
      return res.status(400).json({ message: "job Discription is required." });
    }



    // ✅ Read PDF
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);

    const rawText = pdfData?.text?.trim();

    
    if (!rawText) {
      return res.status(400).json({
        message: "⚠️ PDF appears to be image-based. Text extraction via pdf-parse is not possible. Please upload a text-based PDF.",
      });
    }

    // ✅ Prompt
    const prompt = `
You are a resume screening assistant.
Compare the following resume text with the provided Job Description (JD) and give a Match score (0-100) and feedback.

Resume:
${rawText}

Job Description:
${job_desc.trim()}

Return the score and a brief explanation in this format:
Score:XX
Reason:...
    `;

    // ✅ Call Chat API
    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
    });

    // ✅ Extract result correctly
    const result = response.text;

    const match = result.match(/Score:\s*(\d+)/);
    const score = match ? parseInt(match[1], 10) : null;

    const shortlisted = score >= 80 ? true : false

    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);
    const reason = reasonMatch ? reasonMatch[1].trim() : null;
 
    const newResume = await resumeModel.create({
      user: req.user?._id,
      resume_name: req.file.fieldname, 
      job_desc,
      score,
      feedback: reason,
      shortlisted
    });

    // remove temp file
    fs.unlinkSync(pdfPath);

    res.status(200).json({
      message: "Your analysis is ready",
      data: newResume
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};




// Get user's previous resume history
 const useGetHistory = async (req, res) => {
  try {
    const { userId } = req.params; // params se userId uthao

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const resumes = await resumeModel
      .find({ user: userId })
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      message: "Your previous history",
      resumes,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({
      message: "Server error while fetching history",
      error: error.message,
    });
  }
};



module.exports = { uploadResume, useGetHistory };
