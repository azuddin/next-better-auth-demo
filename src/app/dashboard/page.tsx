import SignOutButton from "@/components/auth/sign-out";

export default function DashboardPage() {
  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <SignOutButton />
    </div>
  );
}
