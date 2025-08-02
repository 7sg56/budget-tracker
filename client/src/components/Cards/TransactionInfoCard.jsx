import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuCar,
  LuHouse,
  LuShoppingCart,
  LuGamepad2,
  LuCreditCard,
  LuDollarSign,
} from "react-icons/lu";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  // Default icons based on category
  const getCategoryIcon = (categoryTitle) => {
    const category = categoryTitle?.toLowerCase();
    if (category?.includes('food') || category?.includes('restaurant') || category?.includes('groceries')) return <LuUtensils />;
    if (category?.includes('transport') || category?.includes('car') || category?.includes('gas')) return <LuCar />;
    if (category?.includes('home') || category?.includes('rent') || category?.includes('utilities')) return <LuHouse />;
    if (category?.includes('shopping') || category?.includes('clothes')) return <LuShoppingCart />;
    if (category?.includes('entertainment') || category?.includes('game')) return <LuGamepad2 />;
    if (category?.includes('income') || category?.includes('salary')) return <LuDollarSign />;
    return <LuCreditCard />;
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          typeof icon === 'string' ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : (
            React.isValidElement(icon) ? icon : getCategoryIcon(title)
          )
        ) : (
          getCategoryIcon(title)
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ₹{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
