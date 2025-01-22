import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import signUpImage from "../../assets/signup_illustration.svg";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  budget: number;
}
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^[A-Za-z\s-]+$/,
      "Only alphabets, spaces, and hyphens are allowed"
    )
    .max(50, "First Name cannot exceed 50 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .matches(
      /^[A-Za-z\s-]+$/,
      "Only alphabets, spaces, and hyphens are allowed"
    )
    .max(50, "Last Name cannot exceed 50 characters")
    .required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include alphabets, numbers, and special characters"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  budget: yup
    .number()
    .typeError("Budget must be a number")
    .min(1, "Budget must be at least 1")
    .max(99999999, "Budget cannot exceed 99999999")
    .required("Budget is required"),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data: ", data);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "2rem",
          backgroundColor: "white",
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "start",
            }}
          >
            Sign Up
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, textAlign: "start" }}>
            Welcome to our community
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name and Last Name */}
            <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>

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
                  sx={{ mb: 2 }}
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
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  variant="outlined"
                  type="password"
                  sx={{ mb: 2 }}
                />
              )}
            />
            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            {/* Budget */}
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Budget Limit"
                  fullWidth
                  variant="outlined"
                  error={!!errors.budget}
                  helperText={errors.budget?.message}
                  sx={{ mb: 3 }}
                />
              )}
            />

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
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Button
              variant="text"
              sx={{ textTransform: "none", color: "#6C63FF" }}
            >
              Log in
            </Button>
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
            src={signUpImage}
            alt="Sign Up Illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Login;
