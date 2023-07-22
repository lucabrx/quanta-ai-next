'use client'
import { Button } from '@/components/ui/button'
import { promptValidator, PromptValidator } from '@/lib/validators'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface CodeFormProps {
  codingId: string
}
export const CodeForm: FC<CodeFormProps> = ({ codingId }) => {
  const router = useRouter()

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
      await axios.post('/api/coding', {
        message: data.prompt,
        role: 'user',
        codeId: codingId,
      })

      reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // limited reached TODO
        console.log('Limited reached')
      } else {
        console.log(error, 'random error')
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
      >
        <textarea
          className="border-0 outline-none focus-visible:ring-0 bg-transparent focus-visible:ring-transparent resize-none h-auto
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
  )
}
