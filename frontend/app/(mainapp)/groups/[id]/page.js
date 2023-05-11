import React from "react";
import MemberList from "@/components/MemberList";
import InviteMember from "@/components/InviteMember";
import ClientOnly from "@/utils/clientOnly";

const Page = ({ params }) => {
  return (
    <ClientOnly>
      <MemberList groupId={params.id} />;
      <InviteMember groupId={params.id} />;
    </ClientOnly>
  );
};

export default Page;
