import '../../../app/globals.css'
import '../../index.css'

const SideBar = ({children}:{children:React.ReactNode}) => {
  return (
    <aside 
    id="default-sidebar" 
    className="fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-200 rounded-tr-lg rounded-br-lg bg-blue-700" aria-label="Sidebar">
    <div className="flex flex-col h-full p-8 pt-4 overflow-y-auto">
        {children}
    </div>
  </aside>
  )
}

export default SideBar