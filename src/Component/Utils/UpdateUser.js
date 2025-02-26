import axios from "axios";
import { Url } from "../../url/url"; 
// import { useDispatch } from "react-redux";
// import { adduser } from "../../redux/slice/user";

const UpdateUser = async () => { 
    const token = localStorage.getItem("usertoken")
    // const dispatch = useDispatch()
    if (token) {
        try {
            const response = await axios.get(`${Url}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in the Authorization header
                }
            }) 
            if(response.status == 200){
                localStorage.setItem("userdata", JSON.stringify(response.data)); 
                // dispatch(adduser((response.data)))
            } 
        } catch (error) {
            console.log(error);
            console.log(error.response.status);
            if(error.response.status == 401){
                console.log("this is error user profile data"); 
            }

        }
    }
}

export default  UpdateUser

// dispatch(adduser(userJson))