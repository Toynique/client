import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { userVerifyCheck } from '../../Api/api';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { Url } from '../../url/url';

const VerifyAccountGmail = () => { 
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Please wait, verifying your email...");

    useEffect(() => { 
        const checkfunc = async () => {
            try {
                const response = await axios.post(`${Url}/user/verify-account/${id}`, {"isVerify" : 1}) 
                if (response.status == 200) {
                    setMessage("✅ Your email has been verified successfully. Redirecting to login...");
                    setTimeout(() => navigate("/login"), 2000);  
                } else { 
                    setMessage("❌ Email verification failed. Please contact support Team.");
                }
            } catch (error) { 
                setMessage("❌ An error occurred. Please contact support Team.");
            } finally { 
                setLoading(false);
            }
        };

        checkfunc();
    }, [id, navigate]);

    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-lg p-4 text-center">
                {loading ? (
                    <>
                        <div class="text-center">

                        <ClipLoader color="#007bff" size={50} />
                        </div>
                        <p className="fw-bold text-muted mt-3">{message}</p>
                    </>
                ) : (
                    <p className={`fw-bold ${message.includes("✅") ? "text-success" : "text-danger"}`}>
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
};

export default VerifyAccountGmail;


