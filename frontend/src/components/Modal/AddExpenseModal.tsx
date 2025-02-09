import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import CloseIcon from "../../assets/icons/Close-icon.svg";
import { AddExpenseModalProps } from "../../utils/interfaces";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils/utilities";

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  open,
  handleClose,
  selectedExpense,
  modalType,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  const [title, setTitle] = useState(
    modalType !== "Add Expense" ? selectedExpense.title ?? "" : ""
  );
  const [price, setPrice] = useState(
    modalType !== "Add Expense" ? selectedExpense.price.toString() ?? "" : ""
  );
  const [date, setDate] = useState<string | null>(
    modalType !== "Add Expense"
      ? formatDate(new Date(selectedExpense.date))
      : null
  );

  const handleModalAction = () => {
    const expenseData = {
      title,
      price: Number(price),
      date: date ? format(date, "dd-MM-yyyy") : "",
    };

    switch (modalType) {
      case "Add Expense":
        handleAdd?.(expenseData);
        break;
      case "Edit Expense":
        handleEdit?.(selectedExpense._id ?? "", expenseData);
        break;
      case "Delete Expense":
        handleDelete?.(selectedExpense._id ?? "");
        break;
      default:
        break;
    }
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(formatDate(selectedDate));
  };
  // Reusable function to render a field
  const renderField = (
    label: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    isReadOnly = false
  ) => (
    <div>
      <Typography variant="body1" gutterBottom>
        {label}
      </Typography>
      {isReadOnly ? (
        <Typography variant="body1" className="text-[#9E9E9E] !pt-4">
          {value}
        </Typography>
      ) : (
        <TextField
          fullWidth
          value={value}
          onChange={onChange}
          placeholder={label}
          className="bg-[#EFF4FB]"
        />
      )}
    </div>
  );

  // Render date field
  const renderDateField = () => (
    <div>
      <Typography variant="body1" gutterBottom>
        Date
      </Typography>
      {modalType === "Delete Expense" ? (
        <Typography variant="body1" className="text-[#9E9E9E] !pt-4">
          {date ? format(date, "dd-MM-yyyy") : ""}
        </Typography>
      ) : (
        <DatePicker
          selected={date ? new Date(date.split("-").reverse().join("-")) : null}
          placeholderText="Select Date"
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          portalId="root"
          className="cursor-pointer text-[#BCC0C9] bg-[#EFF4FB] rounded-md w-full px-4 py-4"
        />
      )}
    </div>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ borderRadius: "8px" }}
    >
      <Box className="flex justify-between items-center pr-8">
        <DialogTitle>{modalType}</DialogTitle>
        <img
          src={CloseIcon}
          alt="close"
          onClick={handleClose}
          className="cursor-pointer hover:opacity-70 hover:bg-gray-100 "
        />
      </Box>

      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Render Fields */}
          {renderField(
            "Title",
            title,
            (e) => setTitle(e.target.value),
            modalType === "Delete Expense"
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              {renderField(
                "Price (PKR)",
                price,
                (e) => setPrice(e.target.value),
                modalType === "Delete Expense"
              )}
            </div>
            <div style={{ flex: 1 }}>{renderDateField()}</div>
          </div>
        </div>
      </DialogContent>

      <DialogActions className="flex !px-6 !mb-4">
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            width: "50%",
            borderColor: "#9E9E9E",
            color: "#9E9E9E",
            padding: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "50%",
            borderColor: "#7539FF",
            color: "white",
            padding: "10px",
            backgroundColor:
              modalType === "Delete Expense" ? "#EF4435" : "#7539FF",
          }}
          onClick={() => {
            handleModalAction();
          }}
          color="primary"
          disabled={
            modalType !== "Delete Expense" && (!title || !price || !date)
          }
        >
          {modalType === "Add Expense"
            ? "Add"
            : modalType === "Edit Expense"
            ? "Save Changes"
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseModal;
