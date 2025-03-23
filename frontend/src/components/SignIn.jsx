import React from "react";
import { useForm, } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router";

const SignIn = () => {
  const { register, handleSubmit, formState, reset, control } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const Local = async (data) => {
   try {
    const options = {
      method : 'POST',
      headers : { 'Content-Type' : 'application/json' },
      body : JSON.stringify(data)
    }
    const response = await fetch('http://localhost:8000/api/auth/local-signin', options);
    if(response.ok){
      const user = await response.json();
      reset();
      localStorage.setItem('token', user.token)
      navigate('/dashboard')
    }
   } catch (error) {
    console.log('ERROR DURING LOCAL SIGNUP')
   }
  };


  const Google = async () => {
    try {
      window.location.href = 'http://localhost:8000/api/auth/google-signin';
    } catch (error) {
      console.log('ERROR DURING GOOGLE SIGNUP')
    }
  }

  return (
    <section className="parent">
      {/* local login form [email, password] */}
      <section className="login-form-container">
        <h1> Login </h1>
        <form noValidate onSubmit={handleSubmit(Local)} className="signin-form">
          <section className="form-control">
            <label htmlFor="username"> Username </label>
            <input type="email" {...register('email',{
              required : 'email is required',
              pattern : {
                value : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message : 'invalid email address'
              }
            })} id="username" autoComplete="off" />
            <p className="text-red-500 text-xs"> {errors.email?.message} </p>
          </section>
          <section className="form-control">
            <label htmlFor=""> Password </label>
            <input type="password" {...register('password',{
              required : 'password is required',
              minLength : {
                value : 6,
                message : 'minimum lenght should be 6'
              }
            })} id="password" autoComplete="off" />
            <p className="text-red-500 text-xs"> {errors.password?.message} </p>
          </section>
          <section className="form-control">
            <button type="submit" className="login-btn">
              <p> LOGIN </p>          
            </button>
          </section>
          <DevTool control={control}/>
        </form>

        {/* social media login */}
        <div className="social-login">
          <button className="google" onClick={Google}> 
            Login with Google 
          </button>
          <button className="facebook"> 
            Login with Facebook 
          </button>
        </div>
      </section>
    </section>
  );
};



export default SignIn;
