import { useRouter } from "next/router";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sports");
  }, [])
  
  return (
    <Layout title="Home Layout">
      <Dashboard />
    </Layout>
  );
}
