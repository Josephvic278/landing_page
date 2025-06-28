import React, { createContext, useContext, ReactNode } from 'react'
import { useToast, ToastMessage } from '../hooks/useToast'

interface ToastContextType {
  toasts: ToastMessage[]
  toast: {
    success: (message: string) => string
    error: (message: string) => string
    default: (message: string) => string
  }
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toastHook = useToast()
  
  return (
    <ToastContext.Provider value={toastHook}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}