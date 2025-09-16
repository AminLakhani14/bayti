import { useState } from "react";
import ConsentModal from "./ConsentModal";

const ConsentMinorEnglishUAE = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const programObjectiveHTML = `
      <div class="program-section">
        <h2>1. OBJECTIVE OF THE PROGRAM</h2>
        <p>My Way support program is a program (“Program”) that supports patients being prescribed Dupixent® in order to
        appropriately assist them in achieving the treatment regimen prescribed to them by their treating physician and
        providing patients with the disease awareness and educational support that they shall need to live well with their
        conditions. The Program is also intended to support better understanding of the diseases treated with our Drug, and
        their management through advance analytics and research performed on anonymized and aggregated data sets built
        from the data collected as part of the Program</p>
        
        <p>The Program is proposed and initiated by SANOFI-AVENTIS GROUPE (DMCC Branch) (“Sanofi”), and, implemented and
        managed by BAYTI Home Health Services (“Service Provider”) on behalf of Sanofi.</p>
        
        <p>This Program is not intended to promote our Drug or any other Sanofi products, it does not support any claim on the
        efficacy and/or safety of the Drug. The Program is not intended either for direct promotion purposes of the Drug or other
        Sanofi products and the information collected in the course of the Program is not intended to be used for commercial
        and/or marketing purposes.</p>
      </div>
      
      <div class="program-section">
        <h2>2. SUPPORT SERVICES</h2>
        <p>The Program has exclusive educational purposes and is designed to provide you with tailored information and to
        support your condition, via a panel of services (hereafter designated by “Support Services”) as below:
        </p>
        
        <ul>
          <li>You will be provided with the support to better manage your disease and treatment through nurses who will contact you and/or meet with you as per your need.</li>
          <li>You will receive a hotline number and educational material. Such Support Services may be delivered to you by a variety of channels, including but not limited to being contacted by trained personnel (the “Educators”) in United Arab Emirates. </li>
        </ul>
        
        <p>This Program is not a substitute for doctors' visits. The Service Provider and its Educators may not offer advice or information that forms part of your relationship with your doctor; they merely offer an educational service which shall not be substituted for medical advice at any time.</p>
      </div>

        <div class="program-section">
      <h2>3. YOU AND YOUR PARTICIPATION TO THE PROGRAM</h2>
      <h3>Registration and withdrawal</h3>
      <p>Registration is entirely voluntary and free of charge.</p>
      <p>You can withdraw at any time without giving any reason. This can be done by sending a written notification, signed & dated, to BAYTI Home Health Care through email address: guadelay@barytime.com, Or by using the contact details provided below: 800 – BAYTI (9955)</p>
      
      <p>Likewise, upon prior notice given to you, Sanofi reserves the right to terminate the Program at any time and for any reason. Your participation may also be interrupted at any time by your doctor (i.e. for medical reasons).</p>
      
      <p>If you choose to stop using the Drug, your participation in the Program will automatically be intentional. Indeed, use of the Drug is a prerequisite to your participation in the Program but be assured that your decision to withdraw from the Program and/or to stop your treatment with the Drug will have no impact whatsoever on your medical surveillance and monitoring by your doctor.</p>
      
      <h3>A.Your Personal Information</h3>
      <p>In order to benefit from the Support Services contained in the Program, you will need to register and
provide your contact details. As part of the Program, you will share through your interaction with the
Service Provider and its Educators Personal Information (as defined below). </p>
      
      <ul>
        <li><strong style="font-weight: 700;">- "Personal Information"</strong>means all personal information that you provide as part of your registration to the
        Program and interaction with its Educators or personal data you may share for the purposes of the Support
        Services.</li>
        <li><strong style="font-weight: 700;">- Data Sharing/Disclosure:</strong> Your Personal Information may be shared with various stakeholders as part of the management of the Program: (i) the Service Provider, (ii) its Education, (iii) Your Doctor, (iv) Sanofi pharmacovigilance and safety and (v) Health Resources.</li>
        <li>- Each stakeholder actively within the Program and processing your Personal Information for a lawful basis is bound by applicable national and international laws and regulations which protect data privacy and shall endeavor to collect, proceed, maintain and store your Personal Information in a private and secure manner.</li>
        <li><strong style="font-weight: 700;">- Safety:</strong>The Service Provider will maintain appropriate technical and organizational measures
        against unauthorized or unlawful access to and processing of your Personal Information, and further
        against accidental loss, alteration, disclosure or destruction of or damage to such Personal
        Information.</li>
        <li><strong style="font-weight: 700;">- Controller:</strong>Your personal data will be processed in a confidential and secure way primarily by BAYTI Home
        Health Care. Your Personal Information will be held on a database at BAYTI Home Health Care end and
        managed within the applicable country regulations. 
        </li>
        <li><strong style="font-weight: 700;">- Consent Withdrawal:</strong> Once the Program is complete or if you decide to withdraw from the Program, your
        Personal Information will be deleted as soon as reasonably possible, as it shall not be kept longer than
        necessary. Your Personal Information will be deleted in compliance with the Sanofi Standard Retention
        Schedule, unless in cases where it is required by law to keep this data, e.g. in cases where Sanofi or the
        Services Provider is obliged to keep the data for reasons of drug safety obligations as mandated by law or as
        mandated by the local regulator. Indeed, any adverse event or unexpected reactions regarding your
        treatment shall be reported to Sanofi’s Pharmacovigilance Department or any successor of Sanofi, owning /
        commercializing the Drug. In such cases, your Personal Information, except for your name (your sole initials
        may be shared) and your contact information, may be collected, processed and retained by the Sanofi
        Pharmacovigilance Department, in which case your identity will be protected and will remain confidential at
        all times. 
        </li>
      </ul>
      
      <p>Except as mentioned above regarding Sanofi pharmacovigilance obligation, your Personal Information will not be communicated to Sanofi.</p>
      
      <p><b style="font-weight: 700;">Purpose:</b> The purpose of collecting personal and health data is to be able to communicate with you anytime during your enrollment period.</p>
      
      <p><strong style="font-weight: 700;">Categories/Content of Data:</strong> In order to achieve the purposely described above, the following personal data will be collected and processed in the manner described in this form:</p>
      
      <ul>
        <li>Name, ID, and contact details (e.g., mobile number and email).</li>
        <li>Gender, age, nationality.</li>
        <li>Details of your medical history, including comorbidities, and medications.</li>
      </ul>
      
      <p><strong style="font-weight: 700;">Methods of Collection:</strong> Your personal data shall be collected through the following means: paper form, electronic form, personal interview conducted by the controller's personnel (online or face-to-face), application communications, text messages, email and phone calls.</p>
      
      <p><strong style="font-weight: 700;">Legal Justification:</strong> Your personal data will be processed on one or more of the following bases: (i) your consent, (ii) the processing achieves the purposes of the program and/or a legitimate interest for the Controller(s)/program parties, (iii) legal requirements.</p>
      
      <p><strong style="font-weight: 700;">Duration of Processing:</strong> Your data will be kept as long as your participation in the program continue, subject to applicable local requirements, legal obligations, judicial interest, and direct-territorial laws, from the effective date of this form. For the avoidance of doubt, nothing in this participant information sheet and consent form affects any personal data already collected and processed by the controller and collaborators outside the scope of the agreement.</p>
      
      <h3>B. Your Personal Data Protection Rights:</h3>
      <p>As a participant in the My Way support program, the Service Provider will answer appropriately and promptly to all your inquiries regarding the Program and/or any demands regarding the information you may provide. In accordance with applicable data protection laws, you have the right to exercise your data protection rights, which includes:</p>
      <p>The right to access your personal data; rectify any incorrect information; request restriction of processing; get informed about the purposes and methods of the processing; request destruction of your personal data and obtain your personal data in a readable and clear format.</p>
      
      <p>To exercise your data protection rights, contact BAYTI Home Health Care in any of the following ways:</p>
      <p style="text-align: center;">(i) E-mail: pspasterly@baytihnc.com, or</p>
      <p style="text-align: center;">(ii) Phone: 800 – BAYTI (9955).</p>
      
      <h3>C. De-identification and secondary use</h3>
      <p>As mentioned above, the access to your Personal Information as part of the Program will be strictly limited. Beyond the Program, Sandri and the health authorities may need to be able to re-use the data generated by the Program to better understand the Drug Safety Profile, in order to improve overall management of the disease. This is called the secondary use.</p>
      
      <p>Sandri will not have access to your Personal Information, except for pharmacovigilance reasons, under the strict conditions defined above. Your data will be de-identified and aggregated. This means that all the information that could lead to your personal identification will be removed from the program database. The information that will remain in the de-identified and aggregated Program database will not give any detail on yourself and will neither permit to know nor do control you. This data will be used for research and secondary analysis purposes only.</p>
      
      <p>As part of better disease understanding and management, your data will be processed anonymously in the frame of advance research and analytics questions and scientific publication. Your personal data will remain anonymous and de-identified and will not be disclosed at any stage of the research.</p>
      
      <p>Only information is such format (i.e. information with no disclosure of your identity and no information that can lead to your identification) may be shared with i) the Service Provider, (ii) its Educators, (iii) Your Doctor, (iv) Sandri pharmacovigilance and safety, (v) Health authorities and (vi) Sandri and companies of the Sandri Group, subject to the conditions mentioned above.</p>
    </div>
    
    <div class="consent-section">
    
      <h2 style= "color: #0065a0;text-align: center;text-decoration-line: underline;font-weight: bolder;">YOUR CONSENT</h2>
      <p><em>*This needs to be filled out ONLY by the Patient him/herself and/or Guardian, and by no means shall the blanks be pre-filled by the HCP/ Educator or other.* </em></p>
      
      <p>I ______ , father/mother and/or Legal guardian of_________,(the “Minor”) currently residing at ______, with contact number: ______.</p>

      <p> ______ consent to give my own and the Minor’s relevant Personal Information to the Educator/Service Provider in order to permit the Minor’s participation in the Program.</p>
      
      <p>In the limits set out above, I further consent to:</p>
      
      <p>The collection, processing and retention of my own and the Minor’s Personal Information by the Minor’s doctor,
      the Educator/Service Provider and to Sanofi pharmacovigilance and health authorities and I understand that my
      signature to this consent form will in no way discharge the Minor’s doctor or the Service Provider from their
      responsibilities. By signing this consent, I agree in my personal capacity of legal guardian of the Minor to have the
      Minor participate in the Program. I have legal capacity to give my informed consent on behalf of the Minor, in other
      words, I am over the age of 18 years old and I am the father/mother and/or legal guardian of the Minor.
      </p>
      
      <p>I also consent to allow Sanofi for the secondary use of my anonymized and de-identified data for the purpose of
research analytics and publication, to help better disease awareness, and disease understanding and management. </p>
      
      <p>I understand that any safety-related events or product complaints will be reported to the relevant parties in line
with privacy and legal obligations. </p>
      
      <p>I have been assured that participation in this program is voluntary and free of charge. I may withdraw from the
program at any time without affecting my medical care or disease management. </p>
      
      <p>I acknowledge that no monetary compensation or other consideration will be provided for my participation in this
      program. </p>
      
      <p>I understand there will be a transfer of my personal information between BAYTI Home Health Services LLC),
pharmacovigilance reporting and health authorities.</p>
      
      <p>I understand that I will not to be notified upon each transfer of my Personal Information between the program’s
parties</p>
      
      <p>
      I have read the informed consent and understand its content, I had the chance to ask questions and they were
answered and have understood the answers provided, I have been given the time to process and discuss the
information with others and the Minor and to decide whether or not the Minor should take part in the Program. 

      </p>
      
      <p>I understand that I can exercise my data protection rights, including withdrawal of this consent, at any time, verbally
or in writing, without giving reasons and without this having any adverse consequences for me or without affecting
my medical care or disease management. </p>
      
      <p> confirm that I have received and understood all information about the Program. I understand that I am free to ask
questions at any time. I confirm that all my questions have been answered and I have had enough necessary
consideration time. </p>
    </div>

    <div className="form-header" style= "margin-bottom: 2rem; font-family: Arial, sans-serif;">
        <table className="form-metadata" style= "width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
          <tbody style= "border: 1px solid;">
            <tr style= "border: 1px solid;">
              <td style= "border: 1px solid;"><strong style= "margin-left: 10px;">Form Title</strong></td>
              <td style= "border: 1px solid;"><strong style= "margin-left: 10px;">MAT code</strong></td>  
              <td style= "border: 1px solid;"><strong style= "margin-left: 10px;">Approval Date</strong></td>
              <td style= "border: 1px solid;"><strong style= "margin-left: 10px;">Edition</strong></td>
              <td style= "border: 1px solid;"><strong style= "margin-left: 10px;">Last Revision Date</strong></td>
              <td style= "border: 1px solid;"><strong style= "margin-left: 10px;">Next Revision Date</strong></td>
            </tr>
            <tr>
              <td style= "border: 1px solid; padding-left: 10px;">Patient Consent Form- Dupixent (Minors- English)</td>
              <td style= "border: 1px solid; padding-left: 10px;">MAT-AE-2500625/vA/July 2025</td>
              <td style= "border: 1px solid; padding-left: 10px;">July 2025</td>
              <td style= "border: 1px solid; padding-left: 10px;">2</td>
              <td style= "border: 1px solid; padding-left: 10px;">July 2025</td>
              <td style= "border: 1px solid; padding-left: 10px;">July 2027</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

  const handleSubmitClick = () => {
    if (isChecked) {
      setShowModal(true);
    }
  };


  return (
    <>
      <ConsentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        programObjectiveHTML={programObjectiveHTML}
        formType='Minor'
        Language="English"
      />
      <div
        className="consent-container"
        style={{ marginLeft: "3%", marginTop: "0px" }}
      >
        <h1>Dupixent Minor Consent form</h1>
        <div dangerouslySetInnerHTML={{ __html: programObjectiveHTML }} />
        <div className="form-controls">
          <div className="">
            <label>
              <input
                type="checkbox"
                required
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              I Consent
            </label>
          </div>
          <button
            style={{
              background: "rgb(25, 118, 210)",
              border: "none",
              color: "rgb(255, 255, 255)",
              padding: "10px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "14px",
              cursor: isChecked ? "pointer" : "not-allowed",
              opacity: isChecked ? 1 : 0.3,
            }}
            onClick={isChecked ? handleSubmitClick : null}
            disabled={!isChecked}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ConsentMinorEnglishUAE;
