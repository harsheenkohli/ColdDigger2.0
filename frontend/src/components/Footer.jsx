const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ColdWater</h3>
          <p>Empowering students in their job search journey</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@coldwater.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ColdWater. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
