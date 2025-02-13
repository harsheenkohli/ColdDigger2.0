import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Utility function to convert a string to title case
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploadStatus("");

    const formData = new FormData();
    const csvFile = document.getElementById('csv-upload').files[0];
    const resumeFile = document.getElementById('resume-upload').files[0];

    if (csvFile) formData.append('csv_file', csvFile);
    if (resumeFile) formData.append('resume', resumeFile);

    try {
      const response = await axios.post('/api/upload-files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(
        `Files processed successfully. ${
          response.data.new_contacts_added 
            ? `Added ${response.data.new_contacts_added} new contacts.` 
            : ''
        }`
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <h2>Welcome, <span>{user?.name ? toTitleCase(user.name) : ''}</span>!</h2>
      {/* <h2>Welcome, <span>Harsheen</span>!</h2> */}
      
      {error && <p className="error-message">{error}</p>}
      {uploadStatus && <p className="success-message">{uploadStatus}</p>}
      
      <form onSubmit={handleFileSubmit}>
        <div className="upload-section">
          <h4>Upload Files</h4>
          <div className="file-upload">
            <label htmlFor="csv-upload">Upload CSV of Emails:</label>
            <input type="file" id="csv-upload" accept=".csv" />
            <small>Format: name, email, title, company</small>
          </div>
          <div className="file-upload">
            <label htmlFor="resume-upload">Upload Resume:</label>
            <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" />
          </div>
        </div>
        <button type="submit" className="btn submit-btn">
          Submit Files
        </button>
      </form>
    </div>
  );
};

export default Dashboard;