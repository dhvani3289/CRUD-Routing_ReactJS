
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UpdateForm() {

    let [updateData, setUpdateData] = useState({});
    let [hobby, setHobby] = useState([]);

    let id = useParams();
    console.log("params", id);

    let nav = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/data/${id.position}`);
        console.log(response.data);
        setUpdateData(response.data);
    };


    let handleChange = ((e) => {
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
        setUpdateData({ ...updateData, [name]: value });
    })

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.put("http://localhost:3000/data/" + updateData.id, updateData)
            .then((response) => {
                console.log(response.data);
                toast.success("submitted");
                setTimeout(() => {
                    nav("/ShowData")
                }, 1000);
            }).catch((err) => {
                toast.error(err);
            })
    }


    return (
        <>
            <h1>Form</h1>

            <form method="post" onSubmit={(e) => handleSubmit(e)}>
                <div className="box">
                    <h2 className='register'>Registration</h2>
                    <input type="text" placeholder='Name' name='username' onChange={(e) => handleChange(e)} value={updateData.username ? updateData.username : ""} />

                    <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} value={updateData.email ? updateData.email : ""} />

                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} value={updateData.password ? updateData.password : ""} />

                    <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} value={updateData.confirmPassword ? updateData.confirmPassword : ""} />

                    {/* gender */}
                    <div className="gender">
                        <p>GENDER : </p>
                        <input type="radio" id="male" name='gender' value="male" onChange={(e) => handleChange(e)} checked={updateData.gender == 'male' ? "checked" : ""} />
                        <label htmlFor="male" className="mr">Male</label>

                        <input type="radio" id="female" name='gender' value="female" onChange={(e) => handleChange(e)} checked={updateData.gender == 'female' ? "checked" : ""} />
                        <label htmlFor="female">Female</label>
                    </div>

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

                    <button type="submit">Save</button>
                </div>
            </form >

            <ToastContainer position="top-center" />
        </>
    )
}

export default UpdateForm;






