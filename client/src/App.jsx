import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Boards from "./pages/Boards";
import BoardView from "./pages/BoardView";

function PrivateRoute({auth}) {
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PublicRoute({ auth, children }) {
  return auth ? <Navigate to="/boards" /> : children;
}

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to /boards or /login */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/boards" : "/login"} />} />

        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute auth={isAuthenticated}>
            <Login />
          </PublicRoute>
        }/>

        <Route path="/signup" element={
          <PublicRoute auth={isAuthenticated}>
            <Signup />
          </PublicRoute>
        }/>

        {/* Private Routes */}
        <Route element={<PrivateRoute auth={isAuthenticated}/>}>
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId/*" element={<BoardView />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
