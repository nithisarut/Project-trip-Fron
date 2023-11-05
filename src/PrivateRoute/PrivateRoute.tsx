import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { loadAccountStorage } from '../app/store/accountSlice';
import { useAppSelector } from '../app/store/configureStore';


interface Props {
    roles?: string[];
}

export const PrivateLogin = ({ children }: { children: JSX.Element }) => {

    const { account } = useAppSelector((state) => state.account);
    let location = useLocation();
    let path = localStorage.getItem("savepath");
    if (path == null) path = "/";
    
    if (account) return  <Navigate to={`${path}`} state={{ from: location }} replace />
    
    return children;
};

export const PrivateRoute = ({ roles }: Props) => {
    const account = loadAccountStorage();
    
    let location = useLocation();
   
    var obj = JSON.parse(JSON.stringify(location));
    var path = obj.pathname;
    localStorage.setItem("savepath", path);
    
    if (!account) {
        return <Navigate to="/Dashboard" state={{ from: location }} replace />;
    };
    
    if (roles && !roles?.some((r) => account.roleName.includes(r))) {
        return <Navigate to="/" state={{ from: location }} replace />;
    };

    return <Outlet />;


}