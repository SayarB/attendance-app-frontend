import React from "react";

function Card({ text, img, icon }) {
  return (
    <div className="flex items-center justify-between m-5 px-3 py-1 border-2 rounded-xl cursor-pointer font-sans hover:shadow-md">
      <img src={img} alt="" className=" mx-2 h-20 p-2" />
      <p className=" mx-5 flex-1">{text}</p>
      <img className="mx-5" src={icon} alt="" />
    </div>
  );
}

export default Card;
