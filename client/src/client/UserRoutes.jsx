import React from 'react'
import { Route, Routes} from "react-router-dom";
import UserProfile from './user/UserProfile';
import UserCart from './user/UserCart';
import UserBills from './user/UserBills';
import UserOrders from './user/UserOrders';
import UserWarranties from './user/UserWarranties';
import UserChangePassword from './user/UserChangePassword';

const UserRoutes = () => {
  
  
  return (
    <Routes>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/cart' element={<UserCart/>}/>
        <Route path='/bills' element={<UserBills/>}/>
        <Route path='/orders' element={<UserOrders/>}/>
        <Route path='/warranties' element={<UserWarranties/>}/>
        <Route path='/change-password' element={<UserChangePassword/>}/>

    </Routes>
  )
}

export default UserRoutes