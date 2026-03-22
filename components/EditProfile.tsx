import React, { useState } from "react";
import type { UserData } from "../features/user/user.types";
import UserCardPreview from "./UserCardPreview";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";

interface UserProps {
  user: UserData;
}

const EditProfile: React.FC<UserProps> = ({ user }: UserProps) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [age, setAge] = useState<number | undefined>(user.age);
  const [gender, setGender] = useState<string | undefined>(user.gender);
  const [about, setAbout] = useState<string>(user.about);
  const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        { withCredentials: true },
      );

      if (response.data?.data) {
        dispatch(addUser(response.data.data));
        setError(null);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error response is ", err.response);
        setError(err.response?.data?.error || "Something went wrong.");
      }
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") return setAge(undefined);
    const value = parseInt(raw, 10);
    if (!isNaN(value) && value > 0 && value <= 100) setAge(value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-center my-10">
        {/* Desktop preview — always visible */}
        <div className="hidden md:flex flex-1 justify-end md:mr-10">
          <UserCardPreview
            user={{ firstName, lastName, age, gender, photoUrl, about }}
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
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setError(null);
                      }}
                      value={firstName ?? ""}
                    />
                  </label>
                </div>
                <div className="col-span-12">
                  <label className="input validator">
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setError(null);
                      }}
                      value={lastName ?? ""}
                    />
                  </label>
                </div>
                <div className="col-span-12">
                  <label className="input validator">
                    <input
                      type="number"
                      required
                      placeholder="Age"
                      onChange={(e) => {
                        handleAgeChange(e);
                        setError(null);
                      }}
                      value={age ?? ""}
                    />
                  </label>
                </div>
                <div className="col-span-12">
                  <label className="input validator">
                    <input
                      type="text"
                      required
                      placeholder="Gender"
                      onChange={(e) => {
                        setGender(e.target.value);
                        setError(null);
                      }}
                      value={gender ?? ""}
                    />
                  </label>
                </div>
                <div className="col-span-12">
                  <label className="input validator">
                    <input
                      type="text"
                      required
                      placeholder="About"
                      onChange={(e) => {
                        setAbout(e.target.value);
                        setError(null);
                      }}
                      value={about ?? ""}
                    />
                  </label>
                </div>
                <div className="col-span-12">
                  <label className="input validator">
                    <input
                      type="text"
                      required
                      placeholder="Photo URL"
                      onChange={(e) => {
                        setPhotoUrl(e.target.value);
                        setError(null);
                      }}
                      value={photoUrl ?? ""}
                    />
                  </label>
                </div>

                <div className="col-span-12 mt-3">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={saveProfile}
                  >
                    Save Profile
                  </button>
                </div>
                <div className="col-span-12 mt-3">
                  {error && <p className="text-red-600 mt-3">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile preview toggle — below form */}
        <div className="md:hidden w-80 mt-2">
          <button
            className="btn btn-outline btn-block btn-sm"
            onClick={() => setShowPreview((p) => !p)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {showPreview && (
            <div className="mt-4 flex justify-center">
              <UserCardPreview
                user={{ firstName, lastName, age, gender, photoUrl, about }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
