import "./index.css";
import { Link } from "react-router-dom";
import second from "./BAYTI.png";

function homepage() {
  return (
    <>
      <div className="maindiv">
        <div>
          <img src={second} className="BAYTI" alt="Bayti Logo" />
        </div>
        <div className="secondmaindiv">BAYTI HOME HEALTH CARE CENTER LLC</div>

        <div className="forms-container">
          <Link to="/adult-en" className="form-box green-box">
            <div className="english-text">Dupixent Adult</div>
            <div className="english-text">Consent form</div>
          </Link>

          <Link to="/adult-ar" className="form-box teal-box">
            <div className="arabic-text">نموذج إقرار موافقة المريض</div>
            <div className="arabic-text">البالغ عقار دوبكسنت</div>
          </Link>

          <Link to="/child-en" className="form-box green-box ">
            <div className="english-text">Dupixent Minor</div>
            <div className="english-text">Consent form</div>
          </Link>

          <Link to="/child-ar" className="form-box teal-box">
            <div className="arabic-text">نموذج إقرار موافقة المريض</div>
            <div className="arabic-text"> القاصر عقار دوبكسنت</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default homepage;
