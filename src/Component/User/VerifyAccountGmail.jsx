import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { userVerifyCheck, userAccountVerify } from '../../Api/api';


const VerifyAccountGmail = ()=>{ 
    const {id} = useParams() 
    const navigate  = useNavigate()
    const [verifyCheck, setVerifyCheck] = useState() 

    const approvFunc = async(id)=>{
        const data = await userAccountVerify(id)
        console.log(("approvefunc", data));
        if(data){
            navigate("/login")
        }
        // navigate("/login")
    }
    const checkfunc = async (id)=>{
        const data = await userVerifyCheck(id) 
        if(data.isVerify){
            navigate("/login")
        }
        setVerifyCheck(data.isVerify)  
    } 
    useEffect(()=>{ 
        checkfunc(id)
    }, [])
 
  return (
    <>
    <section className='min-vh-100 w-100 d-flex align-items-center justify-content-center' >
        {verifyCheck && verifyCheck ? 
        null :
        <div className="card p-3">
            <p className='mb-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dolorum blanditiis quibusdam!</p>
            <div className="text-center">
                <button className='btn btn-success' onClick={e=>approvFunc(id)}>Approved</button>
            </div>
        </div>
         }
    </section>
    </>
  );
}

export default VerifyAccountGmail