import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequest } from "../features/requests/requestSlice";
import UserCardItem from "./UserCardItem";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store: RootState) => store.request);

  const fetchRequests = async () => {
    if (requests && requests.length > 0) {
      return;
    }
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      if (response.data?.data) {
        console.log("Requests data:", response.data.data);

        dispatch(addRequest(response.data.data));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching requests:", error.response);
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (<>
      <div className="my-3 font-bold text-xl text-center">Requests</div>
      <div className="flex flex-col items-center gap-4 px-4">
        {requests?.map((request, id) => (
          <UserCardItem user={request?.sourceData} _id={request?._id} key={id} />
        ))}
      </div>
    </>);
};

export default Requests;
