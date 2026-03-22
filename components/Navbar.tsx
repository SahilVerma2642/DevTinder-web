import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../utils/appStore';
import { removeUser} from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Navbar = () => {
    const userData = useSelector((store: RootState) => store.user);
    const user = userData?.data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, {
                withCredentials: true
            });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.error("Logout error : ", err);
            //Redirect to error page !
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm z-200 sticky top-0">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            {user &&
                <div className="flex gap-2 itmes-center justify-center">
                    <p className="my-auto">Welcome{user?.firstName ? ", " + user.firstName : ""}</p>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoUrl ?? null} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections" className="justify-between">
                                    Connections
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar