import {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react'

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
}

export interface Post {
  id: string
  author: string
  authorCourse: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  isLiked: boolean
}

interface PostsContextType {
  newPosts: Post[]
  addPost: (content: string) => void
}

const PostsContext = createContext({} as PostsContextType)

export function PostsProvider({
  children
}: {
  children: ReactNode
}) {

  const [newPosts, setNewPosts] = useState<Post[]>([])

  function addPost(content: string) {

    const post: Post = {
      id: Date.now().toString(),

      author: 'Usuário',

      authorCourse: 'Ciência da Computação',

      authorAvatar: '#1B4F8A',

      content,

      timestamp: 'Agora',

      likes: 0,

      comments: [],

      isLiked: false,
    }

    setNewPosts((prev) => [post, ...prev])
  }

  return (
    <PostsContext.Provider
      value={{
        newPosts,
        addPost
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export function usePosts() {
  return useContext(PostsContext)
}