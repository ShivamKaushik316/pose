import {React, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'; 


const SignUp = () => {

   const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [age,setAge] = useState(0)
    const [height,setHeight] = useState(0)
    const [weight,setWeight] = useState(0)
    const [reffralCode,setRefferalCode] = useState("")
    const [gender,setGender] = useState("")
    const [mobileNumber,setMobileNumber] = useState(0)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const submitHandler = async (e) => {
      e.preventDefault()
    try{

      const config = {
        headers: {
            "Content-type":"application/json"
        }
    };

    const {data} = await axios.post("http://localhost:5000/api/user/register",{
      name,email,password,age,height,reffralCode,weight,gender,mobileNumber
    },config)

    console.log(data)

    }catch(error) {
      setError(error.response.data.message)
      console.log(error.response.data.message)
    }

    }

  return (
    <div>

<Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>email address</Form.Label>
        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>name</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>



      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>gender</Form.Label>
        <Form.Control value={gender} onChange={(e) => setGender(e.target.value)} type="string" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>mobileNumber</Form.Label>
        <Form.Control value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} type="number" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>setRefferalCode</Form.Label>
        <Form.Control value={reffralCode} onChange={(e) => setRefferalCode(e.target.value)} type="text" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>Age</Form.Label>
        <Form.Control value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>Height</Form.Label>
        <Form.Control value={height} onChange={(e) => setHeight(e.target.value)} type="number" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicnumber">
        <Form.Label>Weight</Form.Label>
        <Form.Control value={weight} onChange={(e) => setWeight(e.target.value)} type="number" placeholder="Enter number" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <Link to='/login'>Login</Link>

    </div>
  )
}

export default SignUp