import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

 const navigate = useNavigate();

const handleSumbit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age }

   
      const response = await fetch("https://mernback-q5za.onrender.com", { // ky prom hai ab isme yahi hai prob 
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-type": "application/json"
        }
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        setSuccess('')
      }

      if (response.ok) {
        setSuccess("stored Succesfully")
        setError("");
        setName("");
        setEmail("");
        setAge("");

        setTimeout(() => {
          navigate("/all");
        },  2500);
      }
    
  };  // try catch remove kel tu ithal ho i know

  return (
    <div className='container my-2'>

      {error && <div class="alert alert-danger" role="alert"> {error} </div>}
      {success && <div class="alert alert-success" role="alert"> {success} </div>}

      <h1 className='text-center'>Write Your Blog Here</h1>

      <form onSubmit={handleSumbit}>
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Name</label>
          <input type="text" class="form-control" id="exampleInputName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Age </label>
          <input type="Number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Create

// 
