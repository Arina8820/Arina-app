import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NotesProvider, useToast, type Toast } from '../store/NotesProvider'
import type { FC } from 'react'

const ToastContainer: FC = () => {
  const { toasts, removeToast } = useToast()

  const getStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      case 'info': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={`${getStyles(toast.type)} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between gap-4 min-w-80 animate-slide-in`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-xl font-bold hover:text-gray-200 transition-colors"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

const RootLayout = () => (
  <>
    <NotesProvider>
      <ToastContainer />
      {/* контент сайта, который передали на маршрут */}
      <Outlet />
    </NotesProvider>
  </>
)

export const Route = createRootRoute({ 
  component: RootLayout,
  notFoundComponent() {
    return <div className='bg-red-500'>Ты куда зашел????</div>
  },
 })