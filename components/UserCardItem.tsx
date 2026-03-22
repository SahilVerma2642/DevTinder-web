import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearRequest } from "../features/requests/requestSlice";

const UserCardItem = ({ ...props }) => {
  console.log("UserCardItem props:", props);
  const dispatch = useDispatch();

  if (!props.user) {
    return null;
  }
  const { firstName, lastName, age, gender, photoUrl, about } = props.user;
  const requestId = props._id;

  const reviewRequest = async (status: "accepted" | "rejected", _id: string) => {
    try {
        const response = await axios.post(BASE_URL + `/request/review/${status}/${_id}`, 
            {}, 
            { withCredentials: true }
        );
        if (response.data?.data) {
            dispatch(clearRequest({_id}));
        }

    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.error(`Error ${status} request:`, error.response);
        }
    }
  };

  return (
    <div className="hover-3d w-full sm:max-w-2xl my-6 mx-2 cursor-pointer">
      {/* content */}
      <div className="card w-full text-black shadow-sm mt-4">
        <div className="card bg-base-100 shadow-sm flex flex-col sm:flex-row">
          <figure className="w-full aspect-square sm:aspect-auto sm:w-32 sm:h-36 sm:shrink-0 overflow-hidden rounded-t-xl sm:rounded-t-none sm:rounded-l-xl">
            <img src={photoUrl} alt="Movie" className="w-full h-full object-cover object-top" />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-base">
              {firstName + " " + lastName}
            </h2>
            {(age || gender) && (
              <div className="badge badge-secondary text-xs">
                {(age ?? "") + (gender ? " " + gender : "")}
              </div>
            )}
            <p className="text-sm line-clamp-2">{about}</p>
            <div className="card-actions justify-end relative z-10 flex-wrap gap-2">
              {requestId && (
                <>
                  <button className="btn btn-outline btn-accent btn-sm" onClick={() => reviewRequest('accepted', requestId)}>Accept</button>
                  <button className="btn btn-outline btn-error btn-sm" onClick={() => reviewRequest('rejected', requestId)}>Reject</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 8 empty divs needed for the 3D effect */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div className="pointer-events-none"></div>
      <div className="pointer-events-none"></div>
    </div>
  );
};

export default UserCardItem;
