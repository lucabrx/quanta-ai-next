import {
  Code,
  Hexagon,
  Image as ImageIcon,
  Languages,
  Laugh,
  LucideIcon,
  MessageSquare,
} from "lucide-react"

export const pricing = [
  {
    name: "Free",
    price: 0,
    features: [
      "✅ Chat Bot",
      "✅ Code Generator",
      "✅ Translator",
      "❌  Image Generator",
      "❌ Icon Generator",
    ],
  },
  {
    name: "Standard",
    price: 10,
    features: [
      "✅ Chat Bot",
      "✅ Code Generator",
      "✅ Translator",
      "✅ Image Generator",
      "❌ Icon Generator",
    ],
  },
  {
    name: "Pro",
    price: 20,
    features: [
      "✅Chat Bot",
      "✅Code Generator",
      "✅Translator",
      "✅Image Generator",
      "✅Icon Generator",
    ],
  },
]

interface Feature {
  name: string
  description: string
  icon: LucideIcon
  path: string
}

export const features: Feature[] = [
  {
    name: "Chat",
    description: "Chat with Quanta and get answers to your questions.",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    name: "Code Generator",
    description: "Boost your productivity with Quanta`s code generator.",
    icon: Code,
    path: "/code",
  },
  {
    name: "Image Generator",
    description: "Generate images with Quanta`s image generator.",
    icon: ImageIcon,
    path: "/image",
  },
  {
    name: "Icon Generator",
    description: "Generate icons with Quanta`s icon generator.",
    icon: Hexagon,
    path: "/icon",
  },
  {
    name: "Translator",
    description: "Translate any language known by world.",
    icon: Languages,
    path: "/translate",
  },
  {
    name: "Generate Random Joke",
    description: "Generate random jokes with Quanta`s joke generator.",
    icon: Laugh,
    path: "/joke",
  },
]
