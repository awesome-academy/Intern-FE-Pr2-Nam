import "./style.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { regex_email, regex_password } from '../../const/regex'
import { useTranslation } from "react-i18next";
import { getUserFromDbJson } from "../../store/Slide/UserSlice"
import { Link } from "react-router-dom";

function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_email, t("Please enter a valid email address")),
            password:
                Yup.string()
                    .required(t("Required"))
                    .matches(regex_password, t("Password must be 7-19 charactors and contain at least one letter, one number and a special charactors"))
        }),
        onSubmit: async (value) => {
            try {
                const { email, password } = formik.values
                const userFirebase = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                const user = userFirebase.user
                await dispatch(getUserFromDbJson(user.uid))
                navigate(-1)
            } catch (err) {
                return err.message
            }
        }
    })

    return (
        <section className='signin'>
            <div className="d-flex justify-content-center">
                <div className="col-auto col-lg-4 form">
                    <Form className='form-input' onSubmit={formik.handleSubmit}>
                        <h2 className='form-title'>{t('Sign In')}</h2>
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
                            label={t('Password')}
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Enter your Password'
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                            error={formik.errors.password}
                        />
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <Link className="signin__link" to="/signup">
                                {t('Create an account?')}
                            </Link>
                            <Button variant="outline-primary" type="submit" className="btn_view-more btn" size="lg">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default Login;
