import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
        } else {
          toast.error(data?.payload?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign In Here</h1>
        <p className="mt-2">
          Dont't have an account?
          <Link
            className="font-medium ml-2 hover:underline hover:text-blue-600"
            to="/auth/register"
          >
            Sign up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
      />
    </div>
  );
}

export default login;
