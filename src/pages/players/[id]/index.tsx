import Category from "@/components/category/Category";
import Layout from "@/components/layout/Layout";
import { SelectedPlayer } from "@/components/players/SelectedPlayer";
export default function playersPage() {
  return (
    <Layout title="Players">
      <SelectedPlayer />
    </Layout>
  );
}
