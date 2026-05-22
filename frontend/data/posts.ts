export interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
}

export interface Post {
  id: string
  author: string
  course: string
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  liked: boolean
  avatarColor: string
  isCurrentUser?: boolean
}

export const posts: Post[] = [
  {
    id: '1',
    author: 'Maria Santos',
    course: 'Engenharia de Software',
    content: 'Alguém tem material de algoritmos?',
    timestamp: 'Há 2 horas',
    likes: 12,
    comments: [],
    liked: false,
    avatarColor: '#1B4F8A'
  },

  {
    id: '2',
    author: 'Pedro Lira',
    course: 'Sistemas de Informação',
    content: 'Meu primeiro post na rede acadêmica 🚀',
    timestamp: 'Agora',
    likes: 5,
    comments: [],
    liked: false,
    avatarColor: '#2E7D8C',
    isCurrentUser: true
  },

  {
    id: "3",
    author: "Usuário",
    course: "Ciência da Computação",
    avatarColor: "#2E7D8C",
    timestamp: "Agora",
    content: "Esse é meu primeiro post!",
    likes: 3,
    liked: false,
    comments: [],
  }
]