import ExpenseTable from "../components/Expense/ExpenseTable";
import useDropdown from "../hooks/useDropdown";
import { useGetCategoryQuery } from "../redux/api/categoryApi";
import { useGetExpenseByCategoryQuery } from "../redux/api/expenseApi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CategoryType } from "../types/type";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpenses } from "../redux/services/expenseSlice";

const Expense = () => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { data } = useGetCategoryQuery();
  const categories = data?.category;
  const dispatch = useDispatch();

  // Call useGetExpenseByCategoryQuery with the category ID
  const { data: expenseCategory } =
    useGetExpenseByCategoryQuery(selectedCategoryId);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    dispatch(addExpenses(expenseCategory?.expenses));
  };
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="mx-10 h-10 flex items-center justify-between">
        <div className="relative inline-block text-center">
          <div>
            <button
              type="button"
              className="inline-flex  mt-1 justify-center items-center w-full text-lg font-medium text-gray-700 outline-none"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={toggleDropdown}
            >
              All Expenses
              <MdOutlineKeyboardArrowDown />
            </button>
          </div>

          {isOpen && (
            <div
              className="origin-top-right z-50 absolute -right-28  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {categories?.map((category: CategoryType) => (
                <div className="py-1" role="none" key={category._id}>
                  <a
                    onClick={() => handleCategorySelect(category._id)}
                    className="block px-4 py-2 text-start  text-sm text-gray-700 hover:bg-[#408dfb] hover:text-white cursor-pointer"
                    role="menuitem"
                  >
                    {category.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <button>New</button>
      </div>
      <ExpenseTable />
    </div>
  );
};

export default Expense;
