import { ImageOff, Image, Palette, Library, LucideIcon } from 'lucide-react'

interface ContentType {
  id: number
  name: string
  selected: boolean
  Icon: LucideIcon
}
export const contentType: ContentType[] = [
  {
    id: 1,
    name: 'None',
    selected: true,
    Icon: ImageOff,
  },
  {
    id: 2,
    name: 'Photo',
    selected: false,
    Icon: Image,
  },
  {
    id: 3,
    name: 'Art',
    selected: false,
    Icon: Palette,
  },
  {
    id: 4,
    name: 'Graphic',
    selected: false,
    Icon: Library,
  },
]
