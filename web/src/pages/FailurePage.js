import React from "react";
import image from "../assets/failure.png";
import Button from "../Components/Button";
import CustomLink from "../Components/CustomLink";
function FailurePage() {
  return (
    <div className=" w-full h-[100vh] p-4 flex flex-col items-center justify-center">
      <img src={image} alt="" className="w-full max-w-xl" />
      <p className=" text-primary font-sans text-3xl">???????????????</p>
      <p className="text-3xl font-sans text-center my-4 mx-2">
        Go to <span className="text-primary ">assigned location</span> then
        Check In
      </p>
      <CustomLink path={"/"}>Retry</CustomLink>
    </div>
  );
}

export default FailurePage;
