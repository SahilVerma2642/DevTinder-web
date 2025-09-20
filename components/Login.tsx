import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setemailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });

            console.log('res is ', res);

            dispatch(addUser(res.data?.data));
            return navigate("/");
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    return (
        <div className="card w-96 bg-base-300 shadow-sm mx-auto mt-10">
            <div className="card-body">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="text"
                                required
                                placeholder="email"
                                // pattern="[A-Za-z][A-Za-z0-9\-]*"
                                // minlength="3"
                                // maxlength="30"
                                title="Only letters, numbers or dash"
                                onChange={(e) => { setemailId(e.target.value) }}
                                value={emailId}
                            />
                        </label>
                        <p className="validator-hint">
                            Must be 3 to 30 characters
                            <br />containing only letters, numbers or dash
                        </p>
                    </div>
                    <div className="col-span-12">
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                // minlength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                    </div>

                    <div className="col-span-12 mt-6">
                        <button className="btn btn-primary btn-block" onClick={handleSubmit}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login