import DatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddExpenseModal from "../../components/Modal/AddExpenseModal";
import { Box } from "@mui/material";

import { getCurrentDate } from "../../utils/utilities";
import {
  addExpenseApi,
  deleteExpenseApi,
  editExpenseApi,
  fetchExpenses,
} from "../../services/api/expenses-api";

import Sidenav from "../sideNav/Sidenav";
import Header from "../header/Header";
import {
  addExpense,
  deleteExpense,
  editExpense,
} from "../../store/expenses/expenses.slice";
import { RootState } from "../../store/root-reducer";
import "react-datepicker/dist/react-datepicker.css";

import { ExpenseFormData } from "../../utils/interfaces";
import DeleteIcon from "../../assets/icons/delete-icon.svg";
import EditIcon from "../../assets/icons/edit-icon.svg";
import CloseIcon from "@mui/icons-material/Close";
import { FaSearch } from "react-icons/fa";

const Expenses = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch();

  const [date, setDate] = useState<Date | null>(new Date(getCurrentDate()));
  const [sortByFilter, setSortByFilter] = useState<string>("");
  const [expensesData, setExpensesData] = useState<ExpenseFormData[]>(expenses);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseFormData>(
    {} as ExpenseFormData
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalType, setModalType] = useState<"Add" | "Edit" | "Delete" | null>(
    null
  );

  // Function to open modal
  const openModal = (type: "Add" | "Edit" | "Delete") => {
    setModalType(type);
  };

  // Function to close modal
  const handleClose = () => {
    setModalType(null);
  };

  const totalExpenditure = useCallback(() => {
    let total = 0;
    expensesData.map((expense) => (total += expense.price));
    return total;
  }, [expensesData]);

  useEffect(() => {
    const filterExpensesBySearchQuery = () => {
      if (!searchQuery) return expenses;
      return expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    setExpensesData(filterExpensesBySearchQuery());
  }, [searchQuery, expenses]);

  useEffect(() => {
    const filterExpensesByDate = () => {
      if (!date) return expenses;
      return expenses.filter(
        (expense) =>
          new Date(expense.date).setHours(0, 0, 0, 0) ===
          date.setHours(0, 0, 0, 0)
      );
    };

    setExpensesData(filterExpensesByDate());
  }, [date, expenses]);

  useEffect(() => {
    const sortExpenses = () => {
      const sortedExpenses = [...expenses];
      switch (sortByFilter) {
        case "highest":
          sortedExpenses.sort((a, b) => b.price - a.price);
          break;
        case "lowest":
          sortedExpenses.sort((a, b) => a.price - b.price);
          break;
        case "newest":
          sortedExpenses.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case "oldest":
          sortedExpenses.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          break;
        default:
          break;
      }
      return sortedExpenses;
    };

    setExpensesData(sortExpenses());
  }, [sortByFilter, expenses]);

  useEffect(() => {
    fetchExpenses(dispatch);
  }, [dispatch]);

  const handleAdd = async (updatedExpense: ExpenseFormData) => {
    try {
      const result = await addExpenseApi(updatedExpense);
      dispatch(addExpense(result.expense));
      toast.success("Expense added successfully!");
      handleClose();
    } catch (error) {
      toast.error(error as string);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteExpenseApi(id);
      if (result) {
        toast.success("Expense Deleted successfully!");
        dispatch(deleteExpense(id));
        handleClose();
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEdit = async (id: string, updatedExpense: ExpenseFormData) => {
    try {
      const result = await editExpenseApi(id, updatedExpense);
      if (result) {
        toast.success("Expense Edited successfully!");
        dispatch(editExpense({ id, updatedExpense }));
        handleClose();
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <Box sx={{ display: "flex " }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header />

        <div className="p-4 bg-[#EFF4FB] min-h-[92vh]">
          <div className="flex justify-between items-center mb-6 border-b border-gray-300">
            <h1 className="text-[32px] font-[600] leading-[48px] mb-2">
              Expenses
            </h1>
            <button
              onClick={() => openModal("Add")}
              className="bg-[#7539FF] text-white px-4 py-2  mb-2 rounded-md"
            >
              Add Expenses
            </button>
          </div>

          <div className="bg-white shadow rounded-lg overflow-visible">
            {/* Filter Section */}
            <div className="flex justify-between items-center px-4 bg-[#F7F7F7]">
              <h2 className="text-lg font-[600] text-[16px] leading-[24px]">
                Expenses
              </h2>
              <div className="flex items-center gap-5">
                {/* Sort By Dropdown */}
                <div className="filters-container">
                  <label
                    htmlFor="sortBy"
                    className="text-[#667085] bg-[#E1E8F2] icon-box text-[12px]"
                  >
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    onChange={(e) => setSortByFilter(e.target.value)}
                    className="icon-box text-[#BCC0C9] focus:outline-[#7539FF]"
                  >
                    <option value="all  ">All</option>
                    <option value="highest">Price - Highest to lowest</option>
                    <option value="lowest">Price - Lowest to highest</option>
                    <option value="newest">Date - Newest to oldest</option>
                    <option value="oldest">Date - Oldest to newest</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div className="filters-container-date relative flex items-center">
                  <label
                    htmlFor="date"
                    className="text-[#667085] bg-[#E1E8F2] icon-box text-[12px] px-2 rounded-md"
                  >
                    By Date
                  </label>

                  <div className="relative w-full">
                    <DatePicker
                      selected={date}
                      placeholderText="Select Date"
                      onChange={(date) => {
                        setDate(date);
                        setIsDatePickerOpen(false); // Force close after selection
                      }}
                      onClickOutside={() => setIsDatePickerOpen(false)}
                      open={isDatePickerOpen}
                      onInputClick={() => setIsDatePickerOpen(true)}
                      shouldCloseOnSelect={true}
                      dateFormat="dd-MM-yyyy"
                      className="icon-box text-[#BCC0C9] text-[14px] w-full pr-8"
                    />

                    {date && (
                      <button
                        onClick={() => setDate(null)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BCC0C9] hover:text-gray-600"
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                </div>
                {/* Search Input */}
                <div className="flex items-center  w-full max-w-sm">
                  <div className="relative w-full px-4 py-4">
                    <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#7C89A5]" />
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-2 border  border-[#DDE4F0]  rounded-md text-[#7C89A5] text-sm focus:outline-[#7539FF]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <table className="min-w-full table-auto">
              <thead className="">
                <tr>
                  <th className="text-left p-4 !font-[600] heading">Expense</th>
                  <th className="text-left p-4 !font-[600] heading">
                    Total Expenditure
                  </th>
                  <th className="text-left p-4 !font-[600] heading flex justify-center">
                    Price (PKR)
                  </th>
                  <th className="text-left p-4 !font-[600] heading">Date</th>
                  <th className="text-center p-4 !font-[600] heading">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {expensesData.map((expense) => (
                  <tr key={expense._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 heading">{expense.title}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded h-2.5">
                          <div
                            className="bg-[#7539FF] h-2.5 rounded"
                            style={{
                              width: `${Math.floor(
                                (expense.price / (totalExpenditure() ?? 1)) *
                                  100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-gray-600">
                          {Math.ceil(
                            (expense.price / (totalExpenditure() ?? 1)) * 100
                          )}
                          %
                        </span>
                      </div>
                    </td>
                    <td className="p-4 heading flex justify-center">
                      {expense.price.toLocaleString()}
                    </td>
                    <td className="p-4 heading">
                      {new Date(expense.date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="p-4 flex justify-center space-x-4">
                      <button
                        className="text-red-500"
                        onClick={() => {
                          setSelectedExpense(expense);
                          openModal("Delete");
                        }}
                      >
                        <img
                          style={{ width: "15px", height: "17px" }}
                          src={DeleteIcon}
                          alt="delete"
                        />
                      </button>
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          setSelectedExpense(expense);
                          openModal("Edit");
                        }}
                      >
                        <img
                          style={{ width: "15px", height: "17px" }}
                          src={EditIcon}
                          alt="edit"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {expensesData.length >= 1 ? (
              <div className="p-4 flex justify-between items-center border-t bg-gray-50">
                <span className="text-sm text-gray-600">Showing 7 / 235</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded bg-[#7539FF] text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded bg-gray-200">2</button>
                  <button className="px-3 py-1 rounded bg-gray-200">3</button>
                  <span className="px-3 py-1">...</span>
                  <button className="px-3 py-1 rounded bg-gray-200">10</button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex justify-center  items-center border-t bg-gray-50">
                <span className="text-sm text-gray-600">No Expenses found</span>
              </div>
            )}
          </div>
        </div>

        {modalType && (
          <AddExpenseModal
            open={!!modalType} // Ensures modal is open when modalType is not null
            handleClose={handleClose}
            selectedExpense={selectedExpense}
            modalType={`${modalType} Expense`}
            handleAdd={modalType === "Add" ? handleAdd : undefined}
            handleEdit={modalType === "Edit" ? handleEdit : undefined}
            handleDelete={modalType === "Delete" ? handleDelete : undefined}
          />
        )}
      </Box>
    </Box>
  );
};

export default Expenses;
