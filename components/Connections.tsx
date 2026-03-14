import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { RootState } from '../utils/appStore';

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store: RootState) => store.connection);

    const fetchConnections = async () => {
        if (connections && connections.length > 0) {
            return;
        }
        try {
            const response = await axios.get(BASE_URL + "/user/connections",
                { withCredentials: true });

            if (response.data?.data) {
                console.log("Connections data:", response.data.data);
                dispatch(addConnections(response.data.data));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error fetching connections:", error.response);
            }
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div>Connections</div>
    )
}

export default Connections;
