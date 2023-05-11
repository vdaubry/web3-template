import React from "react";

const Page = ({ params }) => {
  return (
    <div>
      <h1>group ID : {params.id}</h1>
    </div>
  );
};

export default Page;
