import io from "socket.io-client";
import { BASE_URL } from "./constants";

const socket = location.hostname === "localhost"
  ? io(BASE_URL, { withCredentials: true })
  : io("/", { path: "/api/socket.io", withCredentials: true });

export default socket;
