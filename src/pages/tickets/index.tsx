import Tickets from "@/components/tickets/Tickets";
import Layout from "../../components/layout/Layout";
import { Sports } from "@/components/sports/Sports";
export default function ticketPage() {
  return (
    <Layout title="Tickets">
      <Tickets />
    </Layout>
  );
}
