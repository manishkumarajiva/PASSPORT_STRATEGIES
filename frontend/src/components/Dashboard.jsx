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
                    'Authorization' : `Bearer ${token}`
                }
            }

            const response = await fetch('http://localhost:8000/api/user/profile', options);
            console.log(response)

            // if(response.ok){
            //     const data = await response.json();
            //     setProfile(data);
            // }
        })()
    },[])


  return (
    <div className="text-red-600 text-4xl">
      Dashboard
    </div>
  )
}

export default Dashboard
