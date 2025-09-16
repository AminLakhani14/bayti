import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './ConsentModal.css';
import { toast, ToastContainer } from 'react-toastify';

const ArabicConsentModal = ({ show, onClose, formType, Language, programObjectiveHTML }) => {
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
    } finally {
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
      <div className="modal-content" 
      dir="rtl"
      style={{
        textAlign: 'right',
        fontFamily: "'Arial Arabic', 'sans-serif'",
      }}
      > 
      <h1>يرجى إكمال نموذج الموافقة الخاص بك</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
              <label>الاسم الأول*</label> 
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="أدخل الاسم الأول" 
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
                <label>الاسم الأخير*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="أدخل الاسم الأخير"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
              
              <div className={`form-group ${errors.dateOfBirth ? 'error' : ''}`}>
              <label>تاريخ الميلاد*</label> 
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
                 <label>رقم الجوال*</label> 
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="أدخل رقم الجوال"
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
              </div>
              
              <div className="form-group">
                <label>رقم جوال إضافي</label>
                <input
                  type="tel"
                  name="mobile2"
                  value={formData.mobile2}
                  onChange={handleChange}
                  placeholder="أدخل رقم جوال إضافي"
                />
              </div>
              
              <div className={`form-group ${errors.gender ? 'error' : ''}`}>
                <label>الجنس*</label> 
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === 'Female'}
                      onChange={handleChange}
                    />
                    <label>الجنس</label> 
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
                      onChange={handleChange}
                    />
                    <label>ذكر</label> 
                  </label>
                </div>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
              <label>البريد الإلكتروني</label> 
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
              <label>عنوان المنزل</label> 
                <input
                  type="text"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  placeholder="أدخل عنوان المنزل"
                />
              </div>
            </div>

            <div className="form-row">
              <div className={`form-group ${errors.treatingPhysician ? 'error' : ''}`}>
                 <label>الطبيب المعالج*</label> 
                <input
                  type="text"
                  name="treatingPhysician"
                  value={formData.treatingPhysician}
                  onChange={handleChange}
                  placeholder="أدخل الطبيب المعالج"

                />
                {errors.treatingPhysician && <span className="error-message">{errors.treatingPhysician}</span>}
              </div>
              
              <div className="form-group">
                <label>المنشأة الطبية</label> 
                <input
                  type="text"
                  name="treatingFacility"
                  value={formData.treatingFacility}
                  onChange={handleChange}
                  placeholder="أدخل المنشأة الطبية"

                />
              </div>
            </div>

            <div className="form-row">
              <div className={`form-group ${errors.city ? 'error' : ''}`}>
              <label>المدينة*</label> 
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="أدخل المدينة"

                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
            </div>

              <div className={`form-group ${errors.signature ? 'error' : ''}`}>
                 <label>التوقيع*</label>
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

            <div className="modal-actions" style={{justifyContent: 'end'}}>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleClearSignature}
            >
              Clear Signature
            </button>
          </div>
          <div className="form-group" style={{marginLeft: '20px'}}>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!isFormValid}
            >
               تقديم
            </button>
             </div>
        </form>
      </div>
    </div>
  );
};

export default ArabicConsentModal;