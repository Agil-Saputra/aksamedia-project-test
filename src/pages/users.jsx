import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "../layout/admin-layout";
import Pagination from "../components/pagination";
import UserFilters from "../components/user-filters";
import UserRow from "../components/user-row";

const ITEMS_PER_PAGE = 5;
const ROLES = ["Admin", "User", "Manager", "Editor"];
const STATUSES = ["active", "inactive"];

const createSampleUsers = () => {
  const names = [
    "John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson",
    "Diana Davis", "Eva Martinez", "Frank Miller", "Grace Lee", "Henry Taylor"
  ];

  return names.map((name, index) => ({
    id: (index + 1).toString(),
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") || "");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "", email: "", role: "User", status: "active"
  });
  const [editUser, setEditUser] = useState({
    id: "", name: "", email: "", role: "User", status: "active"
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const sampleUsers = createSampleUsers();
      setUsers(sampleUsers);
      localStorage.setItem("users", JSON.stringify(sampleUsers));
    }
  }, []);

  // Validate and sync query params on mount
  useEffect(() => {
    const params = new URLSearchParams();
    let hasChanges = false;

    // Validate and set search param
    if (searchTerm && searchTerm !== "") {
      params.set("search", searchTerm);
    }

    // Validate and set status param
    if (statusFilter && statusFilter !== "" && STATUSES.includes(statusFilter)) {
      params.set("status", statusFilter);
    } else if (statusFilter && !STATUSES.includes(statusFilter)) {
      setStatusFilter("");
      hasChanges = true;
    }

    // Validate and set role param
    if (roleFilter && roleFilter !== "" && ROLES.includes(roleFilter)) {
      params.set("role", roleFilter);
    } else if (roleFilter && !ROLES.includes(roleFilter)) {
      setRoleFilter("");
      hasChanges = true;
    }

    // Validate and set page param
    if (currentPage && currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    if (hasChanges) {
      setSearchParams(params);
    }
  }, []);

  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const updateQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "" && value !== "1") {
        params.set(key, value);
      } else if (key === "page" && value === 1) {
        params.delete(key);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const newPage = Math.max(1, totalPages);
      setCurrentPage(newPage);
      updateQueryParams({
        search: searchTerm,
        status: statusFilter,
        role: roleFilter,
        page: newPage
      });
    }
  }, [filteredUsers.length, totalPages, currentPage]);

  const handleFilterChange = (filterType, value) => {
    let newSearchTerm = searchTerm;
    let newStatusFilter = statusFilter;
    let newRoleFilter = roleFilter;
    let newPage = 1;

    if (filterType === "search") newSearchTerm = value;
    if (filterType === "status") newStatusFilter = value;
    if (filterType === "role") newRoleFilter = value;

    setSearchTerm(newSearchTerm);
    setStatusFilter(newStatusFilter);
    setRoleFilter(newRoleFilter);
    setCurrentPage(newPage);

    updateQueryParams({
      search: newSearchTerm,
      status: newStatusFilter,
      role: newRoleFilter,
      page: newPage
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateQueryParams({
      search: searchTerm,
      status: statusFilter,
      role: roleFilter,
      page: page
    });
  };

  const handleEdit = (user) => {
    setEditUser({ id: user.id, name: user.name, email: user.email, role: user.role, status: user.status });
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditUser({ id: "", name: "", email: "", role: "User", status: "active" });
  };

  const handleSaveEdit = () => {
    if (!editUser.name.trim() || !editUser.email.trim()) {
      alert("Nama dan email tidak boleh kosong!");
      return;
    }

    const updatedUser = { ...editUser, name: editUser.name.trim(), email: editUser.email.trim() };
    const newUsers = users.map((user) => user.id === updatedUser.id ? updatedUser : user);
    saveUsers(newUsers);
    setShowEditModal(false);
    setEditUser({ id: "", name: "", email: "", role: "User", status: "active" });
  };

  const handleDelete = (userId) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      const newUsers = users.filter((user) => user.id !== userId);
      saveUsers(newUsers);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
    setNewUser({ name: "", email: "", role: "User", status: "active" });
  };

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert("Nama dan email tidak boleh kosong!");
      return;
    }

    const userToAdd = {
      id: Date.now().toString(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: newUser.status,
      createdAt: new Date().toISOString(),
    };

    saveUsers([userToAdd, ...users]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "User", status: "active" });
    
    // Reset to page 1 after adding user to show the new user
    setCurrentPage(1);
    updateQueryParams({
      search: searchTerm,
      status: statusFilter,
      role: roleFilter,
      page: 1
    });
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "User", status: "active" });
  };

  return (
    <AdminLayout>
      <div className="font-mono">
        <div className="mb-10">
          <div className="relative mb-6">
            <h1 className="text-4xl font-black text-black dark:text-gray-100 uppercase tracking-tight mb-2">
              PENGGUNA
            </h1>
            <div className="h-1 w-28 bg-black dark:bg-gray-300"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-black dark:border-gray-300 p-4">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Kelola akun pengguna dan izin sistem
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-black dark:bg-gray-100 transform rotate-45"></div>
            <h3 className="text-lg font-black text-black dark:text-gray-100 uppercase tracking-wide">
              FILTER & PENCARIAN
            </h3>
            <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
          </div>
          <UserFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            roleFilter={roleFilter}
            onSearch={(value) => handleFilterChange("search", value)}
            onStatusFilter={(value) => handleFilterChange("status", value)}
            onRoleFilter={(value) => handleFilterChange("role", value)}
            onAdd={handleAdd}
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-black dark:bg-gray-100 transform rotate-45"></div>
            <h3 className="text-lg font-black text-black dark:text-gray-100 uppercase tracking-wide">
              DAFTAR PENGGUNA
            </h3>
            <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
            <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-3 py-1 text-sm font-bold">
              {filteredUsers.length} USER
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-black dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-black text-gray-50 dark:text-gray-100 uppercase tracking-wider border-r border-gray-600 dark:border-gray-400">PENGGUNA</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-gray-50 dark:text-gray-100 uppercase tracking-wider border-r border-gray-600 dark:border-gray-400">ROLE</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-gray-50 dark:text-gray-100 uppercase tracking-wider border-r border-gray-600 dark:border-gray-400">STATUS</th>
                    <th className="px-6 py-4 text-left text-sm font-black text-gray-50 dark:text-gray-100 uppercase tracking-wider border-r border-gray-600 dark:border-gray-400">DIBUAT</th>
                    <th className="px-6 py-4 text-right text-sm font-black text-gray-50 dark:text-gray-100 uppercase tracking-wider">AKSI</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 dark:bg-gray-900 divide-y-2 divide-black dark:divide-gray-300">
                  {paginatedUsers.map((user) => (
                    <UserRow key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-16 border-t-2 border-black dark:border-gray-300">
                <div className="inline-block bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-gray-300 p-6">
                  <p className="text-black dark:text-gray-100 font-bold text-lg uppercase">TIDAK ADA DATA</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">Tidak ada pengguna yang sesuai kriteria</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[99999] p-4 font-mono">
          <div className="bg-gray-50 dark:bg-gray-900 border-4 border-black dark:border-gray-300 max-w-md w-full shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#6b7280]">
            <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-6 py-4 border-b-4 border-black dark:border-gray-300">
              <h3 className="text-xl font-black uppercase tracking-wide">TAMBAH PENGGUNA</h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">NAMA LENGKAP *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-gray-500"
                  placeholder="MASUKKAN NAMA LENGKAP"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">EMAIL *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-gray-500"
                  placeholder="CONTOH@EMAIL.COM"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">PERAN</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">STATUS</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-t-2 border-black dark:border-gray-300 flex justify-end space-x-4">
              <button
                onClick={handleCancelAdd}
                className="px-6 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-100 font-black uppercase tracking-wide hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                BATAL
              </button>
              <button
                onClick={handleAddUser}
                className="px-6 py-3 bg-blue-600 border-2 border-blue-800 text-gray-50 font-black uppercase tracking-wide hover:bg-blue-700 transition-colors shadow-[4px_4px_0px_0px_#1e40af]"
              >
                TAMBAH
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[99999] p-4 font-mono">
          <div className="bg-gray-50 dark:bg-gray-900 border-4 border-black dark:border-gray-300 max-w-md w-full shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#6b7280]">
            <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-6 py-4 border-b-4 border-black dark:border-gray-300">
              <h3 className="text-xl font-black uppercase tracking-wide">EDIT PENGGUNA</h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">NAMA LENGKAP *</label>
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-green-500 placeholder-gray-500"
                  placeholder="MASUKKAN NAMA LENGKAP"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">EMAIL *</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-green-500 placeholder-gray-500"
                  placeholder="CONTOH@EMAIL.COM"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">PERAN</label>
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-green-500"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">STATUS</label>
                <select
                  value={editUser.status}
                  onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-green-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-t-2 border-black dark:border-gray-300 flex justify-end space-x-4">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-100 font-black uppercase tracking-wide hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                BATAL
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-3 bg-green-600 border-2 border-green-800 text-gray-50 font-black uppercase tracking-wide hover:bg-green-700 transition-colors shadow-[4px_4px_0px_0px_#15803d]"
              >
                SIMPAN
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
