'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import {
  type FC,
  type FormEvent,
  type LegacyRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Loader2, Send } from 'lucide-react'

interface ChatFormProps {
  conversationId: string
}
export const ChatForm: FC<ChatFormProps> = ({ conversationId }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [prompt, setPrompt] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      try {
        if (!prompt || prompt.length === 0) return
        await axios.post('/api/conversation', {
          message: prompt,
          role: 'user',
          chatId: conversationId,
        })

        setPrompt('')
        window.location.reload()
        inputRef.current?.focus()
      } catch (error: any) {
        if (error?.response?.status === 403) {
          // limited reached TODO
          console.log('Limited reached')
        } else {
          console.log(error, 'random error')
        }
      } finally {
        setLoading(false)
      }
    },
    [prompt, conversationId],
  )

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault() // Prevent adding a new line
        await onSubmit(e as unknown as FormEvent<HTMLFormElement>)
      }
    },
    [onSubmit],
  )

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="flex w-full relative">
        <input
          disabled={loading}
          ref={inputRef as LegacyRef<HTMLInputElement>}
          className="w-full h-full rounded-lg px-4 py-4 border border-border  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-primary/10 dark:bg-input"
          placeholder="What was Elon middle name? "
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          disabled={loading}
          className="absolute right-2.5 bottom-2.5 h-8 w-8"
          type="submit"
          size="icon"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send />}
        </Button>
      </form>
    </div>
  )
}
