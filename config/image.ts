import { Image, ImageOff, Library, LucideIcon, Palette } from "lucide-react"

interface ContentType {
  id: number
  name: string
  selected: boolean
  Icon: LucideIcon
}
export const contentType: ContentType[] = [
  {
    id: 1,
    name: "None",
    selected: true,
    Icon: ImageOff,
  },
  {
    id: 2,
    name: "Photo",
    selected: false,
    Icon: Image,
  },
  {
    id: 3,
    name: "Art",
    selected: false,
    Icon: Palette,
  },
  {
    id: 4,
    name: "Graphic",
    selected: false,
    Icon: Library,
  },
]

export const movementsTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Steampunk",
  },
  {
    id: 2,
    name: "Vaporwave",
  },
  {
    id: 3,
    name: "Science fiction",
  },
  {
    id: 4,
    name: "Pyschedelic",
  },
  {
    id: 5,
    name: "Fantasy",
  },
  {
    id: 6,
    name: "Pop art",
  },
  {
    id: 7,
    name: "Minimalism",
  },
  {
    id: 8,
    name: "Maximalism",
  },
  {
    id: 9,
    name: "Cubism",
  },
  {
    id: 10,
    name: "Cyberpunk",
  },
  {
    id: 11,
    name: "Baroque",
  },
]

export const themesTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Concept art",
  },
  {
    id: 2,
    name: "Pixel art",
  },
  {
    id: 3,
    name: "3D art",
  },
  {
    id: 4,
    name: "Product photo",
  },
  {
    id: 5,
    name: "Hyper realistic",
  },
  {
    id: 6,
    name: "Cartoon",
  },
  {
    id: 7,
    name: "Stamp",
  },
  {
    id: 8,
    name: "Vector look",
  },
  {
    id: 9,
    name: "Low poly",
  },
  {
    id: 10,
    name: "Graffiti",
  },
  {
    id: 11,
    name: "Geometric",
  },
  {
    id: 12,
    name: "Wireframe",
  },
  {
    id: 13,
    name: "Flat colours",
  },
  {
    id: 14,
    name: "Collage",
  },
]

export const techniquesTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Painting",
  },
  {
    id: 2,
    name: "Drawing",
  },
  {
    id: 3,
    name: "Watercolour",
  },
  {
    id: 4,
    name: "Oil painting",
  },
  {
    id: 5,
    name: "Acrylic painting",
  },
  {
    id: 6,
    name: "Line drawing",
  },
]

export const effectsTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Glitch",
  },
  {
    id: 2,
    name: "Blur",
  },
  {
    id: 3,
    name: "Noise",
  },
  {
    id: 4,
    name: "Vignette",
  },
  {
    id: 5,
    name: "Grain",
  },
  {
    id: 6,
    name: "Pixelated",
  },
  {
    id: 7,
    name: "Distorted",
  },
  {
    id: 8,
    name: "Glow",
  },
  {
    id: 9,
    name: "Shadow",
  },
  {
    id: 10,
    name: "Misty",
  },
]

export const conceptsTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Surreal",
  },
  {
    id: 2,
    name: "Dreamy",
  },
  {
    id: 3,
    name: "Futuristic",
  },
  {
    id: 4,
    name: "Retro",
  },
  {
    id: 5,
    name: "Vintage",
  },
  {
    id: 6,
    name: "Abstract",
  },
  {
    id: 7,
    name: "Realistic",
  },
  {
    id: 8,
    name: "Simple",
  },
  {
    id: 9,
    name: "Beautiful",
  },
  {
    id: 10,
    name: "Dark",
  },
  {
    id: 11,
    name: "Bright",
  },
  {
    id: 12,
    name: "Chaotic",
  },
]

export const colorToneTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Warm",
  },
  {
    id: 2,
    name: "Cold",
  },
  {
    id: 3,
    name: "Monochrome",
  },
  {
    id: 4,
    name: "Pastel",
  },
  {
    id: 5,
    name: "Vibrant",
  },
  {
    id: 6,
    name: "White and black",
  },
  {
    id: 7,
    name: "Mutated Colours",
  },
]

export const compositionsTags = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "Shot from above",
  },
  {
    id: 2,
    name: "Shot from below",
  },
  {
    id: 3,
    name: "Blurry background",
  },
  {
    id: 4,
    name: "Close up",
  },
  {
    id: 5,
    name: "Wide angle",
  },
  {
    id: 6,
    name: "Symmetrical",
  },
  {
    id: 7,
    name: "Asymmetrical",
  },
  {
    id: 8,
    name: "Macrophotography",
  },
]
