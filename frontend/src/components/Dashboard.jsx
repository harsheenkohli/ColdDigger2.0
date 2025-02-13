// import { useAuth } from "../context/AuthContext";

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="container">
//       <h2>Dashboard</h2>
//       <h3>Welcome, {user?.name}!</h3>
//       <div className="dashboard-content">
//         <div className="upload-section">
//           <h4>Upload Files</h4>
//           <div className="file-upload">
//             <label htmlFor="csv-upload">Upload CSV of Emails:</label>
//             <input type="file" id="csv-upload" accept=".csv" />
//           </div>
//           <div className="file-upload">
//             <label htmlFor="resume-upload">Upload Resume:</label>
//             <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" />
//           </div>
//         </div>

//         <div className="position-section">
//           <h4>Select Position</h4>
//           <select id="position">
//             <option value="">Select a position</option>
//             <option value="Software Engineer">Software Engineer</option>
//             <option value="Data Scientist">Data Scientist</option>
//             <option value="Product Manager">Product Manager</option>
//             <option value="UI/UX Designer">UI/UX Designer</option>
//           </select>
//         </div>

//         <button className="btn submit-btn">Submit Application</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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
      <h2>Dashboard</h2>
      <h3>Welcome, {user?.name}!</h3>
      
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