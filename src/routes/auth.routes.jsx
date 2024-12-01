import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from '../pages/Signin';
import { SignUp } from '../pages/Signup';

export function AuthRoutes(){
    const user = localStorage.removeItem("@rocketnotes:user");
    return(
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>

            { !user && <Route path="*" element={<Navigate to="/" />} /> }
        </Routes>
    )
}
