import { User } from "./interfaces";
import * as yup from "yup";

export const validateForm = (formData: User) => {
  const newErrors: Partial<User> = {};

  if (!formData.firstName.trim())
    newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
  if (!formData.streetAddress.trim())
    newErrors.streetAddress = "Street address is required";
  if (!formData.city.trim()) newErrors.city = "City is required";
  if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
  if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
    newErrors.email = "Valid email is required";
  if (isNaN(Number(formData.budgetLimit)))
    newErrors.budgetLimit = "Budget must be a number" as unknown as number;

  return newErrors;
};

export const LoginFormValidationSchema = yup.object().shape({
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

export const RegistFormValidationSchema = yup.object().shape({
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
