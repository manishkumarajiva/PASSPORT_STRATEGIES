import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'




const Dashboard = () => {
    const [profile, setProfile] = useState();
    const navigate = useNavigate();

      const Profile = async () => {
        const token = localStorage.getItem('token');

        const options = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `bearer ${token}`
            }
        }

        const response = await fetch('http://localhost:8000/api/user/profile', options);
        if(response.ok){
            const data = await response.json();
            setProfile(data);
        }
    }


    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/')
      }else{
        Profile();
      }
    },[]);



    const Signout = () => {
      localStorage.removeItem('token');
      navigate('/')
    }

  return (
    <section className='w-1/3 h-auto p-3 mx-auto bg-black rounded-md shadow-2xl shadow-amber-300 flex flex-col justify-center'>
      <img src={profile?.data.picture} className='w-20 h-20 mx-auto rounded-full my-2' />
      <small className='text-amber-400 text-center w-full'> {profile?.data?.name} </small>
      <strong className='text-amber-500 p-2 w-full'> { profile?.data?.username } </strong>
      <button onClick={Signout} className='flex justify-center text-sm bg-amber-500 text-white px-2 py-1 rounded-full tracking-widest'> 
        SIGNOUT 
        <ArrowLeftEndOnRectangleIcon className='w-5'/>
      </button>
    </section>
  )
}

export default Dashboard
