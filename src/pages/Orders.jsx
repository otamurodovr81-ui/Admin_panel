
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const initialOrders = [
    { id: "0901", name: "Marvin McKinney", email: "marvin@example.com", total: 9.0, status: "Pending", date: "2020-12-03" },
    { id: "2323", name: "Leslie Alexander", email: "leslie@example.com", total: 46.61, status: "Pending", date: "2020-02-21" },
    { id: "1233", name: "Esther Howard", email: "esther@example.com", total: 12.0, status: "Canceled", date: "2020-07-03" },
    { id: "2324", name: "Jenny Wilson", email: "jenny@example.com", total: 589.99, status: "Received", date: "2020-05-22" },
    { id: "2112", name: "Marvin McKinney", email: "marvin@example.com", total: 16.58, status: "Received", date: "2020-04-23" },
    { id: "7897", name: "Albert Flores", email: "albert@example.com", total: 10.0, status: "Received", date: "2020-03-13" },
    { id: "2325", name: "Wade Warren", email: "wade@example.com", total: 105.55, status: "Received", date: "2019-09-23" },
    { id: "2326", name: "Jane Cooper", email: "jane@example.com", total: 710.68, status: "Received", date: "2020-04-28" },
    { id: "2327", name: "Savannah Nguyen", email: "savannah@example.com", total: 710.68, status: "Received", date: "2020-03-23" },
    { id: "2328", name: "Guy Hawkins", email: "guy@example.com", total: 767.5, status: "Received", date: "2020-04-28" },
    { id: "2329", name: "Darrell Steward", email: "darrell@example.com", total: 406.27, status: "Received", date: "2020-07-14" },
    { id: "2330", name: "Jane Cooper", email: "jane2@example.com", total: 601.13, status: "Received", date: "2020-03-18" },
    { id: "2331", name: "Darlene Robertson", email: "darlene@example.com", total: 948.55, status: "Received", date: "2020-07-03" },
];

const emptyForm = {
    name: "",
    email: "",
    total: "",
    status: "Pending",
};

