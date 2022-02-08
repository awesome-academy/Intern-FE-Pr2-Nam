import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function FooterService() {
  const { t } = useTranslation();

  return (
    <div className="col-12 col-sm-6 col-md-4 footer__item">
      <h5 className="mb-4 footer__title ">{t("CUSTOMER SERVICE")}</h5>
      <Link to="/" className="mb-3 footer__link">
        {t("Help & Contact Us")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Returns & Refunds")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Online Stores")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Terms & Conditions")}
      </Link>
    </div>
  );
}

export default FooterService;
