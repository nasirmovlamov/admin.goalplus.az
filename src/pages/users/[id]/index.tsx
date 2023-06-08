import Category from "@/components/category/Category";
import Layout from "@/components/layout/Layout";
import { SelectedUser } from "@/components/users/SelectedUser";
import Users from "@/components/users/Users";

export default function userPage() {
  return (
    <Layout title="Users">
      <SelectedUser />
    </Layout>
  );
}
