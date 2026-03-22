import React from 'react';
import { UserData } from '../features/user/user.types';

interface UserCardPreviewProps {
    user: Partial<UserData>;
}

const UserCardPreview = ({user} : UserCardPreviewProps) => {
    const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
        <div
            className="card bg-base-100 w-80 md:w-96 shadow-xl"
        >
            <figure className="relative overflow-hidden">
                <img src={photoUrl} alt="Profile" className="object-cover h-80 w-full" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName + " " + lastName}
                    {(age || gender) && (
                        <div className="badge badge-secondary">
                            {(age ?? '') + (gender ? " " + gender : '')}
                        </div>
                    )}
                </h2>
                {about && <p className="text-sm">{about}</p>}
            </div>
        </div>
    );
}

export default UserCardPreview
