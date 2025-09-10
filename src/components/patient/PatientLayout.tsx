import { Outlet } from 'react-router-dom'
import { PatientSidebar } from './PatientSidebar'
import { PatientHeader } from './PatientHeader'

export const PatientLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <PatientSidebar />
      <div className="lg:pl-64">
        <PatientHeader />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}