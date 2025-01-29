import { User } from "./interfaces";

export const validateForm = (formData: User) => {
  const newErrors: Partial<User> = {};

  if (!formData.firstName.trim())
    newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!formData.jobTitile.trim()) newErrors.jobTitile = "Job title is required";
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
