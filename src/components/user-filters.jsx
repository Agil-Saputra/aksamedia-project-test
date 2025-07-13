export default function UserFilters({ 
  searchTerm, 
  statusFilter, 
  roleFilter, 
  onSearch, 
  onStatusFilter, 
  onRoleFilter, 
  onAdd 
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 font-mono mb-6">
      <div className="bg-black dark:bg-gray-700 text-gray-50 dark:text-gray-100 px-6 py-3 border-b-2 border-black dark:border-gray-300">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gray-50 dark:bg-gray-100 transform rotate-45"></div>
          <h2 className="text-lg font-black uppercase tracking-wide">FILTER & PENCARIAN</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">
              CARI PENGGUNA
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="NAMA ATAU EMAIL..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-gray-500 placeholder:uppercase placeholder:text-xs"
              />

            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">
              STATUS
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="">SEMUA STATUS</option>
                <option value="active">AKTIF</option>
                <option value="inactive">TIDAK AKTIF</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="w-4 h-4 text-black dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-black dark:text-gray-100 uppercase tracking-wide mb-3">
              Role
            </label>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => onRoleFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black dark:border-gray-300 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 font-medium focus:outline-none focus:ring-0 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="">SEMUA PERAN</option>
                <option value="Admin">ADMIN</option>
                <option value="Manager">MANAGER</option>
                <option value="Editor">EDITOR</option>
                <option value="User">USER</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="w-4 h-4 text-black dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={onAdd}
              className="w-full px-4 py-3 bg-blue-600 border-2 border-blue-800 text-gray-50 font-black uppercase tracking-wide hover:bg-blue-700 transition-colors shadow-[4px_4px_0px_0px_#1e40af] hover:shadow-[2px_2px_0px_0px_#1e40af] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              + TAMBAH USER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
