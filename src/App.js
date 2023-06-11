
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from './components/common/Input/Input';
import RadioGroup from './components/common/RadioGroup/RadioGroup';

// 1. State managment
const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
  gender: ""
}

// 2. Handle submittion
const onSubmit = (values) => {
  console.log(values);
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
  gender: Yup.string().required()
});

const genders = [
  { label: 'Male', value: 'male', },
  { label: 'Female', value: 'female', }
];

function App() {
  const [saveData, setSaveData] = useState(null);
  const formik = useFormik({ initialValues: saveData || initialValues, onSubmit, validationSchema, validateOnMount: true, enableReinitialize: true });
  useEffect(() => {
    axios.get('http://localhost:3001/users/1')
      .then(res => setSaveData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <h1>Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Email" name="email" type="email" formik={formik} />
        <Input label="Phone" name="phone" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />
        <Input label="Password Confirmation" name="passwordConfirmation" type="password" formik={formik} />
        <RadioGroup radioOptions={genders} label="Gender" name="gender" formik={formik} />
        <button type='submit' disabled={!formik.isValid}>Register</button>
      </form>
    </div>
  );
}

export default App;
