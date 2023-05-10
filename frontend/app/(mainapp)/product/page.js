"use client";

import AppHeader from "./AppHeader";
import { useEffect, useState } from "react";
import ClientOnly from "../../clientOnly";
import CreateGroup from "../../../components/CreateGroup";
import Balance from "../../../components/Balance";

export default function App() {
  const [hasMounted, setHasMounted] = useState(false);

  /**************************************
   *
   * Render UI
   *
   **************************************/

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <ClientOnly>
      <AppHeader />
      <CreateGroup />
      <Balance />
    </ClientOnly>
  );
}
