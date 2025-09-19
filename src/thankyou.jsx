
export const ThankYou = () => {
  return (
    <div className="thank-you-page" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: '#28a745', marginBottom: '20px' }}>Thank You!</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Your consent form has been submitted and a nurse will contact you within 7 days if you consented via QR code in the physician clinic.
      </p>
      <button 
        onClick={() => window.location.href = '/'} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Return to Home
      </button>
    </div>
  );
};