import React, { useEffect, useState } from 'react'
const url="http://localhost:5174/login" 

const fetchUsers = async(url) =>{
    try{
        const res = await fetch(url);
        const data = await res.json();
    }catch(e){
        console.error(e)
    }
}

export default function Login() {
    const[email,setemail] =useState("");
    const[password,setpassword] =useState("");
    const[allentry,setallentry]=useState([]);
    useEffect(() =>{
        fetchUsers(url);
    }, []);
    const submitform=(e)=>{
        e.preventDefault();
        const newentry={email:email,password:password};
        setallentry([...allentry,newentry]);
        console.log(allentry);
    }
  return (
    <>
      <div className="max-w-md relative flex flex-col  p-4 rounded-md text-black bg-white " onSubmit={submitform}>
    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span class="text-[#7747ff]">App</span></div>
    <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
<form className="flex flex-col gap-3">
    <div className="block relative"> 
    <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
    <input type="text" id="email" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-white tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
      value={email}
      onChange={(e)=> setemail(e.target.value)}
    />
    
    </div>
    <div className="block relative"> 
    <label for="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
    <input type="password" id="password" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-white tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
      value={password}
      onChange={(e)=> setpassword(e.target.value)}
    />
    
    </div>
    
    <button type="submit" class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

</form>

</div>

<div>
    {
        allentry.map((curelem)=>{
           return(
            <div  className='showDataStyle'>
              <p>{curelem.email}</p>
              <p>{curelem.password}</p>
             </div>

           )
        })
    }
</div>
    </>
  )
}
