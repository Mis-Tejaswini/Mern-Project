import React, { useEffect, useState } from 'react'
import  "../App.css"
import { Link } from 'react-router-dom'
const Read = () => {

  const [data, setData]=useState();
  const [error, setError] = useState("");


  async function getData(){
    const response =await fetch("https://mernback-q5za.onrender.com/data");

    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    
    if(response.ok){
      setData(result);
    }
    }

    const handleDelete = async (id)=>{

      const response = await fetch(`https://mernback-q5za.onrender.com/${id}`, {
        method:"DELETE"
      });

      const result=  await response.json();

      
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    
    if(response.ok){
        setError("Deleted SUccesfully");
      
        setTimeout(()=>{
          setError("");
          getData();
        },1000);
    }


    }

    useEffect(()=>{
          getData();
    }, []); 

     console.log(data);
  return (
    <div class='container my-2'>

      {error && <div class="alert alert-danger" role="alert"> {error} </div> }
      <h2 class='text-center'> All Data </h2>
{
  data?( <div class='row'>
  {data?.map((ele)=>(
         <div  key={ele._id}class='col-3'>
         <div class="card">
           <div class="card-body">
             <h5 class="card-title">{ele.name}</h5>
             <h6 class="card-subtitle mb-2 text-muted">{ele.email}</h6>
             <p class="text-muted"> {ele.age}</p>
             <a href="#" class="card-link" onClick={()=> handleDelete(ele._id)}>
              Delete</a>
             <Link to={`/${ele._id}`}class="card-link">Edit{" "}</Link>
           </div>
         </div>
       </div>
  ) )}
  
</div>):<div class="loader"></div>

}
     

    </div>
  )
}

export default Read 