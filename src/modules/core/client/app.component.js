import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "fomantic-ui-css/semantic.css";
import "izitoast/dist/css/iziToast.css";
import "./app.component.css";

import NoMatch from "./NoMatch";
import PublicLayoutRoute from "./PublicLayoutRoute";
import PrivateLayoutRoute from "./PrivateLayoutRoute";
import Login from "../../user/client/components/login.component";
import Register from "../../user/client/components/register.component";
import ResetPassword from "../../user/client/components/ResetPassword";
import Profile from "../../user/client/components/profile.component";
import Dashboard from "../../user/client/components/dashboard.component";
import { getSignedInUserProfile } from "../../user/client/user.actions";

import Item from "../../item/client/components/item.component";
import Items from "../../item/client/components/items.component";
import Brands from "../../brand/client/brands.component";
import Categories from "../../category/client/components/categories.component";

let refCount = 0;

function setLoading(isLoading) {
    if (isLoading) {
        refCount++;
        document.getElementById("loader").style = "display: block";
    } else if (refCount > 0) {
        refCount--;
        if(refCount > 0) document.getElementById("loader").style = "display: block";
        else document.getElementById("loader").style = "display: none";
    }
}

axios.interceptors.request.use(config => {
    setLoading(true);
    return config;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    setLoading(false);
    return response;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSignedInUserProfile());
    }, [dispatch]);

    return (
        <Routes>
            <Route element={<PublicLayoutRoute/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="reset-password" element={<ResetPassword/>}/>
            </Route>

            <Route element={<PrivateLayoutRoute/>}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="items" element={<Items/>}/>
                <Route path="items/:id" element={<Item/>}/>
                <Route path="brands" element={<Brands/>}/>
                <Route path="categories" element={<Categories/>}/>
            </Route>

            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    );
}
