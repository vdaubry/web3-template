import React from "react";
import { FaInstagram } from "react-icons/fa";

const CreateGroup = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-red-100 via-white to-red-100">
      <div className="max-w-md w-full rounded-2xl border-solid border-2 border-gray-300 p-2 mt-5 mb-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-1">
            <span>Swap</span>
            <span>Buy</span>
          </div>
          <FaInstagram size={30} className="" />
        </div>
        <div className="bg-slate-100 p-2 rounded-2xl mt-4">
          <div className="flex items-center justify-between">
            <h5 className="text-4xl text-slate-400"> 0 </h5>
            <div className="bg-slate-300 rounded-2xl flex gap-2 items-center py-1 px-2">
              <FaInstagram size={30} className="" />
              <span>Matic</span>
            </div>
          </div>
          <div className="w-full mt-2">
            <span className="flex justify-end text-sm text-slate-500">
              Balance: 0
            </span>
          </div>
        </div>
        <div className="bg-white h-11 w-11 rounded-xl relative mx-auto my-[-22px] p-1">
          <div className="bg-slate-300 w-full rounded-xl h-full flex items-center justify-center p-2">
            <FaInstagram size={30} className="" />
          </div>
        </div>
        <div className="bg-slate-100 p-2 rounded-2xl mt-1">
          <div className="flex items-center justify-between">
            <h5 className="text-4xl text-slate-400"> 0 </h5>
            <div className="bg-slate-300 rounded-2xl flex gap-2 items-center py-1 px-2">
              <FaInstagram size={30} className="" />
              <span>Matic</span>
            </div>
          </div>
          <div className="w-full mt-2">
            <span className="flex justify-end text-sm text-slate-500">
              Balance: 0
            </span>
          </div>
        </div>
        <div className="bg-slate-100 p-2 rounded-2xl mt-1 flex items-center justify-center">
          <h4 className="text-2xl text-slate-300 font-bold">
            {" "}
            Select a token{" "}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
