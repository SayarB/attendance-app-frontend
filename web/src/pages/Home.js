// import { signOut } from 'firebase/auth'
import { getIdToken } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
const dateString = new Date().toLocaleString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
function Home() {
  const authState = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserFromBackend = async () => {
      const idToken = await getIdToken(authState.currentUser);
      console.log(idToken);
      const res = await axios.post(
        `https://attendencegdsc.herokuapp.com/get_user`,
        {
          club_name: "tests",
          token: idToken,
        }
      );
      console.log(res.data);
    };
    if (authState.currentUser === null) navigate("/welcome");
    else {
      getUserFromBackend();
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await authState.signOut();
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
    console.log("logged out");
  };

  return (
    <div className="flex flex-col h-[100vh] items-center">
      <div className=" w-full max-w-2xl p-10 flex items-center justify-between font-sans">
        <div>
          <p className="text-xl">Welcome 👋</p>
          <p className="text-3xl">{authState.currentUser?.displayName}</p>
        </div>
        <div className="flex flex-col">
          <div className=" overflow-hidden rounded-xl w-[4rem] bg-[#F3F3F3]">
            <img src="avatar.svg" alt="" className="w-full" />
          </div>
          <button onClick={handleSignOut}>Log out</button>
        </div>
      </div>
      <div className=" w-full border-y-2 py-3 text-center">
        <p className=" font-sans text-primary text-xl">{dateString}</p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Button disabled={false}>Check In</Button>
      </div>
    </div>
  );
}

export default Home;
