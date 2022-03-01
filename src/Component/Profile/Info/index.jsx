import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useFormik } from "formik";
import FormGroup from "../../FormGroup"
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import { regex_email, regex_phone, regex_name } from '../../../const/regex'
import { updateUser } from "../../../store/Slide/UserSlice"
import { toast, ToastContainer } from "react-toastify";

function Info() {

    const { id, email, full_name, phone } = JSON.parse(localStorage.getItem('user-info'))
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handleEdit = () => {
        setIsOpenEdit(!isOpenEdit)
    }

    const formik = useFormik({
        initialValues: {
            full_name: full_name,
            email: email,
            phone: phone,
        },
        validationSchema: Yup.object({
            full_name:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_name, t("Please enter a valid name"))
                    .max(15, t("Max length reached")),
            email:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_email, t("Please enter a valid email address")),
            phone:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_phone, t("Must be a valid phone number")),
        }),
        onSubmit: async (value) => {
            try {
                await dispatch(updateUser({ id: id, newUserData: formik.values })).unwrap()
                toast.success(t("Your infomation has been updated!"), {
                    position: "top-right",
                    autoClose: 2500,
                });
                setIsOpenEdit(!isOpenEdit)

            } catch (err) {
                return err.message
            }
        }
    });

    return (
        <div className="info">
            <div className="d-flex justify-content-center">
                <div className="col-12 col-md-2">
                    <img className="info__img" src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="default img" />
                </div>
                <div className="col-12 col-md-3">
                    <button className="info__edit-btn" onClick={() => handleEdit()}><FaEdit /></button>
                    {isOpenEdit ?
                        <div>
                            <Form className="form-input" onSubmit={formik.handleSubmit}>
                                <h2 className="form-title">{t('Edit')}</h2>
                                <FormGroup
                                    label={t('Full name')}
                                    id='full_name'
                                    type='full_name'
                                    name='full_name'
                                    placeholder={t("Enter your full name")}
                                    value={formik.values.full_name}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.full_name}
                                />
                                <FormGroup
                                    label={t('Email')}
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder={t("Enter your Email")}
                                    value={formik.values.email}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.email}
                                />
                                <FormGroup
                                    label={t('Phone number')}
                                    id='phone'
                                    type='text'
                                    name='phone'
                                    placeholder={t("Enter your Phone")}
                                    value={formik.values.phone}
                                    handleChange={formik.handleChange}
                                    error={formik.errors.phone}
                                />
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button variant="outline-primary" type="submit" className="btn_view-more btn text-center" size="lg">{t("Submit")}</Button>
                                </div>
                            </Form>
                        </div>
                        :
                        <>
                            <div className="info__main">
                                <div className="d-flex">
                                    <h2 className="info__sub">Email:</h2>
                                    <span>{email}</span>
                                </div>
                                <div className="d-flex">
                                    <h2 className="info__sub">Full name:</h2>
                                    <span>{full_name}</span>
                                </div>
                                <div className="d-flex">
                                    <h2 className="info__sub">Phone:</h2>
                                    <span>{phone}</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Info;
