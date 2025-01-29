import { useState } from "react";
import DeleteIcon from "../../assets/delete-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import { FaSearch } from "react-icons/fa";
import AddExpenseModal from "../../components/Modal/AddExpenseModal";

const Expenses = () => {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false);

  const expensesData = [
    {
      id: 1,
      name: "Prestigious Clientele Segment",
      expenditure: 50,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 2,
      name: "Prestigious Clientele Segment",
      expenditure: 30,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 3,
      name: "Prestigious Clientele Segment",
      expenditure: 10,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 4,
      name: "Prestigious Clientele Segment",
      expenditure: 80,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 5,
      name: "Prestigious Clientele Segment",
      expenditure: 50,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 6,
      name: "Prestigious Clientele Segment",
      expenditure: 30,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 7,
      name: "Prestigious Clientele Segment",
      expenditure: 10,
      price: 25000,
      date: "22 Jan 2022",
    },
  ];
  const handleClose = () => {
    setOpenAddExpenseModal(false);
    setOpenEditExpenseModal(false);
    setOpenDeleteExpenseModal(false);
  };

  return (
    <>
      <div className="p-4 bg-[#EFF4FB] min-h-[92vh]">
        <div className="flex justify-between items-center mb-6 border-b border-gray-300">
          <h1 className="text-[32px] font-[600] leading-[48px] mb-2">
            Expenses
          </h1>
          <button
            onClick={() => setOpenAddExpenseModal(true)}
            className="bg-[#7539FF] text-white px-4 py-2  mb-2 rounded-md"
          >
            Add Expenses
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
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
                  className="icon-box text-[#BCC0C9] focus:outline-[#7539FF]"
                >
                  <option value="all  ">All</option>
                  <option value="highest">Highest Expense</option>
                  <option value="lowest">Lowest Expense</option>
                </select>
              </div>

              {/* Date Picker */}
              <div className="filters-container-date">
                <label
                  htmlFor="date"
                  className="text-[#667085] bg-[#E1E8F2] icon-box text-[12px]"
                >
                  By Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="icon-box text-[#BCC0C9] text-[14px] "
                />
              </div>

              {/* Search Input */}
              <div className="flex items-center  w-full max-w-sm">
                <div className="relative w-full px-4 py-4">
                  <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#7C89A5]" />
                  <input
                    type="text"
                    placeholder="Search"
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
                <th className="text-center p-4 !font-[600] heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 heading">{expense.name}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded h-2.5">
                        <div
                          className="bg-[#7539FF] h-2.5 rounded"
                          style={{ width: `${expense.expenditure}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-gray-600">
                        {expense.expenditure}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4 heading flex justify-center">
                    {expense.price.toLocaleString()}
                  </td>
                  <td className="p-4 heading">{expense.date}</td>
                  <td className="p-4 flex justify-center space-x-4">
                    <button
                      className="text-red-500"
                      onClick={() => setOpenDeleteExpenseModal(true)}
                    >
                      <img
                        style={{ width: "15px", height: "17px" }}
                        src={DeleteIcon}
                        alt="delete"
                      />
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => setOpenEditExpenseModal(true)}
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
        </div>
      </div>

      {openAddExpenseModal && (
        <AddExpenseModal
          open={openAddExpenseModal}
          handleClose={handleClose}
          modalType="Add Expense"
        />
      )}
      {openDeleteExpenseModal && (
        <AddExpenseModal
          open={openDeleteExpenseModal}
          handleClose={handleClose}
          modalType="Delete Expense"
        />
      )}
      {openEditExpenseModal && (
        <AddExpenseModal
          open={openEditExpenseModal}
          handleClose={handleClose}
          modalType="Edit Expense"
        />
      )}
    </>
  );
};

export default Expenses;
