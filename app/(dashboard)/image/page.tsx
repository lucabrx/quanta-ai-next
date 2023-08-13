"use client"

import {
  FormEvent,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Download, Loader2, Menu, Wand2, X } from "lucide-react"

import {
  colorToneTags,
  compositionsTags,
  conceptsTags,
  contentType,
  effectsTags,
  movementsTags,
  techniquesTags,
  themesTags,
} from "@/config/image"
import { Button } from "@/components/ui/button"

export default function ImportPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<string[]>([])
  const [downloadLink, setDownloadLink] = useState("")
  const [prompt, setPrompt] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [contentTypes, setContentTypes] = useState("None")
  const [movementsType, setMovementsType] = useState("")
  const [themesType, setThemesType] = useState("")
  const [techniquesType, setTechniquesType] = useState("")
  const [effectsType, setEffectsType] = useState("")
  const [conceptsType, setConceptsType] = useState("")
  const [colorToneType, setColorToneType] = useState("")
  const [compositionsType, setCompositionsType] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)

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

  let stylesStr = ""
  for (let i = 0; i < stylesArr.length; i++) {
    if (stylesArr[i] === "None") {
      stylesArr[i] = ""
    }
    if (stylesArr[i] === "") {
      continue
    }
    stylesStr += stylesArr[i] + " , "
  }

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        if (!prompt || prompt.length === 0) return
        setPrompt("")
        setLoading(true)
        setPhotos([])

        const payload = {
          prompt: prompt + " , " + stylesStr,
          amount: "1",
          resolution: "512x512",
        }

        const response = await axios.post("/api/image", payload)

        const urls = response.data.map((image: { url: string }) => image.url)

        setPhotos(urls)
      } catch (error: any) {
        // TODO - handle error
      } finally {
        router.refresh()
        setLoading(false)
      }
    },
    [prompt, stylesStr, router]
  )

  const handleDownload = useCallback(() => {
    const link = document.createElement("a")
    link.href = downloadLink
    link.setAttribute("download", "generated_image.png")
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
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault() // Prevent adding a new line
        await onSubmit(e as unknown as FormEvent<HTMLFormElement>)
      }
    },
    [onSubmit]
  )

  return (
    <main className="flex h-full max-h-[calc(100vh-144px)] flex-col justify-between">
      <div className="flex grid-cols-[1fr,260px] items-start justify-between lg:grid">
        <div className="flex h-full w-full flex-col items-center justify-start gap-4 px-4 xl:px-8">
          <h2 className="mt-1 w-full text-left text-xl md:text-2xl lg:mt-0">
            Generate Images 🖼️
          </h2>

          <div className="h-full w-full pt-4">
            {photos.map((src) => (
              <div
                key={src}
                className="justfy-center flex aspect-square h-full w-full items-center gap-2 rounded-md"
              >
                <div className="relative flex h-full w-full  flex-col rounded-md">
                  <Image
                    alt="Generated"
                    className="rounded-md"
                    src={src}
                    fill
                  />

                  <Button
                    onClick={handleDownload}
                    variant="default"
                    className="absolute bottom-0 left-0 right-0 z-20 w-full rounded-t-none"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>

                  {/* Hidden download link */}
                  <a
                    href={downloadLink}
                    className="hidden"
                    ref={(el) => setDownloadLink(el?.href || "")}
                    download
                  ></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => setMenu(true)}
          className=" lg:hidden"
          size="icon"
          variant="outline"
        >
          <Menu />
        </Button>
        {menu && (
          <aside className="absolute left-0 top-0 z-[100] flex h-full w-full  items-start justify-start bg-background pt-16">
            <nav className="flex h-full w-full flex-col items-start justify-start gap-3 px-8 ">
              <div className="w-full space-y-1">
                <h2>Content Type️</h2>
                <select
                  value={contentTypes}
                  onChange={(e) => setContentTypes(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {contentType.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Movements</h2>
                <select
                  value={movementsType}
                  onChange={(e) => setMovementsType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {movementsTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Themes</h2>
                <select
                  value={themesType}
                  onChange={(e) => setThemesType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {themesTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Techniques</h2>
                <select
                  value={techniquesType}
                  onChange={(e) => setTechniquesType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {techniquesTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Effects</h2>
                <select
                  value={effectsType}
                  onChange={(e) => setEffectsType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {effectsTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Concepts</h2>
                <select
                  value={conceptsType}
                  onChange={(e) => setConceptsType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {conceptsTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Color Tones</h2>
                <select
                  value={colorToneType}
                  onChange={(e) => setColorToneType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {colorToneTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Compositions</h2>
                <select
                  value={compositionsType}
                  onChange={(e) => setCompositionsType(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {compositionsTags.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </nav>
            <Button
              onClick={() => setMenu(false)}
              className="absolute right-4 top-4"
              size="icon"
              variant="outline"
            >
              <X />
            </Button>
          </aside>
        )}
        <aside className="hidden w-full flex-col gap-2 lg:flex">
          <nav className="grid items-start gap-3">
            <div className="space-y-1">
              <h2>Content Type️</h2>
              <select
                value={contentTypes}
                onChange={(e) => setContentTypes(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {contentType.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Movements</h2>
              <select
                value={movementsType}
                onChange={(e) => setMovementsType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {movementsTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Themes</h2>
              <select
                value={themesType}
                onChange={(e) => setThemesType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {themesTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Techniques</h2>
              <select
                value={techniquesType}
                onChange={(e) => setTechniquesType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {techniquesTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Effects</h2>
              <select
                value={effectsType}
                onChange={(e) => setEffectsType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {effectsTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Concepts</h2>
              <select
                value={conceptsType}
                onChange={(e) => setConceptsType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {conceptsTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Color Tones</h2>
              <select
                value={colorToneType}
                onChange={(e) => setColorToneType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {colorToneTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <h2>Compositions</h2>
              <select
                value={compositionsType}
                onChange={(e) => setCompositionsType(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {compositionsTags.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </aside>
      </div>

      <div className="mb-4  w-full lg:pl-4 lg:pr-[276px] xl:pl-8 xl:pr-[292px]">
        <form onSubmit={(e) => onSubmit(e)} className="relative flex w-full">
          <input
            disabled={loading}
            className="h-full w-full rounded-lg border border-border bg-primary/10 px-4  py-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:bg-input"
            ref={inputRef as LegacyRef<HTMLInputElement>}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            value={prompt}
            placeholder="Just Imagine... "
          />

          <Button
            disabled={loading}
            className="absolute bottom-2.5 right-2.5 h-8 w-8"
            type="submit"
            size="icon"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </main>
  )
}
