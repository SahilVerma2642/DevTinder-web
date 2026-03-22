import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from "../utils/validators";

const Login = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (): string | null => {
    if (!isLoginForm) {
      if (!isValidName(firstName)) {
        return "Enter a valid first  name.";
      }
      if (!isValidName(lastName)) {
        return "Enter a valid last name.";
      }
    }
    if (!isValidEmail(emailId)) {
      return "Enter a valid email address.";
    }
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return passwordValidation.message;
    }
    return null;
  };

  const handleSubmit = async () => {
    const ValidationError = validate();
    if (ValidationError) {
      return setError(ValidationError);
    }
    const apiUrl = isLoginForm ? "/login" : "/signup";
    const requestBody = isLoginForm
      ? {
          emailId,
          password,
        }
      : {
          firstName,
          lastName,
          emailId,
          password,
        };

    try {
      const res = await axios.post(BASE_URL + apiUrl, requestBody, {
        withCredentials: true,
      });

      dispatch(addUser(res.data?.data));
      return navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.error || "Something went wrong.");
      }
    }
  };
  return (
    <div className="card w-96 bg-base-300 shadow-sm mx-auto mt-10">
      <div className="card-body">
        <div className="grid grid-cols-12 gap-3">
          {!isLoginForm && (
            <div className="col-span-12">
              <label className="input validator">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </label>
              <p className="validator-hint"></p>
            </div>
          )}
          {!isLoginForm && (
            <div className="col-span-12">
              <label className="input validator">
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </label>
              <p className="validator-hint"></p>
            </div>
          )}
          <div className="col-span-12">
            <label className="input validator">
              <input
                type="email"
                required
                placeholder="email"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                value={emailId}
              />
            </label>
            <p className="validator-hint"></p>
          </div>
          <div className="col-span-12">
            <label className="input validator">
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </label>
            {error && <p className="text-red-600 mt-3">{error}</p>}
          </div>

          <div className="col-span-12 mt-3">
            <button
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <div className="col-span-12 mt-3">
            {isLoginForm ? (
              <button
                className="cursor-pointer text-blue-700"
                onClick={() => {setIsLoginForm(false); setError("");}}
              >
                New user? Signup here
              </button>
            ) : (
              <button
                className="cursor-pointer text-blue-700"
                onClick={() => {setIsLoginForm(true); setError("");}}
              >
                Already have an account ? Login here
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
