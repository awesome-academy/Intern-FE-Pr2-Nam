import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faHeadset,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
function ServiceInfo() {
  const { t } = useTranslation();
  return (
    <section className="service-info">
      <Container className="h-100">
        <div className="h-100 justify-content-between flex-md-row align-items-center row">
          <div className="service-info__item d-flex align-items-center justify-content-center col-12 col-sm-6 col-md-4">
            <section className="d-flex align-items-center">
              <FontAwesomeIcon
                className="service-info__icon"
                icon={faShippingFast}
              />
              <div className="service-info__text">
                <h5>{t("FREE SHIPPING")}</h5>
                <p>{t("On all orders of $ 150")}</p>
              </div>
            </section>
          </div>
          <div className="service-info__item d-flex align-items-center justify-content-center col-12 col-sm-6 col-md-4">
            <section className="d-flex align-items-center">
              <FontAwesomeIcon
                className="service-info__icon"
                icon={faHeadset}
              />
              <div className="service-info__text">
                <h5>{t("24/7 SUPPORT")}</h5>
                <p>{t("Get help when you need it")}</p>
              </div>
            </section>
          </div>
          <div className="service-info__item d-flex align-items-center justify-content-center col-12 col-sm-6 col-md-4">
            <section className="d-flex align-items-center">
              <FontAwesomeIcon className="service-info__icon" icon={faUndo} />
              <div className="service-info__text">
                <h5>{t("100% MONEY BACK")}</h5>
                <p>{t("30 day money back")}</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
export default ServiceInfo;
