import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form.css';


function Form() {
    let [data, setData] = useState({});
    let [hobby, setHobby] = useState([]);
    let [validationErrors, setValidationErrors] = useState({});


    let handleChange = (e) => {
        let { name, value } = e.target;
        let activities = [...hobby];
        if (name == "hobbies") {
            if (e.target.checked) {
                activities.push(value);
            }
            else {
                let index = activities.findIndex((v, i) => v == value);
                activities.splice(index, 1);
            }
            value = activities;
            setHobby(value);
        }
        setData({ ...data, [name]: value })
    }

    let validation = () => {
        let validationMessages = {};
        if (!data.username) {
            validationMessages.username = 'Username is required';
        }
        if (!data.email) {
            validationMessages.email = 'Email is required';
        }
        else if (!data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            validationMessages.email = 'You have entered an invalid email address!'
        }
        if (!data.password) {
            validationMessages.password = 'Password is required';
        }
        else if (!data.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)) {
            validationMessages.password = 'Enter a password between 7 to 15 characters which contain at least one numeric digit and a special character.'
        }
        if (!data.gender) {
            validationMessages.gender = 'Gender is required';
        }
        return validationMessages
    }

    let submitData = async (e) => {
        e.preventDefault();
        let formErrors = validation();

        if (Object.keys(formErrors).length > 0) {
            setValidationErrors(formErrors)
        } else {
            setValidationErrors("");
            try {
                const response = await axios.post("http://localhost:3000/data", data);
                console.log(response.data);
                toast.success("Submitted successfully!");
                setTimeout(() => {
                    nav("/ShowData")
                }, 1000);
                setData({});
                setHobby([]);
            } catch (error) {
                toast.error("An error occurred. Please try again later.");
                console.error("Error submitting data:", error);
            }
        }
    }

    return (
        <>
            <div className="register-form">
                <form method="post" onSubmit={(e) => submitData(e)}>
                    <div className="box">
                        <h2 className='register'>Registration</h2>
                        <input type="text" placeholder='Name' name='username' onChange={(e) => handleChange(e)} value={data.username ? data.username : ""} />
                        <div className='error'> {validationErrors.username && <p>{validationErrors.username}</p>}</div>

                        <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} value={data.email ? data.email : ""} />
                        <div className='error'> {validationErrors.email && <p>{validationErrors.email}</p>}</div>

                        <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} value={data.password ? data.password : ""} />
                        <div className='error'> {validationErrors.password && <p>{validationErrors.password}</p>}</div>

                        <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} value={data.confirmPassword ? data.confirmPassword : ""} />
                        <div className='error'> {validationErrors.confirmPassword && <p>{validationErrors.confirmPassword}</p>}</div>

                        {/* gender */}
                        <div className="gender">
                            <p>GENDER : </p>
                            <input type="radio" id="male" name='gender' value="male" onChange={(e) => handleChange(e)} checked={data.gender == 'male' ? "checked" : ""} />
                            <label htmlFor="male" className="mr">Male</label>

                            <input type="radio" id="female" name='gender' value="female" onChange={(e) => handleChange(e)} checked={data.gender == 'female' ? "checked" : ""} />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div className='error'> {validationErrors.gender && <p>{validationErrors.gender}</p>}</div>


                        {/* hobbies */}
                        <div className="hobbies">
                            <span>HOBBIES : </span>
                            <input type="checkbox" id="dance" name='hobbies' value="dance" onChange={(e) => handleChange(e)} checked={hobby.includes('dance') ? "checked" : ""} />
                            <label htmlFor="dance" className="mr">Dance</label>

                            <input type="checkbox" id="painting" name='hobbies' value="painting" onChange={(e) => handleChange(e)} checked={hobby.includes('painting') ? "checked" : ""} />
                            <label htmlFor="painting" className="mr">Painting</label>

                            <input type="checkbox" id="cricket" name='hobbies' value="cricket" onChange={(e) => handleChange(e)} checked={hobby.includes('cricket') ? "checked" : ""} />
                            <label htmlFor="cricket">Cricket</label>
                        </div>

                        <button type="submit" className='register-btn'>Register Now</button>
                    </div>
                </form >
            </div >
            <ToastContainer />
        </>
    )
}

export default Form;













