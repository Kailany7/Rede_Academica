import React, { useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
}

interface PostCardProps {
  id: string
  author: string
  course: string
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  liked: boolean
  avatarColor: string

  onLike: (id: string) => void
}

export default function PostCard({
  id,
  author,
  course,
  content,
  timestamp,
  likes,
  comments,
  liked,
  avatarColor,
  onLike
}: PostCardProps) {

  const [showComments, setShowComments] = useState(false)

  const [commentText, setCommentText] = useState('')

  return (

    <View style={styles.card}>

      {/* HEADER */}

      <View style={styles.header}>

        <View
          style={[
            styles.avatar,
            { backgroundColor: avatarColor }
          ]}
        >
          <Text style={styles.avatarText}>
            {
              author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
            }
          </Text>
        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.author}>
            {author}
          </Text>

          <Text style={styles.meta}>
            {course}
          </Text>

          <Text style={styles.meta}>
            {timestamp}
          </Text>

        </View>

      </View>

      {/* CONTEÚDO */}

      <Text style={styles.content}>
        {content}
      </Text>

      {/* AÇÕES */}

      <View style={styles.actions}>

        {/* LIKE */}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(id)}
        >

          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color={liked ? '#E74C3C' : '#777'}
          />

          <Text style={styles.actionText}>
            {likes}
          </Text>

        </TouchableOpacity>

        {/* COMENTÁRIO */}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            setShowComments(!showComments)
          }
        >

          <Ionicons
            name="chatbubble-outline"
            size={22}
            color="#777"
          />

          <Text style={styles.actionText}>
            {comments.length}
          </Text>

        </TouchableOpacity>

        {/* SHARE */}

        <TouchableOpacity style={styles.actionButton}>

          <Ionicons
            name="share-social-outline"
            size={22}
            color="#777"
          />

        </TouchableOpacity>

      </View>

      {/* COMENTÁRIOS */}

      {
        showComments && (

          <View style={styles.commentsContainer}>

            {
              comments.map((comment) => (

                <View
                  key={comment.id}
                  style={styles.comment}
                >

                  <Text style={styles.commentAuthor}>
                    {comment.author}
                  </Text>

                  <Text style={styles.commentText}>
                    {comment.content}
                  </Text>

                </View>

              ))
            }

            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Adicione um comentário..."
              style={styles.commentInput}
            />

          </View>

        )
      }

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12
  },

  header: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatarText: {
    color: '#FFF',
    fontWeight: '700'
  },

  author: {
    fontWeight: '700',
    color: '#1B3A5C'
  },

  

  meta: {
    fontSize: 12,
    color: '#6B8BA4'
  },

  content: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2C3E50'
  },

  actions: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 16
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },

  actionText: {
    color: '#777'
  },

  commentsContainer: {
    marginTop: 16,
    gap: 10
  },

  comment: {
    backgroundColor: '#F3F6F8',
    padding: 10,
    borderRadius: 10
  },

  commentAuthor: {
    fontWeight: '700',
    marginBottom: 4
  },

  commentText: {
    color: '#333'
  },

  commentInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10
  }

})