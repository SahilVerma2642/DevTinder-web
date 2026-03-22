import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../features/connections/connectionSlice";
import type { RootState } from "../utils/appStore";
import UserCardItem from "./UserCardItem";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store: RootState) => store.connection);

  const fetchConnections = async () => {
    if (connections && connections.length > 0) {
      return;
    }
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      if (response.data?.data) {
        console.log("Connections data:", response.data.data);
        dispatch(addConnections(response.data.data));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching connections:", error.response);
      }
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <div className="my-3 font-bold text-xl text-center">Connections</div>
      <div className="flex flex-col items-center gap-4 px-4">
        {connections?.map((connection, id) => (
          <UserCardItem user={connection} key={id} />
        ))}
      </div>
    </>
  );
};

export default Connections;
