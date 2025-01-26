import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import loginImage from "../../assets/loginImage.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import logo from "../../assets/BudgetTracker.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";

interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: yup.boolean(),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
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
            pr: { md: "20px" },
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
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2, backgroundColor: "#EFF4FB" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="message icon" edge="end">
                        <MailOutlineIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2, backgroundColor: "#EFF4FB" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
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
                backgroundColor: "#6C63FF",
                color: "#fff",
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

        {/* Illustration Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "100%",
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
