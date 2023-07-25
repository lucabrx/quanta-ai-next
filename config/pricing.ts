import {
  Code,
  DollarSign,
  Hexagon,
  Image as ImageIcon,
  Languages,
  MessageSquare,
} from 'lucide-react'

export const pricing = [
  {
    name: 'Free',
    price: 0,
    features: [
      '✅ Chat Bot',
      '✅ Code Generator',
      '✅ Translator',
      '❌  Image Generator',
      '❌ Icon Generator',
    ],
  },
  {
    name: 'Standard',
    price: 10,
    features: [
      '✅ Chat Bot',
      '✅ Code Generator',
      '✅ Translator',
      '✅ Image Generator',
      '❌ Icon Generator',
    ],
  },
  {
    name: 'Pro',
    price: 20,
    features: [
      '✅Chat Bot',
      '✅Code Generator',
      '✅Translator',
      '✅Image Generator',
      '✅Icon Generator',
    ],
  },
]

export const features = [
  {
    name: 'Chat',
    description: 'Chat with Quanta and get answers to your questions.',
    icon: MessageSquare,
  },
  {
    name: 'Code Generator',
    description: 'Boost your productivity with Quanta`s code generator.',
    icon: Code,
  },
  {
    name: 'Image Generator',
    description: 'Generate images with Quanta`s image generator.',
    icon: ImageIcon,
  },
  {
    name: 'Icon Generator',
    description: 'Generate icons with Quanta`s icon generator.',
    icon: Hexagon,
  },
  {
    name: 'Translator',
    description: 'Translate any language known by world.',
    icon: Languages,
  },
  {
    name: 'Subscriptions',
    description:
      'For less then 20$ a month you can get access to all features.',
    icon: DollarSign,
  },
]
