import { Link } from "react-router-dom";
import { FaGoogle, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
function FooterSocial() {
  return (
    <div className="d-flex flex-column justify-content-between col-12 col-md-3 col-xl-5">
      <div className="footer__item">
        <span className="footer__logo">Flatlogic.</span>
        <p className="footer__text">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s,
        </p>
      </div>
      <div className="footer__social">
        <Link to="/">
          <FaGoogle />
        </Link>
        <Link to="/">
          <FaTwitter />
        </Link>
        <Link to="/">
          <FaLinkedin />
        </Link>
        <Link to="/">
          <FaFacebook />
        </Link>
      </div>
    </div>
  );
}

export default FooterSocial;
