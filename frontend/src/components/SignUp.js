import axios from "axios";
import { useRef, useState } from "react"
import WebApis from '../apis/WebApis';
import { ToastContainer, toast } from "react-toastify";

export default function SignUp(){
  let imgRef = useRef();
  const [upload,setUpload] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [contact,setContact] = useState();
  const setImage = ()=>{
    setUpload(imgRef.current.files[0]);
  }
  const signUp = ()=>{
     let formData = new FormData();
     formData.append("profile",upload);
     formData.append("email",email);
     formData.append("password",password);
     formData.append("contact",contact);
     axios.post(WebApis.SIGN_UP,formData)
     .then(response=>{
        console.log(response.data);
        toast.success("Sign up successfully...");
     }).catch(err=>{
        console.log(err);
        toast.error("Oops! something went wrong..");
     });
  }
  return <>
     <ToastContainer/>
     <div className="container d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
       <div style={{widht:"30%", height:"200px"}}>
          <div className="form-group">
            <input onChange={(event)=>setEmail(event.target.value)} type="text" placeholder="Enter email id" className="form-control"/>  
          </div> 
          <div className="form-group">
            <input onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="Enter password" className="form-control"/>  
          </div> 
          <div className="form-group">
            <input onChange={(event)=>setContact(event.target.value)} type="text" placeholder="Enter contact number" className="form-control"/>  
          </div> 
          <div className="form-group">
            <input ref={imgRef} onChange={setImage}  type="file" className="form-control"/>  
          </div> 
          <div className="form-group">
            <button onClick={signUp} className="btn btn-secondary" style={{width:"100%"}}>Sign up</button>
          </div> 
       </div>
     </div>   
  </>
}