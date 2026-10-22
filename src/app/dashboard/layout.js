import Sidebar from './components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-full bg-[#002C83] p-[20px] flex gap-[5px]">
      <Sidebar />
      <div className="flex-1 bg-white rounded-3xl overflow-y-auto flex flex-col">
        {children}
      </div>
    </div>
  )
}
