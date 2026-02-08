import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatingUser } from "../../API/UsersThunk";

const EditUserModal = ({ onClose, user }) => {

    console.log("EDIT USER ID 👉", user?.id);

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        password: user?.password || "",
        status: user?.status || "active",
        role: user?.role || "user",
    });

    const [errors, setErrors] = useState({});
    const [showEditPassword, setShowEditPassword] = useState(false);

    const dispatch = useDispatch();

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const toggleEditPassword = () => {
        setShowEditPassword(!showEditPassword);
    };

    // Validation
    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim())
            newErrors.fullName = "Full name is required";

        if (!formData.email.trim())
            newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Enter a valid email";

        if (!formData.password.trim())
            newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        if (!formData.role)
            newErrors.role = "Role is required";

        if (!formData.status)
            newErrors.status = "Status is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Updated User Data:", formData);
            dispatch(updatingUser({ id: user.id, updatedUser: formData }))
                .unwrap()
                .then(() => {
                    alert("User Data Updated");

                    setFormData({
                        fullName: "",
                        email: "",
                        password: "",
                        status: "active",
                        role: "user",
                    });
                    setErrors({});
                    onClose();

                }).catch((error) => {
                    alert(error);
                })
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full h-[30rem] overflow-y-auto max-w-lg rounded-xl bg-white shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Edit User
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type={showEditPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        <span
                            onClick={toggleEditPassword}
                            className="absolute top-[2.2rem] right-3 text-[0.85rem] tracking-wide capitalize text-indigo-600 font-[600] cursor-pointer">
                            {showEditPassword ? "Hide" : "Show"}
                        </span>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-sm font-medium">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
