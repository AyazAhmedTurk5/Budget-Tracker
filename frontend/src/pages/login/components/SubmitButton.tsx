import { Button } from "@mui/material";

const SubmitButton = ({ label }: { label: string }) => (
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
    {label}
  </Button>
);

export default SubmitButton;
