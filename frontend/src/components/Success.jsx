import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = searchParams.get('token') ?? false;
    console.log(token)
    if(token){
        localStorage.setItem('token', token);
        navigate('/dashboard');
    }else{
        navigate('/login')
    }
  },[searchParams])
  return <div className="text-black text-4xl text-center">Success</div>;
};

export default Success;
