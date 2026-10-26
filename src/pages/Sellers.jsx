
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const initialSellers = [
    {
        id: 1,
        name: "Ali Valiyev",
        email: "ali@example.com",
        shop: "Ali Fashion",
        phone: "+998 90 123 45 67",
        products: 24,
        status: "Active",
    },
    {
        id: 2,
        name: "Madina Karimova",
        email: "madina@example.com",
        shop: "Moda Store",
        phone: "+998 91 234 56 78",
        products: 18,
        status: "Active",
    },
    {
        id: 3,
        name: "Jasur Ahmedov",
        email: "jasur@example.com",
        shop: "Tech Market",
        phone: "+998 93 345 67 89",
        products: 32,
        status: "Blocked",
    },
    {
        id: 4,
        name: "Dilnoza Sobirova",
        email: "dilnoza@example.com",
        shop: "Beauty House",
        phone: "+998 94 456 78 90",
        products: 15,
        status: "Active",
    },
];

const emptyForm = {
    name: "",
    email: "",
    shop: "",
    phone: "",
    products: "0",
    status: "Active",
};

function Sellers() {
    const { dark } = useTheme();

    const [sellers, setSellers] = useState(initialSellers);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingSeller, setEditingSeller] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });

    const inputClass = `w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 ${
        dark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-300 bg-white text-gray-900"
    }`;

    const labelClass = `mb-1 block text-sm font-medium ${
        dark ? "text-gray-200" : "text-gray-700"
    }`;

    const mutedText = dark ? "text-gray-400" : "text-gray-500";

    const cardClass = `rounded-lg border p-5 ${
        dark
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
    }`;

    const modalClass = `w-full max-w-md rounded-xl p-6 shadow-xl ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`;

    const secondaryButton = `rounded-md border px-4 py-2 text-sm transition ${
        dark
            ? "border-gray-700 text-gray-200 hover:bg-gray-800"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
    }`;

    const filteredSellers = sellers.filter((seller) => {
        const query = search.toLowerCase().trim();

        const matchesSearch =
            seller.name.toLowerCase().includes(query) ||
            seller.email.toLowerCase().includes(query) ||
            seller.shop.toLowerCase().includes(query);

        const matchesStatus =
            statusFilter === "All" || seller.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function openCreateForm() {
        setEditingSeller(null);
        setForm({ ...emptyForm });
        setShowForm(true);
        setSelectedSeller(null);
    }

    function openEditForm(seller) {
        setEditingSeller(seller);

        setForm({
            name: seller.name,
            email: seller.email,
            shop: seller.shop,
            phone: seller.phone,
            products: String(seller.products),
            status: seller.status,
        });

        setSelectedSeller(null);
        setShowForm(true);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const sellerData = {
            name: form.name.trim(),
            email: form.email.trim(),
            shop: form.shop.trim(),
            phone: form.phone.trim(),
            products: Math.max(0, Number(form.products) || 0),
            status: form.status,
        };

        if (
            !sellerData.name ||
            !sellerData.email ||
            !sellerData.shop ||
            !sellerData.phone
        ) {
            alert("Barcha maydonlarni to‘ldiring.");
            return;
        }

        if (editingSeller) {
            setSellers((prev) =>
                prev.map((seller) =>
                    seller.id === editingSeller.id
                        ? { ...seller, ...sellerData }
                        : seller
                )
            );

            if (selectedSeller?.id === editingSeller.id) {
                setSelectedSeller({
                    ...editingSeller,
                    ...sellerData,
                });
            }
        } else {
            setSellers((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    ...sellerData,
                },
            ]);
        }

        setShowForm(false);
        setEditingSeller(null);
        setForm({ ...emptyForm });
    }

    function deleteSeller(seller) {
        const confirmed = window.confirm(
            `${seller.name} sotuvchisini o‘chirmoqchimisiz?`
        );

        if (!confirmed) return;

        setSellers((prev) =>
            prev.filter((item) => item.id !== seller.id)
        );

        if (selectedSeller?.id === seller.id) {
            setSelectedSeller(null);
        }
    }

    function toggleStatus(seller) {
        const newStatus =
            seller.status === "Active" ? "Blocked" : "Active";

        setSellers((prev) =>
            prev.map((item) =>
                item.id === seller.id
                    ? { ...item, status: newStatus }
                    : item
            )
        );

        setSelectedSeller((prev) =>
            prev?.id === seller.id
                ? { ...prev, status: newStatus }
                : prev
        );
    }

    const statusStyle = {
        Active: "bg-green-100 text-green-700",
        Blocked: "bg-red-100 text-red-600",
    };

    return (
        <div
            className={`min-h-screen p-4 transition-colors duration-300 sm:p-6 ${
                dark
                    ? "bg-gray-950 text-white"
                    : "bg-gray-300 text-gray-900"
            }`}
        >
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Sellers</h1>

                    <p className={`mt-1 text-sm ${mutedText}`}>
                        Manage your marketplace sellers
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    + Add Seller
                </button>
            </div>

            {/* Statistics */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className={cardClass}>
                    <p className={`text-sm ${mutedText}`}>Total Sellers</p>
                    <h2 className="mt-2 text-2xl font-bold">
                        {sellers.length}
                    </h2>
                </div>

                <div className={cardClass}>
                    <p className={`text-sm ${mutedText}`}>Active Sellers</p>
                    <h2 className="mt-2 text-2xl font-bold text-green-500">
                        {sellers.filter((s) => s.status === "Active").length}
                    </h2>
                </div>

                <div className={cardClass}>
                    <p className={`text-sm ${mutedText}`}>Blocked Sellers</p>
                    <h2 className="mt-2 text-2xl font-bold text-red-500">
                        {sellers.filter((s) => s.status === "Blocked").length}
                    </h2>
                </div>
            </div>

            {/* Sellers table */}
            <div
                className={`overflow-hidden rounded-lg border shadow-sm ${
                    dark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                }`}
            >
                {/* Search and filter */}
                <div
                    className={`flex flex-wrap items-center justify-between gap-3 border-b p-4 ${
                        dark ? "border-gray-800" : "border-gray-200"
                    }`}
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search sellers..."
                        className={`sm:w-64 ${inputClass}`}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={inputClass + " sm:w-auto"}
                    >
                        <option value="All">All statuses</option>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left text-sm">
                        <thead
                            className={`text-xs uppercase ${
                                dark
                                    ? "bg-gray-800 text-gray-400"
                                    : "bg-gray-50 text-gray-500"
                            }`}
                        >
                            <tr>
                                <th className="px-4 py-4">Seller</th>
                                <th className="px-4 py-4">Shop</th>
                                <th className="px-4 py-4">Phone</th>
                                <th className="px-4 py-4">Products</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody
                            className={`divide-y ${
                                dark ? "divide-gray-800" : "divide-gray-100"
                            }`}
                        >
                            {filteredSellers.map((seller) => (
                                <tr
                                    key={seller.id}
                                    className={`transition ${
                                        dark
                                            ? "hover:bg-gray-800"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <td className="px-4 py-4">
                                        <p className="font-medium">
                                            {seller.name}
                                        </p>
                                        <p className={`mt-1 text-xs ${mutedText}`}>
                                            {seller.email}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4">
                                        {seller.shop}
                                    </td>

                                    <td className={`px-4 py-4 ${mutedText}`}>
                                        {seller.phone}
                                    </td>

                                    <td className="px-4 py-4">
                                        {seller.products}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[seller.status]}`}
                                        >
                                            {seller.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedSeller(seller)}
                                                className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                                                    dark
                                                        ? "border-gray-700 hover:bg-gray-700"
                                                        : "border-gray-200 hover:bg-gray-100"
                                                }`}
                                            >
                                                View
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => openEditForm(seller)}
                                                className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                                                    dark
                                                        ? "border-blue-900 text-blue-400 hover:bg-gray-800"
                                                        : "border-blue-200 text-blue-600 hover:bg-blue-50"
                                                }`}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteSeller(seller)}
                                                className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                                                    dark
                                                        ? "border-red-900 text-red-400 hover:bg-gray-800"
                                                        : "border-red-200 text-red-600 hover:bg-red-50"
                                                }`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredSellers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className={`px-4 py-12 text-center ${mutedText}`}
                                    >
                                        Sellers not found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div
                    className={`border-t px-4 py-3 text-sm ${mutedText} ${
                        dark ? "border-gray-800" : "border-gray-200"
                    }`}
                >
                    Showing {filteredSellers.length} of {sellers.length} sellers
                </div>
            </div>

            {/* View seller modal */}
            {selectedSeller && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedSeller(null);
                        }
                    }}
                >
                    <div className={modalClass}>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Seller Details
                            </h2>

                            <button
                                type="button"
                                onClick={() => setSelectedSeller(null)}
                                className={`rounded-md px-3 py-1 text-xl ${
                                    dark
                                        ? "text-gray-300 hover:bg-gray-800"
                                        : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <p><strong>Name:</strong> {selectedSeller.name}</p>
                            <p><strong>Email:</strong> {selectedSeller.email}</p>
                            <p><strong>Shop:</strong> {selectedSeller.shop}</p>
                            <p><strong>Phone:</strong> {selectedSeller.phone}</p>
                            <p><strong>Products:</strong> {selectedSeller.products}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`rounded-full px-3 py-1 text-xs ${statusStyle[selectedSeller.status]}`}>
                                    {selectedSeller.status}
                                </span>
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => openEditForm(selectedSeller)}
                                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                Edit Seller
                            </button>

                            <button
                                type="button"
                                onClick={() => toggleStatus(selectedSeller)}
                                className={`flex-1 ${secondaryButton}`}
                            >
                                {selectedSeller.status === "Active"
                                    ? "Block Seller"
                                    : "Activate Seller"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add / Edit seller modal */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowForm(false);
                        }
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        className={`${modalClass} my-auto`}
                    >
                        <h2 className="mb-5 text-xl font-bold">
                            {editingSeller ? "Edit Seller" : "Add Seller"}
                        </h2>

                        <div className="space-y-4">
                            {[
                                { key: "name", label: "Full name", type: "text" },
                                { key: "email", label: "Email", type: "email" },
                                { key: "shop", label: "Shop name", type: "text" },
                                { key: "phone", label: "Phone", type: "tel" },
                                {
                                    key: "products",
                                    label: "Number of products",
                                    type: "number",
                                },
                            ].map((field) => (
                                <div key={field.key}>
                                    <label className={labelClass}>
                                        {field.label}
                                    </label>

                                    <input
                                        required
                                        min={field.type === "number" ? "0" : undefined}
                                        step={field.type === "number" ? "1" : undefined}
                                        type={field.type}
                                        value={form[field.key]}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                [field.key]: e.target.value,
                                            }))
                                        }
                                        className={inputClass}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className={labelClass}>Status</label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            status: e.target.value,
                                        }))
                                    }
                                    className={inputClass}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className={`flex-1 ${secondaryButton}`}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                {editingSeller ? "Save changes" : "Add seller"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Sellers;
