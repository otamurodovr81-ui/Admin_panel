import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const [openProducts, setOpenProducts] = useState(false);
  const { dark } = useTheme();

  const linkClass = ({ isActive }) =>
    `block w-full rounded-lg px-3 py-2 transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : dark
          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
          : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : dark
          ? "text-gray-300 hover:bg-gray-700"
          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <div
      className={`h-screen w-[280px] shrink-0 border-r px-6 py-4 transition-colors ${
        dark
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <Link to="/Add" className="mb-8 flex items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">
          Admin
        </h1>
      </Link>

      <nav className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setOpenProducts((prev) => !prev)}
          className={`flex w-full items-center  justify-between rounded-lg px-3 py-2 transition-colors ${
            dark
              ? "text-gray-300 bg-gray-800 hover:bg-gray-700"
              : "text-gray-700 bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <span>Products</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              openProducts ? "rotate-180" : ""
            }`}
          />
        </button>

        {openProducts && (
          <div
            className={`ml-4 flex flex-col gap-1 border-l-2 pl-2 ${
              dark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <NavLink to="/Add" className={subLinkClass}>
              Add Product
            </NavLink>

            <NavLink to="/List" className={subLinkClass}>
              Product List
            </NavLink>
          </div>
        )}

        <NavLink to="/Orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/Sellers" className={linkClass}>
          Sellers
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;