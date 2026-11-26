import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/analytics"
          element={<ModulePage title="Financial Analytics" description="Explore your income, expenses, savings and financial patterns." />}
        />

        <Route
          path="/transactions"
          element={<ModulePage title="Transactions" description="Upload, review and manage your financial transactions." />}
        />

        <Route
          path="/forecasting"
          element={<ModulePage title="Predictive Analytics" description="Explore projected income, expenditure and future savings." />}
        />

        <Route
          path="/budgets"
          element={<ModulePage title="Smart Budgets" description="Review intelligent budget recommendations based on spending behaviour." />}
        />

        <Route
          path="/settings"
          element={<ModulePage title="Settings" description="Manage your FINSIGHT application preferences." />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;