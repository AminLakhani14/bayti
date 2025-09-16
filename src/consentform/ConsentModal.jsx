import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './ConsentModal.css';
import { toast, ToastContainer } from 'react-toastify';

const ConsentModal = ({ show, onClose, formType, Language, programObjectiveHTML }) => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    mobile: '',
    mobile2: '',
    gender: '',
    email: '',
    homeAddress: '',
    city: '',
    treatingPhysician: '',
    treatingFacility: '',
    signature: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const sigCanvas = useRef(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.dateOfBirth.trim() !== '' &&
      formData.mobile.trim() !== '' &&
      formData.mobile2.trim() !== '' &&
      formData.gender.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.homeAddress.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.treatingPhysician.trim() !== '' &&
      formData.treatingFacility.trim() !== '' 
    );
    setIsFormValid(isValid);
  }, [formData, isSigned]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? (checked ? value : '') : value
    }));
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setIsSigned(false);
    setFormData(prev => ({ ...prev, signature: null }));
  };

  const handleSignatureEnd = () => {
    setIsSigned(!sigCanvas.current.isEmpty());
    setFormData(prev => ({
      ...prev,
      signature: sigCanvas.current.isEmpty() ? null : sigCanvas.current.toDataURL()
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    sigCanvas.current.clear();
    setIsSigned(false);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    try {
      const rawSignatureData = formData.signature 
      ? formData.signature.replace('data:image/png;base64,', '') 
      : '';

    const consentFormWithSignature = `
      ${programObjectiveHTML}
      <div id="myImg">
        {${rawSignatureData}}
      </div>
    `;

      const payload = {
        patientName: `${formData.firstName} ${formData.lastName}`,
        patientAddress: formData.homeAddress,
        patientPhone: formData.mobile,
        formType: formType,
        Language: Language,
        ConsentFormPDF: consentFormWithSignature,
        patientPhone2: formData.mobile2,
        patientGender: formData.gender,
        patientEmail: formData.email,
        patientDateOfBirth: formData.dateOfBirth,
        patientCity: formData.city,
        patientTreatingPhysician: formData.treatingPhysician,
        patientTreatingFacility: formData.treatingFacility,
      };

      const response = await fetch('http://webclass.kcompute.com:8021/api/Patient/InsertConsent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTimeout(() => {
        onClose(); 
        resetForm(); 
      }, 2000);
      toast.success('Thank you for submitting the form!');  
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="modal-content">
        <h1>Please Complete your Consent Form</h1>
        <form onSubmit={handleSubmit}>
          {/* ... rest of your form JSX remains the same ... */}
          <div className="form-row">
            <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            
            <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
            
            <div className={`form-group ${errors.dateOfBirth ? 'error' : ''}`}>
              <label>Date of Birth*</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.mobile ? 'error' : ''}`}>
              <label>Mobile*</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            </div>
            
            <div className="form-group">
              <label>Mobile 2</label>
              <input
                type="tel"
                name="mobile2"
                value={formData.mobile2}
                onChange={handleChange}
                placeholder="Enter alternate mobile"
              />
            </div>
            
            <div className={`form-group ${errors.gender ? 'error' : ''}`}>
              <label>Gender*</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                  />
                  Male
                </label>
              </div>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Home Address</label>
              <input
                type="text"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                placeholder="Enter home address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.treatingPhysician ? 'error' : ''}`}>
              <label>Treating Physician*</label>
              <input
                type="text"
                name="treatingPhysician"
                value={formData.treatingPhysician}
                onChange={handleChange}
                placeholder="Enter physician name"
              />
              {errors.treatingPhysician && <span className="error-message">{errors.treatingPhysician}</span>}
            </div>
            
            <div className="form-group">
              <label>Treating Facility</label>
              <input
                type="text"
                name="treatingFacility"
                value={formData.treatingFacility}
                onChange={handleChange}
                placeholder="Enter facility name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.city ? 'error' : ''}`}>
              <label>City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
          </div>

          <div className={`form-group ${errors.signature ? 'error' : ''}`}>
            <label>Signature*</label>
            <div className="signature-container">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  className: 'signature-canvas',
                  width: 500,
                  height: 100
                }}
                onEnd={handleSignatureEnd}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleClearSignature}
            >
              Clear Signature
            </button>
          </div>
          <div className="form-group">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsentModal;