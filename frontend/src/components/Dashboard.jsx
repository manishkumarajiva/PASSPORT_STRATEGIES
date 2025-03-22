import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [profile, setProfile] = useState();

    useEffect(()=>{

        (async()=> {
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
        })()
    },[])


  return (
    <section className='w-1/3 h-auto p-3 mx-auto bg-black rounded-md shadow-2xl shadow-amber-300'>
      <img src={profile?.data.picture} className='w-20 h-20 rounded-full mx-auto my-2' />
      <small className='text-amber-400 text-center p-2 w-full'> {profile?.data?.name} </small>
      <strong className='text-amber-500 text-center p-2 w-full'> { profile?.data?.username } </strong>
    </section>
  )
}

export default Dashboard
