
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ProductList({ products, setProducts }) {
    const { dark } = useTheme();

    const [activeMenu, setActiveMenu] = useState(null);
    const [editProduct, setEditProduct] = useState(null);

    const menuRef = useRef(null);

    const inputClass = `mb-4 w-full rounded-lg border p-2 outline-none transition focus:border-blue-500 ${
        dark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-300 bg-white text-gray-900"
    }`;

    const labelClass = `mb-1 block text-sm font-medium ${
        dark ? "text-gray-200" : "text-gray-700"
    }`;

    // Menyudan tashqariga bosilganda yopish
    useEffect(() => {
        function handleOutsideClick(e) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setActiveMenu(null);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    // Mahsulotni o'chirish
    function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?"
        );

        if (!confirmDelete) return;

        setProducts((prev) =>
            prev.filter((product) => product.id !== id)
        );

        setActiveMenu(null);
    }

    // Mahsulotni tahrirlash va saqlash
    function handleEditSubmit(e) {
        e.preventDefault();

        const updatedProduct = {
            ...editProduct,
            price: Number(editProduct.price),
            stock: Number(editProduct.stock),
        };

        setProducts((prev) =>
            prev.map((product) =>
                product.id === updatedProduct.id
                    ? updatedProduct
                    : product
            )
        );

        setEditProduct(null);
    }

    return (
        <div
            className={`min-h-screen box-border p-6 transition-colors duration-300 ${dark
                    ? "bg-gray-950 text-white"
                    : "bg-gray-300 text-gray-900"
                }`}
        >
            <div className="mx-auto mb-6 max-w-[1200px]">
                <h1 className="text-2xl font-bold">
                    Product List
                </h1>

                <p
                    className={`mt-1 text-sm ${dark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Barcha mahsulotlaringizni boshqaring.
                </p>
            </div>

            {/* Mahsulotlar */}
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`grid grid-cols-2 items-center gap-x-4 gap-y-3 rounded-xl border p-4 shadow-sm transition sm:grid-cols-[minmax(0,1.8fr)_minmax(80px,0.8fr)_minmax(75px,0.7fr)_minmax(100px,1fr)_minmax(100px,1fr)_40px] ${dark
                                ? "border-gray-700 bg-gray-900 hover:border-gray-600"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                    >
                        {/* Mahsulot */}
                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold sm:text-base">
                                {product.name}
                            </h2>

                            {product.description && (
                                <p
                                    className={`mt-1 truncate text-xs ${dark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    {product.description}
                                </p>
                            )}
                        </div>

                        {/* Narx */}
                        <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:hidden">Price</p>
                            <p className="truncate text-sm font-bold text-blue-500 sm:text-base">
                                ${Number(product.price).toLocaleString()}
                            </p>
                        </div>

                        {/* Stock */}
                        <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:hidden">Stock</p>
                            <span
                                className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${Number(product.stock) > 0
                                        ? dark
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-emerald-50 text-emerald-700"
                                        : dark
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-red-50 text-red-600"
                                    }`}
                            >
                                {product.stock}
                            </span>
                        </div>

                        {/* Sana */}
                        <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:hidden">Date</p>
                            <p
                                className={`truncate text-sm ${dark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                {product.createdAt || "—"}
                            </p>
                        </div>

                        {/* Kategoriya */}
                        <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:hidden">Category</p>
                            <p
                                className={`truncate text-sm ${dark ? "text-gray-300" : "text-gray-600"
                                    }`}
                            >
                                {product.category || "—"}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="relative flex justify-end">
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveMenu(activeMenu === product.id ? null : product.id)
                                }
                                className={`rounded-lg p-2 transition ${dark
                                        ? "text-gray-300 hover:bg-gray-800"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }`}
                                aria-label="Product actions"
                            >
                                <MoreVertical size={20} />
                            </button>

                            {activeMenu === product.id && (
                                <div
                                    ref={menuRef}
                                    className={`absolute right-0 top-full z-20 mt-1 w-36 rounded-lg border py-1 shadow-xl ${dark
                                            ? "border-gray-700 bg-gray-900"
                                            : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditProduct({ ...product });
                                            setActiveMenu(null);
                                        }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${dark
                                                ? "text-gray-200 hover:bg-gray-800"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <Pencil size={16} />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(product.id)}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${dark
                                                ? "text-red-400 hover:bg-gray-800"
                                                : "text-red-600 hover:bg-red-50"
                                            }`}
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mahsulot mavjud bo'lmaganda */}
            {products.length === 0 && (
                <p
                    className={`mt-8 text-center ${dark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Hozircha mahsulotlar mavjud emas.
                </p>
            )}

            {/* Edit modal */}
            {editProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setEditProduct(null);
                        }
                    }}
                >
                    <form
                        onSubmit={handleEditSubmit}
                        className={`my-auto w-full max-w-md rounded-xl p-6 shadow-xl ${dark
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-900"
                            }`}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Edit Product
                            </h2>

                            <button
                                type="button"
                                onClick={() => setEditProduct(null)}
                                className={`rounded-lg p-2 transition ${dark
                                        ? "text-gray-300 hover:bg-gray-800"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }`}
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Name */}
                        <label className={labelClass}>
                            Product Name
                        </label>

                        <input
                            required
                            value={editProduct.name}
                            onChange={(e) =>
                                setEditProduct((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className={inputClass}
                        />

                        {/* Price */}
                        <label className={labelClass}>
                            Price ($)
                        </label>

                        <input
                            required
                            type="number"
                            min="0.01"
                            step="any"
                            value={editProduct.price}
                            onChange={(e) =>
                                setEditProduct((prev) => ({
                                    ...prev,
                                    price: e.target.value,
                                }))
                            }
                            className={inputClass}
                        />

                        {/* Stock */}
                        <label className={labelClass}>
                            Stock
                        </label>

                        <input
                            required
                            type="number"
                            min="0"
                            step="1"
                            value={editProduct.stock}
                            onChange={(e) =>
                                setEditProduct((prev) => ({
                                    ...prev,
                                    stock: e.target.value,
                                }))
                            }
                            className={inputClass}
                        />

                        {/* Category */}
                        <label className={labelClass}>
                            Category
                        </label>

                        <select
                            required
                            value={editProduct.category}
                            onChange={(e) =>
                                setEditProduct((prev) => ({
                                    ...prev,
                                    category: e.target.value,
                                }))
                            }
                            className={inputClass}
                        >
                            <option value="">
                                Select category
                            </option>

                            <option value="Electronics">
                                Electronics
                            </option>

                            <option value="Clothes">
                                Clothes
                            </option>

                            <option value="Accessories">
                                Accessories
                            </option>
                        </select>

                        {/* Modal buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setEditProduct(null)}
                                className={`rounded-lg border px-4 py-2 transition ${dark
                                        ? "border-gray-700 hover:bg-gray-800"
                                        : "border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProductList;
