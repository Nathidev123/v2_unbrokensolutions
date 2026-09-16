import "./ThankYou.css";
const ThankYouPage = () => {
  return (
    <main className="thank-div">
      <div className="thank-content">
        <div className="thank-icon">✓</div>

        <p className="thank-eyebrow">REQUEST RECEIVED</p>

        <h1>
          Thank you for choosing
          <br />
          Unbroken Solutions.
        </h1>

        <p className="thank-message">
         Your request has been successfully submitted. 
         We’ll send a confirmation email to the address
          you provided — please keep an eye on your inbox.
        </p>

        <div className="thank-next">
          <div className="thank-step">
            <span>01</span>
            <div>
              <h3>Keep an eye on your inbox</h3>
              <p>
                We’ll send a confirmation email to the address you provided.
              </p>
            </div>
          </div>

          <div className="thank-step">
            <span>02</span>
            <div>
              <h3>Your quotation</h3>
              <p>
                Your quotation PDF will be included with the confirmation email.
              </p>
            </div>
          </div>

          <div className="thank-step">
            <span>03</span>
            <div>
              <h3>We'll take it from here</h3>
              <p>
                Our team will review your request and contact you if any further
                information is required.
              </p>
            </div>
          </div>
        </div>

        <div className="thank-footer">
          <p>Need to make another enquiry?</p>
          <a href="/">Return to Home</a>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
