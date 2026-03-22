import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import type { RootState } from '../utils/appStore';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store: RootState) => store.user);

    const fetchUser = async () => {
        if (userData.status && userData.data) {
            return;
        }
        try {
            const res = await axios.get(BASE_URL + "/profile", {
                withCredentials: true
            });
            dispatch(addUser(res.data?.data));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err?.response?.status === 401) {
                    navigate("/login");
                }
            }
            console.error("Error : ", err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Body;