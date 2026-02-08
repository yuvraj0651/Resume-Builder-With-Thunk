import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletingUser, fetchAllUsers } from "../../API/UsersThunk";
import useDebounce from "../../Hooks/useDebounce";
import EditUserModal from "../../UI/Modal/EditUserModal";
import ConfirmPasswordModal from "../../UI/Modal/ConfirmPassModal";
import { fetchResumeByUserId } from "../../API/ResumeThunk";
import ViewResumeModal from "../../UI/Modal/ViewResumeModal";

const Admin = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectCategory, setSelectCategory] = useState("select-category");
    const [editingId, setEditingId] = useState(null);
    const [editUser, setEditUser] = useState(null);

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState(null);

    const [selectedStatus, setSelectedStatus] = useState("select-status");
    const [resumeModalOpen, setResumeModalOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);

    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [draggedOverItemIndex, setDraggedOverItemIndex] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);


    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectCategory]);

    const { usersData } = useSelector((state) => state.users);
    console.log(usersData);

    useEffect(() => {
        if (usersData?.length) {
            setAllUsers(usersData);
        }
    }, [usersData]);

    const { resumeData: resumeContent } = useSelector((state) => state.resumeData);
    console.log("My Resume Content: ", resumeContent);

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const draggedItemHandler = (id) => {
        setDraggedItemIndex(id);
        console.log("Dragged Item Index:", id);
    };

    const draggedOverItemHandler = (id) => {
        setDraggedOverItemIndex(id);
        console.log("Dragged Over Item Index:", id);
    };

    const filteredUsersData = useMemo(() => {
        let filteredUsers = [...allUsers];

        if (debouncedSearch.trim()) {
            filteredUsers = filteredUsers.filter((item) =>
                item.fullName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.email.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        if (selectCategory === "sort-a-z") {
            filteredUsers.sort((a, b) => a.fullName.localeCompare(b.fullName));
        }
        else if (selectCategory === "sort-z-a") {
            filteredUsers.sort((a, b) => b.fullName.localeCompare(a.fullName));
        }

        return filteredUsers;
    }, [debouncedSearch, selectCategory, allUsers]);

    const itemsPerPage = 4;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedUsers = filteredUsersData?.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(filteredUsersData.length / itemsPerPage);
    let pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    const pluralizeText = (count, singular, plural = singular + "s") => {
        return count === 1 ? singular : plural;
    };

    const saveEditData = (user) => {
        setEditingId(user.id);

        setEditFormData({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            role: user.role,
            status: user.status,
        });
    };

    const deleteUserData = (id) => {
        dispatch(deletingUser(id))
            .unwrap()
            .then(() => {
                alert("User Deleted Successfully");
            }).catch((error) => {
                alert(error);
            })
    };

    const viewResume = (userId) => {
        dispatch(fetchResumeByUserId(userId))
            .unwrap()
            .then((resume) => {
                if (!resume) throw new Error("No resume");
                console.log("FETCHED RESUME 👉", resume);
                setSelectedResume(resume);
                setResumeModalOpen(true);
            })
            .catch(() => alert("Resume not found"));
    };

    const draggedOverEnd = () => {
        const draggedItems = [...allUsers];

        const fromIndex = draggedItems.findIndex((item) => item.id === draggedItemIndex);
        const toIndex = draggedItems.findIndex((item) => item.id === draggedOverItemIndex);

        const [movedItem] = draggedItems.splice(fromIndex, 1);
        console.log("Moved Item:", [movedItem]);
        draggedItems.splice(toIndex, 0, movedItem);

        setAllUsers(draggedItems);
        setDraggedItemIndex(null);
        setDraggedOverItemIndex(null);
    };

    const isDragEnabled = selectCategory === "select-category";

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">ResumeCraft-Admin</h1>
                    <p className="text-sm text-gray-500">Manage all registered users</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />

                    <select
                        value={selectCategory}
                        onChange={(e) => setSelectCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
                        <option value="select-category" hidden>Select Category</option>
                        <option value="sort-a-z">Ascending A-Z</option>
                        <option value="sort-z-a">Descending Z-A</option>
                    </select>
                </div>
            </div>

            {/* Table Card */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {
                                paginatedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            <p className="tracking-wide my-[1rem] text-[0.9rem] capitalize">no users data to show</p>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedUsers.map((item) => (
                                        <tr
                                            draggable={isDragEnabled}
                                            onDragStart={() => draggedItemHandler(item.id)}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                draggedOverItemHandler(item.id);
                                            }}
                                            onDrop={draggedOverEnd}
                                            key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 text-sm font-semibold text-blue-600 flex items-center justify-center">
                                                        {item.fullName.split("")[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">{item.fullName}</p>
                                                        <p className="text-xs text-gray-500">Joined {item.createdAt}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {item.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <select
                                                    defaultValue={item.status}
                                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-[0.85rem] focus:border-blue-500 focus:outline-none">
                                                    <option value="select-status" disabled>Select Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                                                {item.role || "N/A"}
                                            </td>

                                            <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => viewResume(item.id)}
                                                    className="rounded-lg border border-indigo-600 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-gray-100">
                                                    View Resume
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditUser(item);
                                                        setConfirmModalOpen(true);
                                                    }}
                                                    className="rounded-lg border border-amber-600 px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteUserData(item.id)
                                                    }}
                                                    className="rounded-lg border border-red-500 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-gray-100">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">Showing {firstItemIndex + 1} to {" "} {Math.min(lastItemIndex, filteredUsersData.length)} of {" "} {filteredUsersData.length} {pluralizeText(filteredUsersData.length, "user")}</p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-200">
                            Prev
                        </button>
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${page === currentPage
                                    ? "bg-blue-600 text-white"
                                    : "border text-gray-600 hover:bg-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-white disabled:bg-slate-200 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {
                confirmModalOpen && editUser && (
                    <ConfirmPasswordModal
                        onClose={() => setConfirmModalOpen(false)}
                        onSuccess={() => {
                            setConfirmModalOpen(false);
                            setEditModalOpen(true);
                        }}
                    />
                )
            }
            {
                editModalOpen && editUser && (
                    <div onClick={toggleEditModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <EditUserModal
                                onClose={toggleEditModal}
                                user={editUser}
                            />
                        </div>
                    </div>
                )
            }
            {
                resumeModalOpen && selectedResume && (
                    <ViewResumeModal
                        resume={selectedResume}
                        onClose={() => setResumeModalOpen(false)} />
                )
            }
        </div>
    );
};

export default Admin;