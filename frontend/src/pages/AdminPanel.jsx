import React from 'react'
import AdminProductTable from '../components/AdminProductTable'

const AdminPanel = () => {
  return (
    <div className="h-full bg-background-light dark:bg-background-dark  p-6">
      <h1 className="text-2xl font-bold mb-4 mt-14">Manage Products</h1>
      <AdminProductTable />
    </div>
  )
}

export default AdminPanel