import React from 'react'
import { UserData } from "../features/user/userSlice"

const UserCard = ({ ...props }) => {
    if (!props.user) {
        return null;
    }
    const { firstName, lastName, age, gender, photoUrl, about } = props.user;

    return (
        <div className="card bg-base-100 md:w-96 shadow-sm mt-4">
            <figure>
                <img
                    src={photoUrl}
                    alt="Profile Pictures"
                    className='object-cover h-80 w-80'
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName + " " + lastName}
                    {(age || gender) && <div className="badge badge-secondary">{(age ?? '') + (gender ? " " + gender : '')}</div>}
                </h2>
                {about && <p>{about}</p>}
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Ignore</div>
                    <div className="badge badge-outline">Interested</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;