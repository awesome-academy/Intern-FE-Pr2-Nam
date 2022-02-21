import "./style.scss"
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentInfo } from "../../store/Slide/CartSlice"
import { regex_email, regex_name, regex_phone } from '../../const/regex'

function Payment() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { email, full_name, phone } = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: email,
            full_name: full_name,
            phone: phone,
            address: '',
            message: '',
            payment_method: ''
        },
        validationSchema: Yup.object({
            email:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_email, t("Please enter a valid email address")),
            full_name:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_name, t("Please enter a valid name"))
                    .max(15, t("Max length reached")),
            phone:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_phone, t("Must be a valid phone number")),
            address:
                Yup.string()
                    .required('Địa chỉ là trường bắt buộc')
                    .min(10, t("At least 10 charactors"))
                    .max(160, t("Max length reached")),
            message:
                Yup.string()
                    .required('Địa chỉ là trường bắt buộc')
                    .min(10, t("At least 10 charactors"))
                    .max(160, t("Max length reached")),
        }),
        onSubmit: () => {
            localStorage.setItem('user-payment-info', JSON.stringify(formik.values))
            dispatch(setPaymentInfo(formik.values))
            navigate("/cart")
        },
    });

    return (
        <section className='payment'>
            <div className="d-flex justify-content-center">
                <div className="col-auto col-lg-7 form">
                    <Form className='form-input' onSubmit={formik.handleSubmit}>
                        <h2 className='form-title'>{t('Your Infomation')}</h2>
                        <div className="d-flex justify-content-around">
                            <div className="col-12 col-md-5">
                                <FormGroup
                                    label={t('Full name')}
                                    id='fullName'
                                    type='text'
                                    name='fullName'
                                    placeholder='Enter your Full Name'
                                    value={formik.values.full_name}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.full_name}
                                />
                            </div>
                            <div className="col-12 col-md-5">
                                <FormGroup
                                    label={t('Email')}
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder='Enter your Email'
                                    value={formik.values.email}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.email}
                                />
                            </div>
                        </div>
                        <div className="d-flex  justify-content-around">
                            <div className="col-12 col-md-5">
                                <FormGroup
                                    label={t('Phone number')}
                                    id='phone'
                                    type='text'
                                    name='phone'
                                    placeholder='Enter your Phone'
                                    value={formik.values.phone}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.phone}
                                />
                            </div>
                            <div className="col-12 col-md-5">
                                <FormGroup
                                    label={t('Delivery address')}
                                    id='address'
                                    type='text'
                                    name='address'
                                    placeholder='Enter your Address'
                                    value={formik.values.address}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.address}
                                />
                            </div>
                        </div>
                        <div className="d-flex  justify-content-around">
                            <div className="col-12 col-md-5">
                                <FormGroup
                                    label={t('Message')}
                                    id='message'
                                    type='text'
                                    name='message'
                                    placeholder='Enter your Message'
                                    value={formik.values.message}
                                    handleChange={formik.handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-5 mt-5">
                                <div className="d-flex justify-content-around">
                                    <div className="payment__radio">
                                        <input
                                            type="radio"
                                            value="ShoppeePay"
                                            name="payment_method"
                                            onChange={formik.getFieldProps("payment_method").onChange}
                                        />
                                        <label>ShoppeePay</label>
                                    </div>
                                    <div className="payment__radio">
                                        <input
                                            type="radio"
                                            value="CreditCard"
                                            name="payment_method"
                                            onChange={formik.getFieldProps("payment_method").onChange}
                                        />
                                        <label>CreditCard</label>
                                    </div>
                                    <div className="payment__radio">
                                        <input
                                            type="radio"
                                            value="PayPal"
                                            name="payment_method"
                                            onChange={formik.getFieldProps("payment_method").onChange}
                                        />
                                        <label>PayPal</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <Button variant="outline-primary" type="submit" className="btn_view-more btn m-auto" size="lg">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default Payment;
