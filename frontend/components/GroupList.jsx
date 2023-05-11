import React from "react";
import { useState } from "react";
import { contractAddresses, contractAbi } from "@/constants/index";
import { useNetwork, useAccount, useContractRead } from "wagmi";

const GroupList = () => {
  const { chain } = useNetwork();
  const { address: account } = useAccount();

  let contractAddress;

  if (chain && contractAddresses[chain.id]) {
    const chainId = chain.id;
    contractAddress = contractAddresses[chainId]["contract"];
  }

  const { data: groupList } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "listGroupsForMember",
    args: [account],
  });

  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-red-100 via-white to-red-100">
      <div className="max-w-md w-full my-4 ">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Group List
            </label>
            <div className="flex flex-col">
              {groupList?.map((group, i) => (
                <div className="flex flex-row" key={i}>
                  <div className="flex flex-col">{group.id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
