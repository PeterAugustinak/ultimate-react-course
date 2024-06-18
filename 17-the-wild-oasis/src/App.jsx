import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Cabins from "./pages/Cabins.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import Bookings from "./pages/Bookings.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate replace to="dashboard"/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="dashboard" element={<Bookings/>}/>
                    <Route path="dashboard" element={<Cabins/>}/>
                    <Route path="dashboard" element={<Login/>}/>
                    <Route path="dashboard" element={<PageNotFound/>}/>
                    <Route path="dashboard" element={<Settings/>}/>
                    <Route path="dashboard" element={<Users/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;