import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import signUpImage from "../../assets/images/signup_illustration.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "../../assets/images/BudgetTracker.svg";
import { RegistFormValidationSchema } from "../../utils/validation";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { RegisterFormData } from "../../utils/interfaces";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/user.slice";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistFormValidationSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { firstName, lastName, email, password, budgetLimit } = data;

    try {
      const response = await api.post("/budgets/signup", {
        firstName,
        lastName,
        email,
        password,
        budgetLimit,
      });

      const responseData = response.data;
      // alert("Signup successful! Token: " + responseData.token);  //Add Toasters

      // Store user data in Redux
      dispatch(setUser(responseData.user));

       toast.success("Signup Successful!  Please Login through this Login Page");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="layout">
      <img src={logo} alt="Logo" className="w-[300px] h-[50px]" />

      <Box
        className="flex justify-center items-center bg-white mt-6"
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Form Section */}
        <Box
          className="rounded-xl bg-[#fff]"
          sx={{
            width: { xs: "100%", md: "50%" },
            pr: { md: "40px" },
          }}
        >
          <Typography className="!font-bold !text-[32px] !mt-3 !text-start bg-[#fff]">
            Sign Up
          </Typography>
          <Typography className="!mb-3 !text-start !text-[#878A99] !text-[24px] !tracking-[0.25px]">
            Welcome to our community
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name and Last Name */}
            <div className="flex gap-4 mb-2">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
                >
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="firstName"
                      fullWidth
                      placeholder="Cameron"
                      variant="outlined"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      className="bg-[#EFF4FB]"
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
                >
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="lastName"
                      fullWidth
                      placeholder="Diaz"
                      variant="outlined"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      className="bg-[#EFF4FB]"
                    />
                  )}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    fullWidth
                    placeholder="Test@email.com"
                    variant="outlined"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className="bg-[#EFF4FB]"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="message icon "
                          className="cursor-default !text-[#98A2B3]"
                          edge="end"
                        >
                          <MailOutlineIcon />
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    fullWidth
                    placeholder="Enter your password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    className="bg-[#EFF4FB]"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          className="!text-[#98A2B3]"
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
              >
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    fullWidth
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    className="bg-[#EFF4FB]"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                          className="!text-[#98A2B3]"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </div>

            {/* Budget */}
            <div className="mb-3">
              <label
                htmlFor="budgetLimit"
                className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
              >
                Budget Limit
              </label>
              <Controller
                name="budgetLimit"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="budgetLimit"
                    fullWidth
                    placeholder="Enter Amount"
                    variant="outlined"
                    error={!!errors.budgetLimit}
                    helperText={errors.budgetLimit?.message}
                    className="bg-[#EFF4FB]"
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="!bg-[#7539FF] !p-3 text-white font-bold !hover:bg-[#5a54d2]"
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Link href="/login" sx={{ color: "#6C63FF" }}>
              <Button
                variant="text"
                sx={{ textTransform: "none", color: "#6C63FF" }}
              >
                Log in
              </Button>
            </Link>
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="fullWidth" flexItem />
        {/* Illustration Section */}
        <Box
          className="items-center justify-center w-[50%] h-[100%]"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <img
            src={signUpImage}
            alt="Sign Up Illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Register;
