import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/FakeAuthContext.jsx";

function ProtectedRout({children}) {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate();

    useEffect(function () {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}

export default ProtectedRout;