function Orders() {
    const { dark } = useTheme();

    const [orders, setOrders] = useState(initialOrders);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [limit, setLimit] = useState("20");
    const [sortDate, setSortDate] = useState("newest");
    const [activeMenu, setActiveMenu] = useState(null);
    const [viewOrder, setViewOrder] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const inputClass = `rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 ${
        dark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-300 bg-white text-gray-900"
    }`;

    const mutedText = dark ? "text-gray-400" : "text-gray-500";

    const statusStyles = {
        Pending: "bg-orange-100 text-orange-700",
        Canceled: "bg-red-100 text-red-600",
        Received: "bg-green-100 text-green-700",
    };

    const filteredOrders = orders
        .filter((order) => {
            const query = search.toLowerCase().trim();

            const matchesSearch =
                order.name.toLowerCase().includes(query) ||
                order.email.toLowerCase().includes(query) ||
                order.id.toLowerCase().includes(query);

            const matchesStatus =
                status === "All" || order.status === status;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) =>
            sortDate === "newest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        )
        .slice(0, Number(limit));

    function openCreateForm() {
        setEditingOrder(null);
        setForm({ ...emptyForm });
        setShowCreate(true);
        setActiveMenu(null);
    }

    function openEditForm(order) {
        setEditingOrder(order);
        setForm({
            name: order.name,
            email: order.email,
            total: String(order.total),
            status: order.status,
        });
        setActiveMenu(null);
        setShowCreate(true);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            form.total === "" ||
            !Number.isFinite(Number(form.total)) ||
            Number(form.total) < 0
        ) {
            alert("Barcha maydonlarni to‘g‘ri to‘ldiring.");
            return;
        }

        if (editingOrder) {
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === editingOrder.id
                        ? {
                              ...order,
                              name: form.name.trim(),
                              email: form.email.trim(),
                              total: Number(form.total),
                              status: form.status,
                          }
                        : order
                )
            );
        } else {
            const newOrder = {
                id: String(Date.now()),
                name: form.name.trim(),
                email: form.email.trim(),
                total: Number(form.total),
                status: form.status,
                date: new Date().toISOString().slice(0, 10),
            };

            setOrders((prev) => [newOrder, ...prev]);
        }

        setShowCreate(false);
        setEditingOrder(null);
        setForm({ ...emptyForm });
    }

    function deleteOrder(order) {
        const confirmed = window.confirm(
            `${order.name} buyurtmasini o‘chirmoqchimisiz?`
        );

        if (!confirmed) return;

        setOrders((prev) =>
            prev.filter((item) => item.id !== order.id)
        );

        if (viewOrder?.id === order.id) {
            setViewOrder(null);
        }

        setActiveMenu(null);
    }

    const modalClass = `w-full max-w-md rounded-xl p-6 shadow-xl ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`;

    const labelClass = `mb-1 block text-sm font-medium ${
        dark ? "text-gray-200" : "text-gray-700"
    }`;

    const secondaryButton = `rounded-md border px-4 py-2 text-sm transition ${
        dark
            ? "border-gray-700 text-gray-200 hover:bg-gray-800"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
    }`;

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
                <h1 className="text-2xl font-bold">Orders</h1>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    + Create new
                </button>
            </div>

            {/* Orders table */}
            <div
                className={`overflow-hidden rounded-lg border shadow-sm ${
                    dark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                }`}
            >
                {/* Filters */}
                <div
                    className={`flex flex-wrap items-center justify-between gap-3 border-b p-4 ${
                        dark ? "border-gray-800" : "border-gray-200"
                    }`}
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search orders..."
                        className={`w-full sm:w-64 ${inputClass}`}
                    />

                    <div className="flex flex-wrap gap-2">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={inputClass}
                        >
                            <option value="All">All status</option>
                            <option value="Pending">Pending</option>
                            <option value="Received">Received</option>
                            <option value="Canceled">Canceled</option>
                        </select>

                        <select
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            className={inputClass}
                        >
                            <option value="5">Show 5</option>
                            <option value="10">Show 10</option>
                            <option value="20">Show 20</option>
                        </select>

                        <button
                            type="button"
                            onClick={() =>
                                setSortDate((prev) =>
                                    prev === "newest" ? "oldest" : "newest"
                                )
                            }
                            className={secondaryButton}
                        >
                            Date {sortDate === "newest" ? "↓" : "↑"}
                        </button>
                    </div>
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
                                <th className="px-4 py-4">ID</th>
                                <th className="px-4 py-4">Name</th>
                                <th className="px-4 py-4">Email</th>
                                <th className="px-4 py-4">Total</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Date</th>
                                <th className="px-4 py-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody
                            className={`divide-y ${
                                dark ? "divide-gray-800" : "divide-gray-100"
                            }`}
                        >
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`transition ${
                                        dark
                                            ? "hover:bg-gray-800"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <td className="whitespace-nowrap px-4 py-4 font-medium">
                                        #{order.id.slice(-4)}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 font-medium">
                                        {order.name}
                                    </td>

                                    <td className={`whitespace-nowrap px-4 py-4 ${mutedText}`}>
                                        {order.email}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 font-medium">
                                        ${order.total.toFixed(2)}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className={`whitespace-nowrap px-4 py-4 ${mutedText}`}>
                                        {order.date}
                                    </td>

                                    <td className="px-4 py-4 text-center">
                                        <div className="relative inline-block">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveMenu((prev) =>
                                                        prev === order.id
                                                            ? null
                                                            : order.id
                                                    )
                                                }
                                                className={`rounded-md px-3 py-1 text-lg transition ${
                                                    dark
                                                        ? "text-gray-300 hover:bg-gray-700"
                                                        : "text-gray-500 hover:bg-gray-100"
                                                }`}
                                                aria-label={`Actions for order ${order.id}`}
                                            >
                                                •••
                                            </button>

                                            {activeMenu === order.id && (
                                                <div
                                                    className={`absolute right-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-md border py-1 text-left shadow-lg ${
                                                        dark
                                                            ? "border-gray-700 bg-gray-900"
                                                            : "border-gray-200 bg-white"
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setViewOrder(order);
                                                            setActiveMenu(null);
                                                        }}
                                                        className={`block w-full px-4 py-2 text-sm ${
                                                            dark
                                                                ? "hover:bg-gray-800"
                                                                : "text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => openEditForm(order)}
                                                        className={`block w-full px-4 py-2 text-sm ${
                                                            dark
                                                                ? "hover:bg-gray-800"
                                                                : "text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => deleteOrder(order)}
                                                        className={`block w-full px-4 py-2 text-sm ${
                                                            dark
                                                                ? "text-red-400 hover:bg-gray-800"
                                                                : "text-red-600 hover:bg-red-50"
                                                        }`}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className={`px-4 py-12 text-center ${mutedText}`}
                                    >
                                        Buyurtmalar topilmadi.
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
                    Jami ko‘rsatilayotgan buyurtmalar: {filteredOrders.length}
                </div>
            </div>

            {/* View order modal */}
            {viewOrder && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setViewOrder(null);
                        }
                    }}
                >
                    <div className={modalClass}>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Order Details</h2>

                            <button
                                type="button"
                                onClick={() => setViewOrder(null)}
                                className={`rounded-md px-3 py-1 text-xl ${
                                    dark
                                        ? "text-gray-300 hover:bg-gray-800"
                                        : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4 text-sm">
                            <p><strong>ID:</strong> #{viewOrder.id.slice(-4)}</p>
                            <p><strong>Name:</strong> {viewOrder.name}</p>
                            <p><strong>Email:</strong> {viewOrder.email}</p>
                            <p><strong>Total:</strong> ${viewOrder.total.toFixed(2)}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`rounded-full px-3 py-1 text-xs ${statusStyles[viewOrder.status]}`}>
                                    {viewOrder.status}
                                </span>
                            </p>
                            <p><strong>Date:</strong> {viewOrder.date}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setViewOrder(null)}
                            className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Create / Edit modal */}
            {showCreate && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowCreate(false);
                        }
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        className={`${modalClass} my-auto`}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                {editingOrder ? "Edit Order" : "Create Order"}
                            </h2>

                            <button
                                type="button"
                                onClick={() => setShowCreate(false)}
                                className={`rounded-md px-3 py-1 text-xl ${
                                    dark
                                        ? "text-gray-300 hover:bg-gray-800"
                                        : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Customer name</label>
                                <input
                                    required
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter customer name"
                                    className={`w-full ${inputClass}`}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Email</label>
                                <input
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    placeholder="customer@example.com"
                                    className={`w-full ${inputClass}`}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Total ($)</label>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.total}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            total: e.target.value,
                                        }))
                                    }
                                    placeholder="0.00"
                                    className={`w-full ${inputClass}`}
                                />
                            </div>

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
                                    className={`w-full ${inputClass}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Received">Received</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowCreate(false)}
                                className={`flex-1 ${secondaryButton}`}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                {editingOrder ? "Save changes" : "Create order"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Orders;
