import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./ConsentModal.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ArabicConsentModal = ({
  show,
  onClose,
  formType,
  Language,
  programObjectiveHTML,
}) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobile: "",
    mobile2: "",
    gender: "",
    email: "",
    homeAddress: "",
    city: "",
    treatingPhysician: "",
    treatingFacility: "",
    signature: null,
    // New fields for minor form
    guardianName: "",
    relationship: "",
    otherRelationship: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // New state for loader

  const [errors, setErrors] = useState({});
  const sigCanvas = useRef(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Base validation for all forms
    let isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.dateOfBirth.trim() !== "" &&
      formData.mobile.trim() !== "" &&
      // formData.mobile2.trim() !== '' &&
      formData.gender.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.homeAddress.trim() !== "" &&
      formData.city.trim() !== "" &&
      // formData.treatingPhysician.trim() !== "" &&
      // formData.treatingFacility.trim() !== "" &&
      isSigned;

    if (formType === "Minor") {
      isValid =
        isValid &&
        formData.relationship.trim() !== "" &&
        (formData.relationship !== "5" ||
          formData.otherRelationship.trim() !== "");
    }

    setIsFormValid(isValid);
  }, [formData, isSigned, formType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? (checked ? value : "") : value,
    }));
  };

  const handleClearSignature = () => {
    sigCanvas?.current?.clear();
    setIsSigned(false);
    setFormData((prev) => ({ ...prev, signature: null }));
  };

  const handleSignatureEnd = () => {
    setIsSigned(!sigCanvas.current.isEmpty());
    setFormData((prev) => ({
      ...prev,
      signature: sigCanvas.current.isEmpty()
        ? null
        : sigCanvas.current.toDataURL(),
    }));
  };

  const handleClose = () => {
    onClose();
    resetForm();
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
    setIsLoading(true); // Start loading

    try {
      const rawSignatureData = formData.signature
        ? formData.signature.replace("data:image/png;base64,", "")
        : "";

      let relationshipValue = "";
      let otherRelationshipValue = "";

      if (formType === "Minor") {
        if (formData.relationship === "5") {
          // For "Other" option, use the specified relationship
          relationshipValue = "Other";
          otherRelationshipValue = formData.otherRelationship;
        } else {
          // For predefined options, map to the correct value
          relationshipValue =
            formData.relationship === "1"
              ? "Mother"
              : formData.relationship === "2"
              ? "Father"
              : formData.relationship === "3"
              ? "Brother"
              : formData.relationship === "4"
              ? "Sister"
              : "";
        }
      }

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
        ...(formType === "Minor" && {
          relationship: relationshipValue,
          otherRelationship: otherRelationshipValue,
        }),
      };

      const response = await fetch(
        "https://api.dmetco.net:43331/Api/Patient/InsertConsent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setTimeout(() => {
        setIsLoading(false); // Stop loading
        onClose();
        resetForm();
        navigate("/thankyou");
      }, 2000);
      toast.success("Thank you for submitting the form!");
    } catch (error) {
      setIsLoading(false); // Stop loading
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
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
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div
        className="modal-content"
        dir="rtl"
        style={{
          textAlign: "right",
          fontFamily: "'Arial Arabic', 'sans-serif'",
        }}
      >
        <button
          className="close-icon-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h1>يرجى إكمال نموذج الموافقة الخاص بك</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className={`form-group ${errors.firstName ? "error" : ""}`}>
              <label>الاسم الأول*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="أدخل الاسم الأول"
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className={`form-group ${errors.lastName ? "error" : ""}`}>
              <label>الاسم الأخير*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="أدخل الاسم الأخير"
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>

            <div className={`form-group ${errors.dateOfBirth ? "error" : ""}`}>
              <label>تاريخ الميلاد*</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>
          </div>

          {/* Guardian fields for minor forms */}
          {formType === "Minor" && (
            <>
              <div className="form-row">
                <div
                  className={`form-group ${errors.relationship ? "error" : ""}`}
                >
                  <label>العلاقة بالمريض*</label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                  >
                    <option value="">اختر العلاقة</option>
                    <option value="1">أم</option>
                    <option value="2">أب</option>
                    <option value="3">أخ</option>
                    <option value="4">أخت</option>
                    <option value="5">أخرى</option>
                  </select>
                  {errors.relationship && (
                    <span className="error-message">{errors.relationship}</span>
                  )}
                </div>
              </div>

              {formData.relationship === "5" && (
                <div className="form-row">
                  <div
                    className={`form-group ${
                      errors.otherRelationship ? "error" : ""
                    }`}
                  >
                    <label>حدد العلاقة*</label>
                    <input
                      type="text"
                      name="otherRelationship"
                      value={formData.otherRelationship}
                      onChange={handleChange}
                      placeholder="حدد العلاقة"
                    />
                    {errors.otherRelationship && (
                      <span className="error-message">
                        {errors.otherRelationship}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="form-row">
            <div className={`form-group ${errors.mobile ? "error" : ""}`}>
              <label>رقم الجوال*</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="أدخل رقم الجوال"
              />
              {errors.mobile && (
                <span className="error-message">{errors.mobile}</span>
              )}
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

            <div className={`form-group ${errors.gender ? "error" : ""}`}>
              <label>الجنس*</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  أنثى
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  ذكر
                </label>
              </div>
              {errors.gender && (
                <span className="error-message">{errors.gender}</span>
              )}
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
                placeholder="أدخل البريد الإلكتروني"
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

          {/* <div className="form-row">
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
            </div> */}

          <div className="form-row">
            <div className={`form-group ${errors.city ? "error" : ""}`}>
              <label>المدينة*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="أدخل المدينة"
              />
              {errors.city && (
                <span className="error-message">{errors.city}</span>
              )}
            </div>
          </div>

          <div className={`form-group ${errors.signature ? "error" : ""}`}>
            <label>التوقيع*</label>
            <div className="signature-container">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  className: "signature-canvas",
                  width: 500,
                  height: 100,
                }}
                onEnd={handleSignatureEnd}
              />
            </div>
          </div>

          <div className="modal-actions" style={{ justifyContent: "end" }}>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleClearSignature}
            >
              مسح التوقيع
            </button>
          </div>
          <div className="form-group" style={{ marginLeft: "20px" }}>
            <div className="modal-footer-actions">
              <button type="button" className="close-btn" onClick={handleClose}>
                يغلق    
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={!isFormValid || isLoading}
              >
                تقديم
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArabicConsentModal;
