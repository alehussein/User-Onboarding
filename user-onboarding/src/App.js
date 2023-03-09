import './App.css';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import * as yup from 'yup';


const schema = yup.object().shape({
  user: yup.string().required('User is required').min(3, 'Need to be 6 chars min'),
  email: yup.string().required('email is required'),
  password: yup.string().required('Password is required').min(8, 'Need to be 8 chars min'),
  agree: yup.boolean().oneOf([true], 'You must accept'),
  role: yup.string().oneOf(['Software Engineer', 'Web Development', 'Data Science', 'Others'], 'You Must Select One'), 
})

export default function App () {
  const [userdata, setData] = useState({user:'', email:'', password:'', agree: false, role:'' })
  const [disabled, setDisabled] = useState(true)
  const [errors, setError] = useState({user:'', email:'', password:'', agree: '', role:'' })
  const [user, dataUser] = useState([])


  const setFormErros = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setError({ ...errors, [name]: '' }))
    .catch(err => setError({ ...errors, [name]: err.errors[0] }))
  }
  const change = event => {
    const { checked, value, name, type} = event.target
    const valueToUse = type === 'checkbox' ? checked : value
    setFormErros(name, valueToUse)
    setData({ ...userdata, [name]: valueToUse})
  }
  const submit = event => {
    event.preventDefault()
    const newUser = { user: userdata.user.trim(), email: userdata.email.trim(), password: userdata.password.trim(), agree: userdata.agree, role: userdata.role}
    axios.post('https://reqres.in/api/users', newUser)
     .then(res => {
      console.log(res.data)
      setData({user:'', email:'', password:'', agree: false, role:'' })
      dataUser([res.data, ...user ])
     })
     .catch(err => { },)
    
  }

  const [botonClass, setBotonClass] = useState('mi-boton-disabled');
  
  useEffect(() => {
    schema.isValid(userdata).then(valid => {
      setDisabled(!valid);
      setBotonClass(valid ? 'mi-boton-enabled' : 'mi-boton-disabled');
    });
  }, [userdata]);
    
    
 



  return (
    <div className="App">
      <div id='erros'style={{color: 'red', backgroundColor:'blue'}}>
      
      </div>
      
      <form onSubmit={submit}>
        <h1 id='h1'>USER FORM</h1>
        <label id='name'>Name
          <input onChange={change} value={userdata.user} type='text' name='user' placeholder='Enter Name'/>
          <div>{errors.user}</div>
        </label>
        <label>Email
          <input onChange={change} value={userdata.email} type='text' name='email' placeholder='Enter Email'/>
          <div>{errors.email}</div>
        </label>
        <label id='pass'>Password
          <input onChange={change} value={userdata.password} type='text' name='password' placeholder='Enter Password'/>
          <div>{errors.password}</div>
        </label>
        <label>Terms of Service
          <input onChange={change} checked={userdata.agree}  type='checkbox' name='agree' />
          <div>{errors.agree}</div>
        </label>
        <br/>
        <label>Select Role</label>
        <select onChange={change} value={userdata.role} name='role'>
          <option value='0'>Select One</option>
          <option value='Software Engineer'>Software Engineer</option>
          <option value='Web Development'>Web Development</option>
          <option value='Data Science'>Data Science</option>
          <option value='Others'>Others</option>
        </select>
        <div>{errors.role}</div>
        {/* <button disabled={disabled}>Submit</button> */}
        <button className={`mi-boton ${botonClass}`} disabled={disabled}>Enviar</button>
      </form>
      {user.map(user => (
        <div id='userdata' key={user.id}>
          <div>{user.user}</div>
          <div>{user.role}</div>
          <div>{user.email}</div>
          
        </div>
      ))}
 
      </div>
    
  );
}


