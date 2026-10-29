import baytiLogo from "./bayti-landscape.png";
import sanofiLogo from "./sanofi.png";

const ConsentLogos = () => (
  <div
    dir="ltr"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 3%",
    }}
  >
    <img src={baytiLogo} alt="Bayti Logo" style={{ height: "60px" }} />
    <img src={sanofiLogo} alt="Sanofi Logo" style={{ height: "40px" }} />
  </div>
);

export default ConsentLogos;
