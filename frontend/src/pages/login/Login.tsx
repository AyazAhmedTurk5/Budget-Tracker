import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { setLoggedIn, setUser } from "../../store/user/user.slice";

import {
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";

import loginImage from "../../assets/images/loginImage.svg";
import logo from "../../assets/images/BudgetTracker.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormData } from "../../utils/interfaces";
import { LoginFormValidationSchema } from "../../utils/validation";
import LoginFormInput from "./components/LoginFormInput";
import SubmitButton from "./components/SubmitButton";
import IllustrationSection from "./components/IllustrationSection";
import { loginUser } from "../../services/api/expenses-api";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormValidationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);
      dispatch(setUser(result.user));
      dispatch(setLoggedIn(true));
      localStorage.setItem("token", result.token);

      toast.success("Login successful !!");
      navigate("/");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? "Wrong username or password. Please try again!"
          : "Something went wrong!",
        {
          style: { backgroundColor: "#FDE2E2", color: "#D32F2F" },
        }
      );
    }
  };
  return (
    <div className="layout">
      <img src={logo} alt="Logo" style={{ width: "300px", height: "50px" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#fff",
            borderRadius: "12px",
            pr: { md: "40px" },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "32px",
              mt: 3,
              textAlign: "start",
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            sx={{
              mb: 3,
              textAlign: "start",
              color: "#878A99",
              fontSize: "18px",
              letterSpacing: "0.25px",
            }}
          >
            Sign in to continue to Budget Tracker
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <LoginFormInput
              name="email"
              control={control}
              errors={errors}
              type="email"
              placeholder="Email"
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
            />

            {/* Password */}
            <LoginFormInput
              name="password"
              control={control}
              errors={errors}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
            />

            {/* Remember Me */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Controller
                name="rememberMe"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Remember me"
                  />
                )}
              />
              <Typography
                sx={{ fontSize: "14px", color: "#6C63FF", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* Submit Button */}
            <SubmitButton label="Log In" />
          </form>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{ textTransform: "none", color: "#6C63FF" }}
              >
                Sign Up
              </Button>
            </Link>
          </Typography>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        {/* Illustration Section */}
        <IllustrationSection imgSrc={loginImage} />
      </Box>
    </div>
  );
};

export default Login;
