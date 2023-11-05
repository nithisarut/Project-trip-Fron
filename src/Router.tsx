import React, { useCallback, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './page/admin/Dashboard'
import TableUser from './page/admin/User/TableUser'
import DetailTrip from './page/user/DetailTrip'
import Home from './page/user/Home'
import Profile from './page/user/Profile'
import Trips from './page/user/Trips'
import TableCar from './page/admin/Car/TableCar'
import TableLocation from './page/admin/Location/TableLocation'
import TableTrip from './page/admin/Trip/TableTrip'
import { fetchAccount } from './app/store/accountSlice'
import { useAppDispatch, useAppSelector } from './app/store/configureStore'
import { PrivateRoute } from './PrivateRoute/PrivateRoute'
import { RoleInfo } from './app/models/Role'
import CreateCar from './components/admin/CreateCar'
import CreateLocation from './components/admin/CreateLocation'
import EditProfile from './page/user/EditProfile'
import CreateTrip from './components/admin/CreateTrip'
import { setShowLayout } from './app/store/homeSlice'
import FormRent from './page/user/FormRent'
import Order from './page/admin/Order/TableOrder'
import DetailLocation from './page/admin/Location/ModalAddimage'
import DetailCar from './page/admin/Car/DetailCar'
import LocationPage from './page/user/LocationPage'
import DetailProfile from './page/admin/User/DetailProfile'
import DetailLocationadmin from './page/admin/Location/ModalAddimage'
import DetailLocationPage from './page/admin/Location/DetailLocationPage'

export const UrlHome = "https://tee.kru.ac.th/cs63/s07/Project-End/";

function Router() {
  const dispatch = useAppDispatch()
  const { showLayout } = useAppSelector(state => state.home);
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchAccount())
        .unwrap()
        .then(async (data) => {
          // if (data) await dispatch(fetchCartAsync(data.id));
        });
    } catch (error) {
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);
  useEffect(() => {
    var obj = JSON.parse(JSON.stringify(location));
    var path = obj.pathname as string;
    if (!path.includes("/Dashboard")) dispatch(setShowLayout(true));
    else dispatch(setShowLayout(false));
  }, [location, showLayout]);
  return (
    <React.Fragment>
      <Routes>
        <Route path={UrlHome} element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/Trip' element={<Trips />} />
        <Route path='/EditProfile' element={<EditProfile />} />
        <Route path='/DetailTrip/:id' element={<DetailTrip />} />
        <Route path='/FormRent' element={<FormRent />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/LocationPage' element={<LocationPage />} />

        <Route element={<PrivateRoute roles={[RoleInfo.admin]} />} >
          <Route path='/CreateCar' element={<CreateCar />} />
          <Route path='/TableCar' element={<TableCar />} />
          <Route path='/TableUser' element={<TableUser />} />
          <Route path='/TableOrder' element={<Order />} />
          <Route path='/TableLocation' element={<TableLocation />} />
          <Route path='/TableTrip' element={<TableTrip />} />
          <Route path='/CreateLocation' element={<CreateLocation />} />
          <Route path='/CreateTrip' element={<CreateTrip />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/DetailLocationPage' element={<DetailLocationPage />} />

        </Route>
       
      </Routes>
    </React.Fragment>

  )
}

export default Router
