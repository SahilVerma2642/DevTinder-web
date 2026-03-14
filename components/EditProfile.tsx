import { useState } from 'react'
import { UserData } from "../features/user/userSlice";
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

interface UserProps {
    user: UserData
}

const EditProfile: React.FC<UserProps> = ({ user }: UserProps) => {
    const [firstName, setFirstName] = useState<string | null>(user.firstName);
    const [lastName, setLastName] = useState<string | null>(user.lastName);
    const [age, setAge] = useState<number | null>(user?.age ?? null);
    const [gender, setGender] = useState<string | null>(user?.gender ?? null);
    const [about, setAbout] = useState<string | null>(user.about);
    const [photoUrl, setPhotoUrl] = useState<string | null>(user.photoUrl);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const response = await axios.patch(BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    photoUrl,
                    about
                },
                { withCredentials: true }
            );

            if (response.data?.data) {
                dispatch(addUser(response.data.data));
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Error response is ", err.response);
                setError(err.response?.data?.error || "Something went wrong.");
            }
        }
    }

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setAge(isNaN(value) ? null : value);
    };

    return (
        <>
            <div className='flex flex-col md:flex-row gap-4 items-center my-10'>
                <div className='flex-1 flex justify-end md:mr-10'>
                    <UserCard
                        user={{
                            firstName, lastName, age, gender, photoUrl, about
                        }}
                    />
                </div>
                <div className="flex-1 flex justify-start md:ml-10">
                    <div className="card md:w-96 w-80 bg-base-300 shadow-sm mt-10">
                        <div className="card-body">
                            <h2 className="card-title my-1 mx-auto">Edit your Profile</h2>
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12">
                                    <label className="input validator">
                                        <input
                                            type="text"
                                            required
                                            placeholder="First Name"
                                            onChange={(e) => { setFirstName(e.target.value) }}
                                            value={firstName ?? ""}
                                        />
                                    </label>
                                    {/* {error && (<p className="text-red-600 mt-3">{error}</p>)} */}
                                </div>
                                <div className="col-span-12">
                                    <label className="input validator">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Last Name"
                                            onChange={(e) => { setLastName(e.target.value) }}
                                            value={lastName ?? ""}
                                        />
                                    </label>
                                    {/* {error && (<p className="text-red-600 mt-3">{error}</p>)} */}
                                </div>
                                <div className="col-span-12">
                                    <label className="input validator">
                                        <input
                                            type="number"
                                            required
                                            placeholder="Age"
                                            onChange={(e) => { handleAgeChange(e) }}
                                            value={age ?? ""}
                                        />
                                    </label>
                                    {/* {error && (<p className="text-red-600 mt-3">{error}</p>)} */}
                                </div>
                                <div className="col-span-12">
                                    <label className="input validator">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Gender"
                                            onChange={(e) => { setGender(e.target.value) }}
                                            value={gender ?? ""}
                                        />
                                    </label>
                                    {/* {error && (<p className="text-red-600 mt-3">{error}</p>)} */}
                                </div>
                                <div className="col-span-12">
                                    <label className="input validator">
                                        <input
                                            type="text"
                                            required
                                            placeholder="About"
                                            onChange={(e) => { setAbout(e.target.value) }}
                                            value={about ?? ""}
                                        />
                                    </label>
                                    {/* {error && (<p className="text-red-600 mt-3">{error}</p>)} */}
                                </div>
                                <div className="col-span-12">
                                    <label className="input validator">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Photo URL"
                                            onChange={(e) => { setPhotoUrl(e.target.value) }}
                                            value={photoUrl ?? ""}
                                        />
                                    </label>
                                    {/* {error && (<p className="text-red-600 mt-3">{error}</p>)} */}
                                </div>

                                <div className="col-span-12 mt-3">
                                    <button className="btn btn-primary btn-block" onClick={saveProfile}>Save Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;