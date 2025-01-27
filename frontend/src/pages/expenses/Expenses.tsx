import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const Expenses = () => {
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
      expenditure: 50,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 3,
      name: "Prestigious Clientele Segment",
      expenditure: 50,
      price: 25000,
      date: "22 Jan 2022",
    },
    {
      id: 4,
      name: "Prestigious Clientele Segment",
      expenditure: 50,
      price: 25000,
      date: "22 Jan 2022",
    },
    // Add more expense objects here
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Add Expenses
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Expense</th>
              <th className="text-left p-4">Total Expenditure</th>
              <th className="text-left p-4">Price (PKR)</th>
              <th className="text-left p-4">Date</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense) => (
              <tr key={expense.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{expense.name}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded"
                        style={{ width: `${expense.expenditure}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-600">
                      {expense.expenditure}%
                    </span>
                  </div>
                </td>
                <td className="p-4">{expense.price.toLocaleString()}</td>
                <td className="p-4">{expense.date}</td>
                <td className="p-4 flex justify-center space-x-4">
                  <button className="text-blue-500">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-500">
                    <AiFillDelete size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 flex justify-between items-center border-t bg-gray-50">
          <span className="text-sm text-gray-600">Showing 8 / 235</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded bg-purple-500 text-white">
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
  );
};

export default Expenses;
