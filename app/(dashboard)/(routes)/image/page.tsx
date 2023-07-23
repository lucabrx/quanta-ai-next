'use client'
import {
  FormEvent,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Heading } from '@/components/ui/heading'
import { Download, ImageIcon, Loader2, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
//TODO - work on mobile view
//TODO - user settings on dashboard and free space from top

import {
  colorToneTags,
  compositionsTags,
  conceptsTags,
  contentType,
  effectsTags,
  movementsTags,
  techniquesTags,
  themesTags,
} from '@/config/image'
import { cn } from '@/lib/utils'

//TODO - work on zod better schema

export default function ImagePage() {
  const [photos, setPhotos] = useState<string[]>([])
  const [downloadLink, setDownloadLink] = useState('')
  const [prompt, setPrompt] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [contentTypes, setContentTypes] = useState('None')
  const [movementsType, setMovementsType] = useState('')
  const [themesType, setThemesType] = useState('')
  const [techniquesType, setTechniquesType] = useState('')
  const [effectsType, setEffectsType] = useState('')
  const [conceptsType, setConceptsType] = useState('')
  const [colorToneType, setColorToneType] = useState('')
  const [compositionsType, setCompositionsType] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const stylesArr = [
    contentTypes,
    movementsType,
    themesType,
    techniquesType,
    effectsType,
    conceptsType,
    colorToneType,
    compositionsType,
  ]
  let stylesStr = ''
  for (let i = 0; i < stylesArr.length; i++) {
    if (stylesArr[i] === 'None') {
      stylesArr[i] = ''
    }
    if (stylesArr[i] === '') {
      continue
    }
    stylesStr += stylesArr[i] + ' , '
  }

  const router = useRouter()

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        if (!prompt || prompt.length === 0) return
        setPrompt('')
        setLoading(true)
        setPhotos([])

        const payload = {
          prompt: prompt + ' , ' + stylesStr,
          amount: '2',
          resolution: '512x512',
        }

        const response = await axios.post('/api/image', payload)

        const urls = response.data.map((image: { url: string }) => image.url)

        setPhotos(urls)
      } catch (error: any) {
        // TODO - handle error
      } finally {
        router.refresh()
        setLoading(false)
      }
    },
    [prompt, stylesStr, router],
  )

  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = downloadLink
    link.setAttribute('download', 'generated_image.png')
    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
    //TODO make some popup or modal to show that image is downloaded maybe just change button image
  }, [downloadLink])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault() // Prevent adding a new line
        await onSubmit(e as unknown as FormEvent<HTMLFormElement>)
      }
    },
    [onSubmit],
  )

  return (
    <main className="flex flex-col flex-1 items-start justify-center mx-8">
      <div className="grid md:grid-cols-[73%,27%] flex-1 mb-8 3xl:grid-cols-[80%,20%]">
        <div className="w-full flex flex-col justify-between h-full md:pr-8">
          <Heading
            title="Image Generation"
            description="Turn your prompt into an image."
            icon={ImageIcon}
            iconColor="text-pink-500"
            bgColor="bg-pink-500/10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 items-start ">
            {photos.map((src) => (
              <div
                key={src}
                className="flex gap-2 w-full aspect-square justfy-center items-center rounded-md"
              >
                <div className="flex flex-col w-full h-full relative rounded-md">
                  <Image
                    alt="Generated"
                    className="rounded-md"
                    src={src}
                    fill
                  />

                  <Button
                    onClick={handleDownload}
                    variant="default"
                    className="w-full rounded-t-none z-20 absolute bottom-0 left-0 right-0"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>

                  {/* Hidden download link */}
                  <a
                    href={downloadLink}
                    className="hidden"
                    ref={(el) => setDownloadLink(el?.href || '')}
                    download
                  ></a>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => onSubmit(e)} className="flex  gap-2 w-full">
            <textarea
              disabled={loading}
              className="border-0 outline-none rounded-md resize-none h-auto w-full py-2 px-4 bg-card shadow focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              ref={inputRef as LegacyRef<HTMLTextAreaElement>}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              value={prompt}
              placeholder="What was Elon middle name? "
            />

            <Button disabled={loading} className="h-full px-8">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-wrap gap-4 w-full justify-center items-center bg-card shadow p-4 rounded-md border border-border xl:p-8">
            <h2 className="font-semibold text-lg w-full text-left">
              Content Type
            </h2>

            <div className="grid grid-cols-2 gap-4 w-full border-b border-secondary pb-4">
              {contentType.map((item) => (
                <button
                  value={item.name}
                  onClick={() => setContentTypes(item.name)}
                  key={item.id}
                  className={cn(
                    'flex justify-start items-center shadow bg-primary/10 w-full p-2 gap-2 hover:bg-card' +
                      ' transition' +
                      ' duration-300 hover:ring-2 hover:ring-pink-500 rounded-md',
                    contentTypes === item.name
                      ? 'ring-2 ring-pink-500 bg-card'
                      : '',
                  )}
                >
                  <item.Icon className="h-4 w-4" />
                  <p className="text-sm">{item.name}</p>
                </button>
              ))}
            </div>

            <h2 className="font-semibold text-lg w-full text-left">Styles</h2>

            <h3 className="w-full text-left">Movements</h3>
            <select
              value={movementsType}
              onChange={(e) => setMovementsType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {movementsTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <h3 className="w-full text-left">Themes</h3>
            <select
              value={themesType}
              onChange={(e) => setThemesType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {themesTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <h3 className="w-full text-left">Techniques</h3>
            <select
              value={techniquesType}
              onChange={(e) => setTechniquesType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {techniquesTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <h3 className="w-full text-left">Effects</h3>
            <select
              value={effectsType}
              onChange={(e) => setEffectsType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {effectsTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <h3 className="w-full text-left">Concepts</h3>
            <select
              value={conceptsType}
              onChange={(e) => setConceptsType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {conceptsTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <h3 className="w-full text-left">Color Tones</h3>
            <select
              value={colorToneType}
              onChange={(e) => setColorToneType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {colorToneTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <h3 className="w-full text-left">Compositions</h3>
            <select
              value={compositionsType}
              onChange={(e) => setCompositionsType(e.target.value)}
              className="w-full rounded border border-muted p-2 outline-none hover:ring-2 hover:ring-pink-500 focus:ring-2 focus:ring-pink-500"
            >
              {compositionsTags.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  )
}
