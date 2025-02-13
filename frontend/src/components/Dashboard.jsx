import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <h3>Welcome, {user?.name}!</h3>
      <div className="dashboard-content">
        <div className="upload-section">
          <h4>Upload Files</h4>
          <div className="file-upload">
            <label htmlFor="csv-upload">Upload CSV of Emails:</label>
            <input type="file" id="csv-upload" accept=".csv" />
          </div>
          <div className="file-upload">
            <label htmlFor="resume-upload">Upload Resume:</label>
            <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" />
          </div>
        </div>

        <div className="position-section">
          <h4>Select Position</h4>
          <select id="position">
            <option value="">Select a position</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Product Manager">Product Manager</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>

        <button className="btn submit-btn">Submit Application</button>
      </div>
    </div>
  );
};

export default Dashboard;
