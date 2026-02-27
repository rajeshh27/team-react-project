function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h3>SportSpot</h3>
          <p>Your ultimate destination for premium sports gear and apparel. Level up your game with the best in the industry.</p>
        </div>
        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Shipping Info</li>
            <li>Returns & Exchanges</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Store Locator</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-row">
            <span>FB</span> <span>TW</span> <span>IG</span> <span>YT</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SportSpot. Build for athletes, by athletes.</p>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .main-footer {
          margin-top: 5rem;
          padding: 4rem 0 2rem;
          border-top: 1px solid #e2e8f0;
          color: #1e293b;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-col h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .footer-col h4 {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .footer-col p {
          color: #64748b;
          line-height: 1.6;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col li {
          margin-bottom: 0.75rem;
          color: #64748b;
          cursor: pointer;
        }
        .footer-col li:hover {
          color: #3b82f6;
        }
        .social-row {
          display: flex;
          gap: 1rem;
        }
        .social-row span {
          width: 40px;
          height: 40px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
        }
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid #f1f5f9;
          text-align: center;
          color: #94a3b8;
          font-size: 0.9rem;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}} />
    </footer>
  )
}

export default Footer

