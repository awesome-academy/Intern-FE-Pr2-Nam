import { Container } from "react-bootstrap";
import "./style.scss";
import FooterSocial from "./FooterSocial";
import FooterCompany from "./FooterCompany";
import FooterMyAccount from "./FooterMyAccount";
import FooterService from "./FooterService";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="py-5 justify-content-between d-flex footer__main">
          <FooterSocial />
          <div className="col-12 col-md-9 col-xl-7 footer__contact d-flex">
            <FooterCompany />
            <FooterMyAccount />
            <FooterService />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
