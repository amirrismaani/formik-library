
import { useFormik } from 'formik';
import './App.css';
const initialValues = {
  name: "",
  email: "",
  password: ""
}
function App() {
  const onSubmit = (values) => {
    console.log(values);
  }
  const formik = useFormik({ initialValues, onSubmit })
  return (
    <div className="App">
      <h1>Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='formGroup'>
          <label htmlFor='name'>Name</label>
          <input value={formik.values.name} name='name' onChange={formik.handleChange} />
        </div>
        <div className='formGroup'>
          <label htmlFor='email'>Email</label>
          <input value={formik.values.email} name='email' onChange={formik.handleChange} />
        </div>
        <div className='formGroup'>
          <label htmlFor='password'>Password</label>
          <input value={formik.values.password} name='password' onChange={formik.handleChange} />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default App;
