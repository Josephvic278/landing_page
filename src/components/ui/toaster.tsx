import React from 'react'
import { useToastContext } from '../../contexts/ToastContext'
import { Toast } from './toast'

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToastContext()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          onClose={() => removeToast(toast.id)}
          className="animate-in slide-in-from-top-full"
        >
          {toast.message}
        </Toast>
      ))}
    </div>
  )
}