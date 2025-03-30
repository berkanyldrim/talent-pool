import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { DashboardLayout } from "./components/dashboard-layout";
import { TalentPoolHeader } from "./components/talent-pool-header";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { applicants } from "./lib/data";
import { TanstackQueryProvider } from "./lib/query-provider";
import { AuthProvider, useAuth } from "./contexts/auth-context";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950 p-4">
              <LoginForm />
            </div>
          )
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <div className="p-4 md:p-6">
                <TalentPoolHeader />
                <DataTable columns={columns} data={applicants} />
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <TanstackQueryProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </TanstackQueryProvider>
  );
}

export default App;
