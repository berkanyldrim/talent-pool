import { DashboardLayout } from "./components/dashboard-layout";
import { TalentPoolHeader } from "./components/talent-pool-header";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { applicants } from "./lib/data";

function App() {
  return (
    <DashboardLayout>
      <TalentPoolHeader />
      <DataTable columns={columns} data={applicants} />
    </DashboardLayout>
  );
}

export default App;
