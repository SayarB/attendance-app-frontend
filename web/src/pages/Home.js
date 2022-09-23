// import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "../assets/loading";
const dateString = new Date().toLocaleString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
function Home() {
  const authState = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [attendanceOpen, setAttendanceOpen] = useState();
  const [isLoading, setLoading] = useState(false);
  const [position, setPosition] = useState({
    lat: "",
    long: "",
  });
  useEffect(() => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(
        "lat = " + pos.coords.latitude + "\nlong = " + pos.coords.longitude
      );
      setPosition({ lat: pos.coords.latitude, long: pos.coords.longitude });
    });
    const retrieveIdToken = async () => {
      const idToken = await getIdToken(authState.currentUser, true);
      console.log(idToken);
      setToken(idToken);
    };

    if (authState.currentUser === null) navigate("/login");
    else retrieveIdToken();

    axios
      .get("https://attendencegdsc.herokuapp.com/attendence_state/testing")
      .then((res) => {
        console.log(res.data);
        setAttendanceOpen(res.data.state);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
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

  const handleClick = async () => {
    console.log("Open attendence");
    // console.log(new Date().toUTCString());
    setLoading(true);
    try {
      const res = await axios.post(
        "https://attendencegdsc.herokuapp.com/give_attendence/",
        {
          club_name: "testing",
          token,
          lat: position.lat,
          long: position.long,
          utc: new Date().toUTCString(),
        }
      );

      setLoading(false);
      console.log("res = ", res.data);
      if (res.data.error && res.data.error === "user not in range") {
        navigate("/failure");
      } else navigate("/success");
    } catch (err) {
      setLoading(false);
      toast.error("There was some Problem");
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isLoading && (
        <div className="fixed w-[100vw] h-[100vh] bg-white z-10">
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Lottie
              isClickToPauseDisabled
              options={lottieOptions}
              height={400}
              width={400}
            />
          </div>
        </div>
      )}
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
          <Button onClick={handleClick} disabled={!attendanceOpen}>
            Check In
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
