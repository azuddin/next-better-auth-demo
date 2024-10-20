export default function OrgDashboardPage({
  params,
}: {
  params: { orgSlug: string };
}) {
  return <h1>{params.orgSlug}</h1>;
}
