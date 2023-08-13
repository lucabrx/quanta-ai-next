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

import { colorType, shapeType, styleType } from "@/config/icon"
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
  const [shapeTypes, setShapeTypes] = useState("None")
  const [styleTypes, setStyleTypes] = useState("")
  const [colorTypes, setColorTypes] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        if (
          !prompt ||
          (prompt.length === 0 &&
            shapeTypes === "" &&
            styleTypes === "" &&
            colorTypes === "")
        )
          return
        setPrompt("")
        setStyleTypes("")
        setColorTypes("")
        setShapeTypes("")
        setLoading(true)
        setPhotos([])

        const payload = {
          prompt: prompt,
          shape: shapeTypes,
          style: styleTypes,
          color: colorTypes,
          amount: "1",
          resolution: "512x512",
        }

        console.log(payload)

        const response = await axios.post("/api/icon", payload)

        const urls = response.data.map((image: { url: string }) => image.url)

        setPhotos(urls)
      } catch (error: any) {
        // TODO - handle error
      } finally {
        router.refresh()
        setLoading(false)
      }
    },
    [prompt, colorTypes, shapeTypes, styleTypes, router]
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
            Generate Icon 🎨
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
                <h2>Shape ⋆</h2>
                <select
                  value={shapeTypes}
                  onChange={(e) => setShapeTypes(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {shapeType.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Style ⋆</h2>
                <select
                  value={styleTypes}
                  onChange={(e) => setStyleTypes(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {styleType.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-1">
                <h2>Colors ⋆</h2>
                <select
                  value={colorTypes}
                  onChange={(e) => setColorTypes(e.target.value)}
                  className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
                >
                  {colorType.map((item) => (
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
          <nav className="flex h-full w-full flex-col items-start justify-start gap-3 px-8 ">
            <div className="w-full space-y-1">
              <h2>Shape ⋆</h2>
              <select
                value={shapeTypes}
                onChange={(e) => setShapeTypes(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {shapeType.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full space-y-1">
              <h2>Style ⋆</h2>
              <select
                value={styleTypes}
                onChange={(e) => setStyleTypes(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {styleType.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full space-y-1">
              <h2>Colors ⋆</h2>
              <select
                value={colorTypes}
                onChange={(e) => setColorTypes(e.target.value)}
                className="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium dark:bg-accent"
              >
                {colorType.map((item) => (
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
