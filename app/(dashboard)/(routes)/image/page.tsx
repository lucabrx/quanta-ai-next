'use client'

import { FormEvent, useState } from 'react'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Heading } from '@/components/ui/heading'
import { Download, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ChatMessages } from '@/components/chat-messages'
import { ChatForm } from '@/components/chat-form'
import { contentType } from '@/config/image'
import { cn } from '@/lib/utils'

//TODO - work on zod better schema

const imageValidation = z.object({
  prompt: z.string(),
})

type ImageValidation = z.infer<typeof imageValidation>

export default function ImagePage() {
  const [photos, setPhotos] = useState<string[]>([])
  const [downloadLink, setDownloadLink] = useState('')
  const [prompt, setPrompt] = useState('')

  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setPhotos([])

      const payload = {
        prompt: prompt,
        amount: '1',
        resolution: '512x512',
      }

      const response = await axios.post('/api/image', payload)

      const urls = response.data.map((image: { url: string }) => image.url)

      setPhotos(urls)
    } catch (error: any) {
      // TODO - handle error
    } finally {
      router.refresh()
    }
  }

  function handleDownload() {
    const link = document.createElement('a')
    link.href = downloadLink
    link.setAttribute('download', 'generated_image.png')
    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
    //TODO make some popup or modal to show that image is downloaded maybe just change button image
  }

  return (
    <main className="flex flex-col flex-1 mx-auto">
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />

      <div className="px-4 lg:px-8 py-4 flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-160px)]  w-full">
        <div className="grid md:grid-cols-[80%,20%] xl:gap-8 xl:px-8">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-wrap gap-4 w-full justify-center items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[480px] h-[20px] bg-cyan-500"></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center  w-full">
            <div className="flex flex-wrap gap-4 w-full justify-center items-center bg-card shadow p-4 rounded-md border border-border">
              <h2 className="font-semibold text-lg w-full text-left">
                Content Type
              </h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {contentType.map((item) => (
                  <button
                    key={item.id}
                    className={cn(
                      'flex justify-start items-center shadow bg-muted w-full p-2' +
                        ' gap-2 hover:bg-card transition duration-300 hover:ring-2 hover:ring-pink-700' +
                        ' rounded-md',
                      item.selected ? 'ring-2 ring-pink-700 bg-card' : '',
                    )}
                  >
                    <item.Icon className="h-4 w-4" />
                    <p className="text-sm">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

//<div className="px-4 lg:px-8 py-4 flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-150px)] ">
//  <form
//      onSubmit={(e) =>  onSubmit(e)}
//      className="grid grid-cols-12 gap-4 w-full bg"
//  >
//          <textarea
//              className="border-0 outline-none focus-visible:ring-0 bg-transparent focus-visible:ring-transparent resize-none h-auto
//                 col-span-12 lg:col-span-10 w-full"
//
//              onChange={(e) => setPrompt(e.target.value)}
//              value={prompt}
//              placeholder="What was Elon middle name? "
//          />
//
//    <Button
//        className="col-span-12 lg:col-span-2 w-full"
//        type="submit"
//        size="icon"
//    >
//      Generate
//    </Button>
//  </form>
//
//  {photos.map((src) => (
//      <div
//          key={src}
//          className="flex flex-wrap gap-2 justfy-center items-center"
//      >
//        <div className="flex flex-col w-full h-full max-w-[512px] max-h-[512px]">
//          <Image alt="Generated" src={src} width={512} height={512} />
//          <Button
//              onClick={handleDownload}
//              variant="default"
//              className="w-full"
//          >
//            <Download className="h-4 w-4 mr-2" />
//            Download
//          </Button>
//
//          {/* Hidden download link */}
//          <a
//              href={downloadLink}
//              className="hidden"
//              ref={(el) => setDownloadLink(el?.href || '')}
//              download
//          ></a>
//        </div>
//      </div>
//  ))}
//</div>
