import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/" Component={Dashboard} />
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
