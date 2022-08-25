import React, { useEffect, useState } from "react";
import { useAuth } from "../../../admin/src/Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/loading";
function List() {
  const authState = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const isToday = (utc) => {
    const someDate = new Date(utc);
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setLoading(true);
    const getMembers = async () => {
      try {
        const res = await axios.get(
          "https://attendencegdsc.herokuapp.com/members/"
        );
        const arr = res.data.filter((user) => {
          return user.last_date && isToday(user.last_date);
        });
        setMembers(arr);
        console.log(arr);
      } catch (err) {
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    };
    if (authState.currentUser !== null) getMembers();
    else navigate("/login");
  }, []);

  return (
    <>
      {isLoading && (
        <div className="relative w-[100vw] h-[100vh] bg-white z-10">
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Lottie options={lottieOptions} height={400} width={400} />
          </div>
        </div>
      )}
      <div>
        {members.length > 0 ? (
          <ul>
            {members.map((member) => (
              <li key={"member-" + member.name}>{member.name}</li>
            ))}
          </ul>
        ) : (
          <p>No attendence yet</p>
        )}
      </div>
    </>
  );
}

export default List;
