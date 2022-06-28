import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRequire from "../contexts/AuthRequire";
import BlankLayout from "../layout/BlankLayout";
import MainLayout from "../layout/MainLayout";
import AccountPage from "../page/AccountPage";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import NotFoundPage from "../page/NotFoundPage";
import RegisterPage from "../page/RegisterPage";
import UserProfilePage from "../page/UserProfilePage";

function IndexRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default IndexRouter;
