import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function FooterMyAccount() {
  const { t } = useTranslation();

  return (
    <div className="col-12 col-sm-6 col-md-4 footer__item">
      <h5 className="mb-4 footer__title ">{t("MY ACCOUNT")}</h5>
      <Link to="/" className="mb-3 footer__link">
        {t("Sign In")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("View Cart")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Order Tracking")}
      </Link>
      <Link to="/" className="mb-3 footer__link">
        {t("Help & Support")}
      </Link>
    </div>
  );
}

export default FooterMyAccount;
