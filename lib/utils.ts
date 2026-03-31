import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate username from email
export function generateUsernameFromEmail(email: string): string {
  if (!email) return ''
  const username = email.split('@')[0]
  return username.charAt(0).toUpperCase() + username.slice(1)
}
