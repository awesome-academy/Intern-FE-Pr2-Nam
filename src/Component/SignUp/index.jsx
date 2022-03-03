import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { regex_email, regex_password, regex_phone, regex_name } from '../../const/regex'
import { useTranslation } from "react-i18next";
import { addUserToDbJson } from "../../store/Slide/UserSlice"


function Signup() {

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [user, setUser] = useState({});

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
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
      password:
        Yup.string()
          .required(t("Required"))
          .matches(regex_password, t("Password must be 7-19 charactors and contain at least one uppercase letter, one lowercase letter and one number")),
      confirm_password:
        Yup.string()
          .required(t("Required"))
          .oneOf([Yup.ref("password"), null], t("Password must match"))
    }),
    onSubmit: async (value) => {
      try {
        const { full_name, email, password, phone } = formik.values
        const userFirebase = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = userFirebase.user
        const newUser = { id: user.uid, full_name, email, phone, password, role: 2 }
        localStorage.setItem('user-info', JSON.stringify({
          full_name,
          email,
          phone
        }))
        dispatch(addUserToDbJson(newUser))
        navigate(-1)
      } catch (err) {
        return err.message
      }
    }
  });

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="signup">
      <div className="d-flex justify-content-center">
        <div className="col-auto col-lg-4 form">
          <Form className="form-input" onSubmit={formik.handleSubmit}>
            <h2 className="form-title">{t('Register')}</h2>
            <FormGroup
              label={t('Full name')}
              id='full_name'
              type='full_name'
              name='full_name'
              placeholder='Enter your full name'
              value={formik.values.full_name}
              handleChange={formik.handleChange}
              error={formik.errors.full_name}
            />
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
            <FormGroup
              label={t('Password')}
              id='password'
              type='password'
              name='password'
              placeholder='Enter your Password'
              value={formik.values.password}
              handleChange={formik.handleChange}
              error={formik.errors.password}
            />
            <FormGroup
              label={t('Confirm password')}
              id='confirm_password'
              type='password'
              name='confirm_password'
              placeholder='Confirm your password'
              value={formik.values.confirm_password}
              handleChange={formik.handleChange}
              error={formik.errors.confirm_password}
            />
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="outline-primary" type="submit" className="btn_view-more btn text-center" size="lg">{t("Submit")}</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
