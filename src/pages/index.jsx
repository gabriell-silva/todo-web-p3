import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivatePath } from "../containers/PrivatePath";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Pages = () => {
  return (
    <Routes path="/">
      <Route index element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <PrivatePath>
            <Home />
          </PrivatePath>
        }
      />
    </Routes>
  );
};

export default Pages;
