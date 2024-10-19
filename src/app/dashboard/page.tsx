import SignOutButton from "@/components/auth/sign-out";
import ProtectedLayout from "@/components/custom/layout";

export default async function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="max-w-sm mx-auto mt-10 space-y-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <SignOutButton />
      </div>
    </ProtectedLayout>
  );
}
