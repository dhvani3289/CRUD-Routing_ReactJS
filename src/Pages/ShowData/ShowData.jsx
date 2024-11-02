import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './ShowData.css'

function ShowData() {
    let [list, setList] = useState([]);
    let [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        setTimeout(() => {
            getRecords();
        }, 1000);
    }, [setList]);


    let getRecords = () => {
        axios.get("http://localhost:3000/data")
            .then((res) => {
                console.log(res.data);
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let deleteData = async (id) => {
        console.log(id);
        let removeItem = await axios.delete("http://localhost:3000/data/" + id);
        if (removeItem.data) {
            getRecords();
            toast.success("Item removed from cart");
        }
        else {
            toast.error("Item not removed from cart");
        }
    }

    let sorting = (e) => {
        const sortBy = e.target.value;
        console.log(sortBy);
        
        let sortedList = [...list];
        if (sortBy === "ascending") {
            sortedList.sort((a, b) => a.username.localeCompare(b.username));
        } else {
            sortedList.sort((a, b) => b.username.localeCompare(a.username));
        }
        setList(sortedList);
    }

    let searchData = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value);
    }

    return (
        <>
            <form onSubmit={(e) => searchData(e)}>
                {/* searching */}
                <div className="search">
                    <input type="search" name='search' placeholder='Search...' />
                    <button type='submit'>Search</button>
                </div>

                {/* sorting */}
                <div className="sorting">
                    <h2>Sort </h2>
                    <select onChange={sorting} name="sorting">
                        <option hidden >-- Sort Username --</option>
                        <option value="ascending" >ASCENDING</option>
                        <option value="descending">DESCENDING</option>
                    </select>
                </div>
            </form>
            <table border={0} cellSpacing={10} cellPadding={10} align="center" className='records'>
                <thead>
                    <tr className='main-row'>
                        <th>Sr. No.</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>PASSWORD</th>
                        <th>CONFIRM PASSWORD</th>
                        <th>GENDER</th>
                        <th>HOBBIES</th>
                        <th colSpan={2}>ACTIONS</th>
                    </tr>

                    {list
                        .filter((v, i) => {
                            if (searchTerm === '') {
                                return v;
                            }
                            else if (v?.username?.toLocaleLowerCase().match(searchTerm.toLocaleLowerCase())) {
                                return v;
                            }
                        })
                        .map((val, index) => {
                            return (
                                <>
                                    <tr key={index} >
                                        <td>{index + 1}</td>
                                        <td>{val.username}</td>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <td>{val.confirmPassword}</td>
                                        <td>{val.gender}</td>
                                        <td>{val.hobbies && Array.isArray(val.hobbies) ? val.hobbies.join(', ') : '-'}</td>
                                        <td colSpan={2} className='actions' >
                                            <Link to={"/UpdateForm/" + val.id}>Update</Link>
                                            <button onClick={() => deleteData(val.id)}>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </thead>
            </table >
        </>
    )
}

export default ShowData;