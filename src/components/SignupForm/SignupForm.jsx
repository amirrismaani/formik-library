import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import CheckBoxGroup from "../common/CheckBoxGroup/CheckBoxGroup";
import Input from "../common/Input/Input";
import RadioGroup from "../common/RadioGroup/RadioGroup";
import Select from "../common/Select/Select";
import styles from "./SignupForm.module.css";
import CheckBox from '../common/CheckBoxGroup/CheckBox/CheckBox';

// 1. State managment
const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    gender: "",
    // used react-select
    // nationality: { label: 'Select a nationality', value: '' }
    nationality: "",
    skills: [],
    terms: false,
}

// 2. Handle submittion
const onSubmit = (values) => {
    axios.put(`http://localhost:3001/users/1`, values)
        .then(res => alert('Information has been successfully registered.'))
        .catch(err => console.log(err));
}

// 3. Handle validation
// const validate = (values) => {
//   const errors = {};
//   if (!values.name) errors.name = 'Name is required!'
//   if (!values.email) errors.email = 'Email is required!'
//   if (!values.password) errors.password = 'Password is required!'
//   return errors
// }

const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required().matches(/^09[0-9]{9}$/, 'phone is invalid'),
    password: Yup.string().required().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    gender: Yup.string().required(),
    // used react-select
    // nationality: Yup.object().required(),
    nationality: Yup.string().required(),
    skills: Yup.array().min(1).required('At least select one skill'),
    terms: Yup.boolean().required().oneOf([true], "The terms and conditions must be accepted")
});

const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
];

const skills = [
    { label: 'React.js', value: 'react.js' },
    { label: 'Vue.js', value: 'vue.js' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Node.js', value: 'node.js' },
    { label: 'TailwindCSS', value: 'tailwindcss' },
    { label: 'Next.js', value: 'next.js' },
    { label: 'Nuxt.js', value: 'nuxt.js' },
];

const nationality = [
    { label: 'Select a nationality', value: "" },
    { label: 'Iranian', value: 'IR' },
    { label: 'American', value: 'US' },
    { label: 'Italian', value: 'IT' }
]

const SignupForm = () => {
    const [saveData, setSaveData] = useState(null);
    const formik = useFormik({ initialValues: saveData || initialValues, onSubmit, validationSchema, validateOnMount: true, enableReinitialize: true });

    useEffect(() => {
        axios.get('http://localhost:3001/users/1')
            .then(res => setSaveData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.signup}>
            <h1>Signup</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input label="Name" name="name" formik={formik} />
                <Input label="Email" name="email" type="email" formik={formik} />
                <Input label="Phone" name="phone" formik={formik} />
                <Input label="Password" name="password" type="password" formik={formik} />
                <Input label="Password Confirmation" name="passwordConfirmation" type="password" formik={formik} />
                <RadioGroup radioOptions={genders} label="Gender" name="gender" formik={formik} />
                <Select label="Nationality" name="nationality" formik={formik} options={nationality} data={saveData || initialValues} />
                <CheckBoxGroup checkBoxOptions={skills} label="Skills" name="skills" formik={formik} />
                <CheckBox className={styles.mt1} option={{ label: "Terms and conditions", value: false }} name="terms" formik={formik} isFromGroup={false} />
                <button type='submit' disabled={!formik.isValid}>Register</button>
            </form>
        </div>
    );
}

export default SignupForm;