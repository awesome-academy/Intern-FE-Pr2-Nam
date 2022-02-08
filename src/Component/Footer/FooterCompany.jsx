import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function FooterCompany() {
  const { t } = useTranslation();

  return (
    <div className="col-12 col-sm-6 col-md-4 footer__item">
      <h5 className="footer__title mb-4">{t("company")}</h5>
      <Link to="/" className="mb-3 footer__link">
        {t("What We Do")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Available Services")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Latest Posts")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("FAQs")}
      </Link>
    </div>
  );
}

export default FooterCompany;
