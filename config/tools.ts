import { Code, ImageIcon, Languages, MessageSquare } from 'lucide-react'

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
  {
    label: 'Language Translation',
    icon: Languages,
    href: '/translate',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
  },
]
