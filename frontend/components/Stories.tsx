import { useState } from 'react'

// React Native
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet
} from 'react-native'

// Ícones
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react-native'

// Cores do projeto
import Colors from '../constants/Colors'

type Story = {
  id: string
  user: string
  avatarColor: string
  viewed: boolean
  isOwn?: boolean
}

type StoriesProps = {
  currentUser: {
    name: string
  }
}

export default function Stories({
  currentUser
}: StoriesProps) {

  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const stories: Story[] = [
    {
      id: '0',
      user: currentUser.name,
      avatarColor: '#0A4174',
      viewed: false,
      isOwn: true
    },
    {
      id: '1',
      user: 'Maria Santos',
      avatarColor: '#0A4174',
      viewed: false
    },
    {
      id: '2',
      user: 'Pedro Lira',
      avatarColor: '#4E8EA2',
      viewed: false
    },
    {
      id: '3',
      user: 'Ana Paula',
      avatarColor: '#49769F',
      viewed: true
    },
    {
      id: '4',
      user: 'Carlos Oliveira',
      avatarColor: '#7BBDE8',
      viewed: false
    }
  ]

  const handleStoryClick = (
    story: Story,
    index: number
  ) => {
    setSelectedStory(story)
    setCurrentIndex(index)
  }

  const handleNext = () => {

    if (currentIndex < stories.length - 1) {

      const nextStory = stories[currentIndex + 1]

      setSelectedStory(nextStory)
      setCurrentIndex(currentIndex + 1)

    } else {

      setSelectedStory(null)

    }
  }

  const handlePrevious = () => {

    if (currentIndex > 0) {

      const prevStory = stories[currentIndex - 1]

      setSelectedStory(prevStory)
      setCurrentIndex(currentIndex - 1)

    }
  }

  const handleClose = () => {
    setSelectedStory(null)
  }

  return (

    <View style={styles.container}>

      {/* STORIES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {stories.map((story, index) => (

          <TouchableOpacity
            key={story.id}
            style={styles.storyButton}
            onPress={() =>
              handleStoryClick(story, index)
            }
          >

            {/* STORY PRÓPRIO */}
            {story.isOwn ? (

              <View style={styles.ownStoryWrapper}>

                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor:
                        story.avatarColor
                    }
                  ]}
                >

                  <Text style={styles.avatarText}>
                    {story.user
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .slice(0, 2)}
                  </Text>

                </View>

                <View style={styles.plusIcon}>

                  <Plus
                    size={12}
                    color="#FFF"
                  />

                </View>

              </View>

            ) : (

              <View
                style={[
                  styles.storyBorder,
                  {
                    borderColor: story.viewed
                      ? '#CCC'
                      : Colors.primary
                  }
                ]}
              >

                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor:
                        story.avatarColor
                    }
                  ]}
                >

                  <Text style={styles.avatarText}>
                    {story.user
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .slice(0, 2)}
                  </Text>

                </View>

              </View>

            )}

            <Text style={styles.storyName}>
              {story.isOwn
                ? 'Seu story'
                : story.user.split(' ')[0]}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      {/* MODAL STORY */}
      <Modal
        visible={!!selectedStory}
        animationType="fade"
      >

        {selectedStory && (

          <View style={styles.modalContainer}>

            {/* HEADER */}
            <View style={styles.modalHeader}>

              <View style={styles.userInfo}>

                <View
                  style={[
                    styles.modalAvatar,
                    {
                      backgroundColor:
                        selectedStory.avatarColor
                    }
                  ]}
                >

                  <Text style={styles.avatarText}>
                    {selectedStory.user
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .slice(0, 2)}
                  </Text>

                </View>

                <View>

                  <Text style={styles.modalUser}>
                    {selectedStory.user}
                  </Text>

                  <Text style={styles.modalTime}>
                    Há 2 horas
                  </Text>

                </View>

              </View>

              <TouchableOpacity
                onPress={handleClose}
              >

                <X
                  size={28}
                  color="#FFF"
                />

              </TouchableOpacity>

            </View>

            {/* CONTEÚDO */}
            <View
              style={[
                styles.storyContent,
                {
                  backgroundColor:
                    selectedStory.avatarColor
                }
              ]}
            >

              <Text style={styles.storyEmoji}>
                {selectedStory.isOwn
                  ? '📚'
                  : '👋'}
              </Text>

              <Text style={styles.storyTitle}>
                {selectedStory.isOwn
                  ? 'Meu Story'
                  : `Story de ${selectedStory.user}`}
              </Text>

              <Text style={styles.storySubtitle}>
                Estudando para as provas finais 📖
              </Text>

            </View>

            {/* NAVEGAÇÃO */}
            <View style={styles.navigation}>

              {currentIndex > 0 && (

                <TouchableOpacity
                  onPress={handlePrevious}
                >

                  <ChevronLeft
                    size={32}
                    color="#FFF"
                  />

                </TouchableOpacity>

              )}

              {currentIndex <
                stories.length - 1 && (

                <TouchableOpacity
                  onPress={handleNext}
                >

                  <ChevronRight
                    size={32}
                    color="#FFF"
                  />

                </TouchableOpacity>

              )}

            </View>

          </View>

        )}

      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
  },

  scrollContent: {
    paddingHorizontal: 16,
    gap: 14,
  },

  storyButton: {
    alignItems: 'center',
  },

  ownStoryWrapper: {
    position: 'relative',
  },

  storyBorder: {
    borderWidth: 2,
    borderRadius: 40,
    padding: 2,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },

  storyName: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  modalHeader: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  modalAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalUser: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  modalTime: {
    color: '#DDD',
    fontSize: 12,
  },

  storyContent: {
    flex: 1,
    margin: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  storyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },

  storyTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  storySubtitle: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.9,
  },

  navigation: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },

})