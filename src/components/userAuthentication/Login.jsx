import {React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'; 


const Login = ({history}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [login,setLogin] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if(userInfo) {
            navigate("/home")
        }
    },[login])

    const submitHandler = async (e) => {

        e.preventDefault();

        try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                }
            }

            setLoading(true)


            const {data} = await axios.post('http://localhost:5000/api/user/login',{
                email,password
            },config)

            console.log(data)
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false)
        }catch(error){
            setError(error.response.data.message)
            console.log(error.response.data.message)
        }
    }

  return (
    <div>
         <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <Link to='/signup'>Register</Link>
    </div>
  )
}

export default Login