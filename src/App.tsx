import { DashboardLayout } from "./components/dashboard-layout";
import { TalentPoolHeader } from "./components/talent-pool-header";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { applicants } from "./lib/data";

function App() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <TalentPoolHeader />
        <DataTable columns={columns} data={applicants} />
      </div>
    </DashboardLayout>
  );
}

export default App;
