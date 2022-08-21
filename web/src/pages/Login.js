import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import logo from "../logo.svg";

import { RecaptchaVerifier } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase";
function Login() {
  const [formData, setFormData] = useState({
    name: "",
    phno: "",
    otp: "",
  });
  const [error, setError] = useState({
    phno: {
      error: false,
      message: "",
    },
    otp: {
      error: false,
      message: "",
    },
  });
  const authState = useAuth();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    if (authState.currentUser !== null) navigate("/");
  }, []);

  useEffect(() => {
    setRecaptchaVerifier(
      new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: () => {
            console.log("Captcha Verified");
          },
        },
        auth
      )
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (otpSent) {
      if (confirmationResult) {
        confirmationResult
          .confirm(formData.otp)
          .then(() => navigate("/"))
          .catch((err) => {
            if (err.code === "auth/invalid-verification-code") {
              // alert(err.code)
              setError((error) => ({
                ...error,
                otp: {
                  error: true,
                  message: "Wrong OTP",
                },
              }));
            }
          });
      }
    } else {
      authState
        .signIn(recaptchaVerifier, formData.phno)
        .then((confirmationRes) => {
          setOtpSent(true);
          setConfirmationResult(confirmationRes);
        });
    }
  };

  return (
    <div className="font-sans absolute h-full w-full max-h-[800px] max-w-[500px] bg  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 flex flex-col">
      <div className="flex items-center my-10">
        <img src={logo} alt="" className="w-14 mr-5" />
        <p className="text-primary text-5xl ml font-sans">Nock</p>
      </div>
      <div className=" my-10">
        <p className="text-[2rem] font-thin leading-10">
          Hey, <br /> Login Now
        </p>
        <p className="text-[1rem] my-5">
          If you are new ask your{" "}
          <span className="text-primary">
            club seniors about <span className=" font-bold">Nock</span> access
          </span>
        </p>
        <form className=" mt-5 flex flex-col">
          <input
            value={formData.phno}
            onChange={(e) => {
              setFormData({ ...formData, phno: e.target.value });
            }}
            type="text"
            placeholder="Phone Number"
            className="p-5 rounded-md bg-secondary my-3"
          />
          {otpSent && (
            <>
              <input
                value={formData.otp}
                onChange={(e) => {
                  setFormData({ ...formData, otp: e.target.value });
                }}
                type="text"
                placeholder="OTP"
                className={`p-5 rounded-md bg-secondary my-3 ${
                  error.otp.error ?? "border-red-500"
                }`}
              />
              {error.otp.error && (
                <p className=" text-sm text-red-500">{error.otp.message}</p>
              )}
            </>
          )}
          <Button
            disabled={false}
            id="sign-in-button"
            onClick={handleSubmit}
            type="submit"
            className="mx-0 w-full"
          >
            {!otpSent ? "Send OTP" : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
