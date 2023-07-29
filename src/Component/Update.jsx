import React , { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");
  const {id} = useParams();

  const navigate =useNavigate();
  //get single user Data 
  const  getSingleUser= async ()=>{
    const response = await fetch(`https://mernback-q5za.onrender.com/${id}`);

    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    
    if(response.ok){
      setError("");
      console.log("updated user",result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  }

  // send updated data 

  const handleUpdate = async (e)=>{
    e.preventDefault();
      
    const updatedUser={name, email, age};

    const response = await fetch(`https://mernback-q5za.onrender.com/edit/${id}`, {
      method:"PATCH",
      body:JSON.stringify(updatedUser),
      headers:{
        "Content-Type":"application/json",
      },
    });

    const result=await response.json();
  
  if(!response.ok){
    console.log(result.error);
    setError(result.error);
  }

  if(response.ok){
    setError("");
    navigate("/all");
  }
  }

  useEffect(()=>{
        getSingleUser();
  },[]);

  return (
    <div className='container my-2'>
    {error && <div class="alert alert-danger" role="alert"> {error} </div> }
      <h1 className='text-center'> Edit the data </h1>

      <form onSubmit={handleUpdate}>
      <div class="mb-3">
   <label for="exampleInputName" class="form-label">Name</label>
   <input type="text" class="form-control" id="exampleInputName"  value={name} onChange={(e) => setName(e.target.value)}/>
 </div>      
 <div class="mb-3">
   <label for="exampleInputEmail1" class="form-label">Email address</label>
   <input type="email" class="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)}/>
   <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
 </div>
 <div class="mb-3">
   <label for="exampleInputPassword1" class="form-label">Age </label>
   <input type="Number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" class="form-control"/>
 </div>
 
 <button type="submit" class="btn btn-primary">Submit</button>
</form>
   </div>
  )
}

export default Update