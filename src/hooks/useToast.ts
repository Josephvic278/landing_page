import { useState, useCallback } from 'react'

export interface ToastMessage {
  id: string
  message: string
  variant: 'default' | 'success' | 'error'
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((message: string, variant: 'default' | 'success' | 'error' = 'default') => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastMessage = { id, message, variant }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
    
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const toast = {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    default: (message: string) => addToast(message, 'default'),
  }

  return { toasts, toast, removeToast }
}