import {
  useGetExpenseByCategoryQuery,
  useGetExpenseQuery,
} from "../../redux/api/expenseApi";
import { ExpenseType } from "../../types/type";
import { TbSettings } from "react-icons/tb";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses } from "../../redux/services/expenseSlice";
import { RootState } from "../../redux/store";
import {
  defaultTableBody,
  defaultTableHead,
} from "../../constant/defaultStyle";

const ExpenseTable = () => {
  const [activePage, setActivePage] = useState(1);
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetExpenseQuery(activePage);
  const totalCount = data?.totalCount || 0;
  const expensesPerPage = data?.totalExpense || 0;
  const totalPages = Math.ceil(totalCount / expensesPerPage);
  const expenses = useSelector((state: RootState) => state.expense.expenses);

  useEffect(() => {
    dispatch(addExpenses(data?.expenses));
  }, [data]);

  const handleNextPage = () => {
    setActivePage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading && isFetching) {
    return (
      <p className="flex justify-center items-center h-screen">loading....</p>
    );
  }

  return (
    <div className="flex flex-col relative max-h-full h-full">
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="overflow-hidden sm:overflow-x-auto rounded-lg scrollbar-thin scroll-smooth overflow-y-auto h-[35rem]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={defaultTableHead}>#</th>
                <th className={defaultTableHead}>Date</th>
                <th className={defaultTableHead}>Title</th>
                <th className={defaultTableHead}>Category</th>
                <th className={`${defaultTableHead} text-right`}>Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses?.map((expense: ExpenseType, index) => (
                <tr key={expense._id}>
                  <td className={`${defaultTableBody} font-medium`}>
                    {(activePage - 1) * expensesPerPage + index + 1}
                  </td>
                  <td className={defaultTableBody}>{expense.date}</td>
                  <td className={defaultTableBody}>
                    {expense.title || "defaults"}
                  </td>
                  <td className={defaultTableBody}>{expense.category}</td>
                  <td className={`${defaultTableBody} text-right font-medium`}>
                    {expense.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center my-5">
            <h2 className="font-semibold flex gap-1 items-center select-none ">
              Total Count:
              {view ? (
                totalCount
              ) : (
                <p
                  className="text-[#408dfb] cursor-pointer"
                  onClick={() => setView(true)}
                >
                  view
                </p>
              )}
            </h2>
            <div className="flex border border-gray-300 rounded mr-5 justify-center items-center h-9 w-52">
              <div className="flex justify-center items-center gap-1 bg-gray-200 h-full w-28 cursor-pointer hover:text-blue-500 transition-all duration-150">
                <TbSettings />
                <small className="select-none">10 per pages</small>
              </div>
              <div className="flex justify-center items-center gap-2 w-24">
                <MdKeyboardArrowLeft
                  onClick={handlePrevPage}
                  className={`cursor-pointer text-[#408dfb] text-xl font-bold ${
                    activePage === 1 && "text-gray-400 cursor-default"
                  }`}
                />
                <p
                  className={`select-none ${
                    isFetching && "custom-loader"
                  } text-sm`}
                >
                  {activePage}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={activePage >= totalPages}
                  className="cursor-pointer focus:outline-none"
                >
                  <MdKeyboardArrowRight
                    className={`text-[#408dfb] text-xl font-bold ${
                      activePage >= totalPages && "text-gray-400 cursor-default"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;
