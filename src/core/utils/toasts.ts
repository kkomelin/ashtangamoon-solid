import toast from 'solid-toast'

export const error = (e: any, message: string) => {
  console.error(e)
  toast.error(message)
}
export const success = (message: string) => {
  toast.success(message)
}
