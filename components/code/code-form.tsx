"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type FormEvent,
  type KeyboardEvent,
  type LegacyRef,
} from "react"
import axios from "axios"
import { Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ChatFormProps {
  codeId: string
}
export const CodeForm: FC<ChatFormProps> = ({ codeId }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [prompt, setPrompt] = useState<string>("")
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
        await axios.post("/api/coding", {
          message: prompt,
          role: "user",
          codeId: codeId,
        })

        setPrompt("")
        window.location.reload()
        inputRef.current?.focus()
      } catch (error: any) {
        if (error?.response?.status === 403) {
          // limited reached TODO
          console.log("Limited reached")
        } else {
          console.log(error, "random error")
        }
      } finally {
        setLoading(false)
      }
    },
    [prompt, codeId]
  )

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault() // Prevent adding a new line
        await onSubmit(e as unknown as FormEvent<HTMLFormElement>)
      }
    },
    [onSubmit]
  )

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="relative flex w-full">
        <input
          disabled={loading}
          ref={inputRef as LegacyRef<HTMLInputElement>}
          className="h-full w-full rounded-lg border border-border bg-primary/10 px-4  py-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:bg-input"
          placeholder="What was Elon middle name? "
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          disabled={loading}
          className="absolute bottom-2.5 right-2.5 h-8 w-8"
          type="submit"
          size="icon"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send />}
        </Button>
      </form>
    </div>
  )
}
