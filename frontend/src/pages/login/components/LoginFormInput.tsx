import { Control, Controller } from "react-hook-form";
import { TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { FieldErrors } from "react-hook-form";
import { LoginFormData } from "../../../utils/interfaces";

interface LoginFormInputProps {
  name: "email" | "password" | "rememberMe";
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  type: string;
  placeholder: string;
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

const LoginFormInput = ({
  name,
  control,
  errors,
  type,
  placeholder,
  showPassword,
  handleClickShowPassword,
}: LoginFormInputProps) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-[#2B2B2B] text-[14px] leading-6 font-normal mb-1"
      >
        {placeholder}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            type={type}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            sx={{ mb: 2, backgroundColor: "#EFF4FB" }}
            InputProps={{
              endAdornment:
                name === "email" ? (
                  <IconButton
                    aria-label="message icon"
                    className="!text-[#98A2B3]"
                    edge="end"
                  >
                    <MailOutlineIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    className="!text-[#98A2B3]"
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
            }}
          />
        )}
      />
    </div>
  );
};

export default LoginFormInput;
