'use client'
import { Heading } from '@/components/ui/heading'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { ShouldRender } from '@/components/helpers/should-render'
import { Empty } from '@/components/helpers/empty'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PromptValidator, promptValidator } from '@/lib/validators'
import { useState } from 'react'
import { ChatCompletionRequestMessage } from 'openai'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { UserAvatar } from '@/components/user-avatar'

export default function ConversationPage({
  params: { conversationId },
}: {
  params: { conversationId: string }
}) {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

  const {
    register,
    handleSubmit,
    formState: { isLoading },
    reset,
  } = useForm<PromptValidator>({
    resolver: zodResolver(promptValidator),
    defaultValues: {
      prompt: '',
    },
  })

  async function onSubmit(data: PromptValidator) {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: data.prompt,
      }
      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        message: data.prompt,
        role: 'user',
        chatId: conversationId,
      })
      setMessages((current) => [...current, userMessage, response.data])

      reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // limited reached
        console.log('Limited reached')
      } else {
        console.log(error, 'random error')
      }
    } finally {
      router.refresh()
    }
  }
  return (
    <main>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <textarea
              className="border-0 outline-none focus-visible:ring-0 bg-transparent focus-visible:ring-transparent resize-none h-24 md:h-auto
                 col-span-12 lg:col-span-10 w-full"
              {...register('prompt')}
              placeholder="What was Elon middle name? "
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              size="icon"
            >
              Generate
            </Button>
          </form>
        </div>
        <div className="space-y-4 mt-4">
          <ShouldRender if={isLoading}>
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          </ShouldRender>

          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  'p-8 w-full flex items-start gap-x-8 rounded-lg',
                  message.role === 'user'
                    ? 'bg-white border border-black/10'
                    : 'bg-muted',
                )}
              >
                {message.role === 'user' ? (
                  <UserAvatar />
                ) : (
                  <div className="rounded-full w-10 h-10 bg-primary"></div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
