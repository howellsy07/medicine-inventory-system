import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute';
import AddMedicine from './pages/AddMedicine';
import DetailsLanding from './pages/DetailsLanding';
import Login from './pages/Login';
import MedicineDetails from './pages/MedicineDetails';
import MedicineList from './pages/MedicineList';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/medicines" replace />} />
          <Route path="/medicines" element={<MedicineList />} />
          <Route path="/medicines/add" element={<AddMedicine />} />
          <Route path="/medicines/details" element={<DetailsLanding />} />
          <Route path="/medicines/:id" element={<MedicineDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

