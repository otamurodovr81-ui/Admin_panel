
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function AddProduct({ setProducts }) {
    const { dark } = useTheme();
    const navigate = useNavigate();

    const initialProduct = {
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
    };

    const [product, setProduct] = useState(initialProduct);

    // Input qiymatlarini saqlash
    function handleChange(e) {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Mahsulot rasmini tanlash
    function handleImage(e) {
        const file = e.target.files[0];

        if (!file) return;

        setProduct((prev) => ({
            ...prev,
            image: URL.createObjectURL(file),
        }));
    }

    // Mahsulotni saqlash
    function handleSubmit(e) {
        e.preventDefault();

        const newProduct = {
            ...product,
            id: Date.now(),
            price: Number(product.price),
            stock: Number(product.stock),
            createdAt: new Date().toLocaleDateString("uz-UZ"),
        };

        setProducts((prev) => [...prev, newProduct]);

        alert("Mahsulot muvaffaqiyatli qo'shildi!");

        setProduct(initialProduct);
        navigate("/List");
    }

    // Formani tozalash
    function handleReset() {
        setProduct(initialProduct);
    }

    const inputClass = `w-full rounded-lg border px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
        dark
            ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            : "border-gray-300 bg-white text-gray-900"
    }`;

    const labelClass = `mb-2 block text-sm font-medium ${
        dark ? "text-gray-200" : "text-gray-700"
    }`;

    return (
        <div
            className={`min-h-screen p-6 transition-colors duration-300 ${
                dark
                    ? "bg-gray-950 text-white"
                    : "bg-gray-300 text-gray-900"
            }`}
        >
            <div className="mx-auto mb-8 max-w-[700px]">
                <h1 className="text-2xl font-bold">
                    Add Product
                </h1>

                <p
                    className={`mt-1 text-sm ${
                        dark ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                    Yangi mahsulot ma'lumotlarini kiriting.
                </p>
            </div>

            <div
                className={`mx-auto max-w-[700px] rounded-xl p-6 shadow-sm ${
                    dark ? "bg-gray-900" : "bg-white"
                }`}
            >
                <form
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    className="flex flex-col gap-5"
                >
                    {/* Product Name */}
                    <div>
                        <label className={labelClass}>
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                            className={inputClass}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={labelClass}>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            placeholder="Enter product description"
                            className={inputClass}
                        />
                    </div>

                    {/* Price va Stock */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>
                                Price ($)
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                min="0.01"
                                step="any"
                                required
                                placeholder="0.00"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                required
                                placeholder="0"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className={labelClass}>
                            Category
                        </label>

                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        >
                            <option value="" disabled>
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
                    </div>

                    {/* Product Image */}
                    <div>
                        <label className={labelClass}>
                            Product Image
                        </label>

                        <div className="flex flex-wrap items-start gap-4">
                            <label
                                className={`flex h-36 w-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
                                    dark
                                        ? "border-gray-700 bg-gray-800 hover:border-blue-500 hover:bg-gray-700"
                                        : "border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50"
                                }`}
                            >
                                <span className="mb-2 text-3xl text-blue-500">
                                    +
                                </span>

                                <span
                                    className={`text-sm font-semibold ${
                                        dark
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Upload image
                                </span>

                                <span className="mt-1 text-xs text-gray-400">
                                    PNG, JPG
                                </span>

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                            </label>

                            {product.image && (
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt="Product preview"
                                        className="h-36 w-36 rounded-xl border border-gray-300 object-cover shadow-sm"
                                    />

                                    <span className="absolute bottom-2 left-2 rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-green-800">
                                        Preview
                                    </span>
                                </div>
                            )}
                        </div>

                        <p
                            className={`mt-2 text-xs ${
                                dark ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                            Mahsulot rasmini yuklang. PNG, JPG yoki WEBP
                            formatlari tavsiya etiladi.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div
                        className={`flex justify-end gap-3 border-t pt-5 ${
                            dark ? "border-gray-700" : "border-gray-200"
                        }`}
                    >
                        <button
                            type="reset"
                            className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition ${
                                dark
                                    ? "border-gray-700 text-gray-200 hover:bg-gray-800"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;