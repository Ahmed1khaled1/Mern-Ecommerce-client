import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Registre() {

  
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          navigate("/auth/login");
        } else {
          toast.warning(data?.payload?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign Up Here</h1>
        <p className="mt-2">
          Allready have an account?
          <Link
            className="font-medium ml-2 hover:underline hover:text-blue-600"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
}

export default Registre;
