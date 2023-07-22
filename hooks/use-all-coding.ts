import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { ConversationType } from '@/db/tables'

export function useAllCoding() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/coding/get-all',
    fetcher,
  )
  let chats = data as ConversationType[]
  return {
    chats,
    error,
    isLoading,
    mutate,
  }
}
