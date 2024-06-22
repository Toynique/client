
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Url } from '../../url/url'; 
import { toast } from 'react-toastify'; 
import { adduser } from '../../redux/slice/user';


const UserAddressUpdateModel = ({ show, handleClose, showAddAddress  }) => { 
    const [address, setAddress] = useState() 
    const dispatch = useDispatch()
    const user = useSelector(store=>store.user[0]) 
    const addressAllData = useSelector(store=>store.address.data)

     
    const updateAddressFunc = async()=>{ 
        const findAdd = await addressAllData.find(data=> data._id === user.address) 
        setAddress(findAdd)
    }
    const changeAddressFunc = async(addressValue)=>{ 
        setAddress(addressValue)  
        const userResponce = await axios.post(`${Url}/user/updateAddress`, {userId: user._id, addressId:addressValue._id}) 
        const {status, data} = userResponce
        if(status && status == 200){ 
            let userStr = JSON.stringify(data);
            localStorage.setItem("userdata", userStr);
            dispatch(adduser(data))
            toast.success("Address Changed",  {autoClose: 1500,})
        }
    }

    useEffect(()=>{ 
        updateAddressFunc()
    }, [user, addressAllData])
  return (
    <CSSTransition
      in={show}
      timeout={900}
      classNames="popup"
      unmountOnExit
    >
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change Address</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <div className="d-flex gap-3 align-items-top"> 
            <p className='fw-bold text-capitalize fit-content cl-blue'>Current Address :- </p>
            <p>{address ? <> <p>{address.address} ,{address.state}, {address.pincode}</p>
              <small className='fs-12 '>{address.primaryNumber} , {address.secondaryNumber}</small>
             </> : null}</p>
          </div>
           
            
             
           
          <div className=" position-relative">
            {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary pointer " onClick={()=>setAddressDisplay(false)}>X </span> */}
            <div className='border p-2 rounded shadow-sm overflow-auto my-3 '>
            {addressAllData.length > 0 && addressAllData.map((addressValue)=>{
                return( 
                    <div className="d-flex align-items-center gap-3 py-1 border-bottom border-bottom-not-last border-1" key={addressValue._id}>
                        <input type="radio" name="addressSelect" checked={address ? address._id === addressValue._id : false}  onChange={e=>changeAddressFunc(addressValue)} />
                        <div onClick={e=>changeAddressFunc(addressValue)}> 
                        <p>{addressValue.receiver}</p>
                        <p>{addressValue.address} , {addressValue.state  }, {addressValue.pincode}</p>
                        <small className='fs-12 '>{addressValue.primaryNumber} , {addressValue.secondaryNumber}</small>
                        </div>
                    </div>
                )
            })}
            </div>
          </div> 
          <div className="text-end"> 
          <Button variant="secondary" onClick={handleClose}>
            update
          </Button> 
          </div> 
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            update
          </Button> 
        </Modal.Footer> */}
      </Modal>
    </CSSTransition>
  );
};

export default UserAddressUpdateModel;
