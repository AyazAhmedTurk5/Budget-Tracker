import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
} from "@mui/material";
import loginImage from "../../assets/images/loginImage.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import logo from "../../assets/images/BudgetTracker.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { updateUser } from "../../store/user/user.slice";
import { LoginFormData } from "../../utils/interfaces";
import { LoginFormValidationSchema } from "../../utils/validation";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormValidationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.user);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (user) {
      dispatch(updateUser({ userId: user.userId, isLoggedIn: true }));
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="layout">
      {/* Logo */}
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
            <div className="mb-2">
              <label
                htmlFor="password"
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
                    fullWidth
                    variant="outlined"
                    type="email"
                    placeholder="Test@gmail.com"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 2, backgroundColor: "#EFF4FB" }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="message icon"
                          className="!text-[#98A2B3]"
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
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 2, backgroundColor: "#EFF4FB" }}
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
                sx={{
                  fontSize: "14px",
                  color: "#6C63FF",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#7539FF",
                color: "#fff",
                padding: "10px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#5a54d2" },
              }}
            >
              Log In
            </Button>
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
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "100%",
            paddingRight: "5px",
          }}
        >
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Login;
