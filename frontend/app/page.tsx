"use client";

import TransactionComponent from "@/components/TransactionComponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/signin");
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-3xl">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div>
      <TransactionComponent />
    </div>
  );
}
