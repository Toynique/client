import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group"; 
import { countries } from 'countries-list';
import ReactCountryFlag from "react-country-flag"
import axios from "axios";
import { Url } from "../../url/url";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addressdata } from "../../redux/slice/address";

const defaultValueObj = {"country": { value: 'IN', label: 'India', code: '+91' }, nearBy : "", receiver : "", address : "",  state : "", city : "", pincode : "",  primaryNumber : "", secondaryNumber : "" 
}

const AddAddressModel = ({ show, handleClose }) => {
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState(defaultValueObj)  
  const allStateArr = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh",
  ];
  const inputHandle = (e)=>{
    const name = e.target.name;
    const value = e.target.value; 
    setInputValue({...inputValue, [name]: value});
  }
  const handleCountryChange = (selectedCountry) => {   
      const countryObj = {value: selectedCountry, label: countries[selectedCountry].name, code: `+${countries[selectedCountry].phone}`} 
      setInputValue({...inputValue, ['country']: countryObj});
  };
  const submitAddress = async(e)=>{
    e.preventDefault()
    let userData =  localStorage.getItem('userdata')
    userData = await JSON.parse(userData) 
    try {
        if(userData){ 
        const response = await axios.post(`${Url}/api/address`, {...inputValue, userId : userData._id })
        console.log(response);
        dispatch(addressdata(userData._id))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "address Saved",
            showConfirmButton: false,
            timer: 1500
          });
        }
        setInputValue(defaultValueObj)
        handleClose()
    } catch (error) {
        console.log(error);
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "failed",
            showConfirmButton: false,
            timer: 1500
          });
    }
    // console.log("Add Address submit function", inputValue);
  }

  const countryOptions = Object.keys(countries)

  return (
    <CSSTransition in={show} timeout={900} classNames="popup" unmountOnExit>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <div className="border shadow rounded p-2">
            <form action="" onSubmit={(e)=>{submitAddress(e)}}>
              <div className="form-group mb-3">
                <label
                  htmlFor="title"
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  Receiver name{" "}
                </label>
                <input
                  type="text"
                  name="receiver"
                  className="form-control shadow-sm outline-none border-none"
                  id="title"
                  placeholder="Enter Name "
                  onChange={e=>inputHandle(e)}
                  value={inputValue.receiver}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label 
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  enter full address
                </label>
                <textarea
                  type="text"
                  name="address"
                  className="form-control shadow-sm outline-none border-none" 
                  placeholder="address"
                  onChange={e=>inputHandle(e)}
                  value={inputValue.address}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label 
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  near by
                </label>
                <textarea
                  type="text"
                  name="nearBy"
                  className="form-control shadow-sm outline-none border-none" 
                  placeholder="eg. A. D. Public School"
                  onChange={e=>inputHandle(e)}
                  value={inputValue.nearBy}
                />
              </div>
              <div className="form-group mb-3">
                <label 
                  className="text-muted mb-1 text-capitalize fs-14"
                > 
                  select state
                </label>   
                <select name="state" id="state" className="form-select shadow-sm outline-none border-none" onChange={e=>inputHandle(e)} value={inputValue.state} required >
                    <option   className="text-muted" disabled={false}>choose</option>
                    {allStateArr.map((stateName)=>{
                        return(
                            <option value={stateName} key={stateName}>{stateName}</option>
                        )
                    })}
                </select> 
              </div>
              <div className="form-group mb-3">
                <label
                  htmlFor="city"
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  city
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control shadow-sm outline-none border-none"
                  id="city"
                  placeholder="Enter city name"
                  onChange={e=>inputHandle(e)}
                  value={inputValue.city}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label
                  htmlFor="pincode"
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control shadow-sm outline-none border-none"
                  id="pincode"
                  placeholder="Enter pincode"
                  onChange={e=>inputHandle(e)}
                  value={inputValue.pincode}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label
                  htmlFor="primaryNumber"
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  phone number
                </label>
                <div className="d-flex align-item-center p-0 overflow-hidden form-control">
                    <select name="" id="" value={inputValue.country.value} className="border-0 border-none no-border shadow-none  " onChange={(e)=>handleCountryChange(e.target.value)} required> 
                        {countryOptions.map((countryCode)=>{ 
                            return(
                                <option value={countryCode} key={countryCode}><ReactCountryFlag countryCode={countryCode} /> {countryCode} </option>
                            )
                        })} 
                    </select>
                    <input 
                        type="number"
                        name="primaryNumber"
                        className="form-control border-0 shadow-sm outline-none border-none"
                        id="primaryNumber"
                        placeholder="Number"
                        onChange={e=>inputHandle(e)}
                        value={inputValue.primaryNumber}
                        minLength={10}
                        maxLength={10}
                        required
                    />
                </div> 
              </div>
              <div className="form-group mb-3">
                <label
                  htmlFor="secondaryNumber"
                  className="text-muted mb-1 text-capitalize fs-14"
                >
                  secondary Number <small className="text-muted fs-12">(Optional)</small>
                </label>
                <input
                  type="number"
                  name="secondaryNumber"
                  className="form-control shadow-sm outline-none border-none"
                  id="secondaryNumber"
                  placeholder="Number"
                  minLength={10}
                  maxLength={10} 
                  value={inputValue.secondaryNumber}
                  onChange={e=>inputHandle(e)}
                />
              </div>
              <Modal.Footer>
          <Button type="submit" variant="secondary">Save</Button>
          {/* Add additional buttons or actions here */}
        </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary">Save</Button> 
        </Modal.Footer> */}
      </Modal>
    </CSSTransition>
  );
};

export default AddAddressModel;
