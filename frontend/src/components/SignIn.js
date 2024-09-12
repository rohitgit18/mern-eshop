import axios from "axios";
import { useRef } from "react";
import WebApis from '../apis/WebApis';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../redux-config/UserSlice";
import { useNavigate } from "react-router-dom";


export default function SignIn(){
    let emailInput = useRef();
    let passwordInput = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signInUser = async (event)=>{
        try{
            event.preventDefault();
            let email = emailInput.current.value;
            let password = passwordInput.current.value;
            let response = await axios.post(WebApis.SIGN_IN,{email,password});
            dispatch(saveUser(response.data));
            navigate("/");
        }
        catch(err){
            toast.error("Invaild email or passsword");
            console.log(err);
        }
    }
    return <>
       <ToastContainer/>
       <div className="container d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
       <div className="sign-in-form" style={{width:"30%", boxShadow:"10px 10px 10px 10px grey"}}>
           <h5 className="bg-dark text-white text-center p-2">Sign In</h5>
           <form onSubmit={signInUser} className="p-3 d-flex flex-column align-items-center">
           <input ref={emailInput} type="text" placeholder="Write your email" className="mt-2 form-control"/>
           <input ref={passwordInput} type="password" placeholder="Write your password" className="mt-2 form-control"/>
           <button type="submit" className="btn btn-secondary mt-2" style={{width:"100%"}}>Sign In</button>
           <small className="text-primary mt-2" style={{cursor:"Pointer"}}>Create new account ?</small>
           </form>
         </div>
       </div>
    </>
}