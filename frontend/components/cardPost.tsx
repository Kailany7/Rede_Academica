import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from './Avatar';
import { Colors, Typography } from '../constants/Colors';

interface PostCardProps {
  initials: string;
  authorName: string;
  course: string;
  timeAgo: string; 
  text: string;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export function PostCard({ initials, authorName, course, timeAgo, text, likesCount, commentsCount, onLike, onComment, onShare }: PostCardProps) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar initials={initials} size={48} />
        <View style={styles.headerText}>
          <Text style={styles.author}>{authorName}</Text>
          <Text style={styles.course}>{course}</Text>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
      </View>
      
      {/* Corpo */}
      <Text style={styles.bodyText}>{text}</Text>
      
      {/* Rodapé / Interações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <Text style={styles.icon}>💙</Text>
          <Text style={styles.actionCount}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Text style={styles.icon}>💬</Text>
          <Text style={styles.actionCount}>{commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Text style={styles.icon}>🔗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: 24,
    marginVertical: 12,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    elevation: 2,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 14,
  },
  author: {
    fontSize: Typography.size.medium,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
  },
  course: {
    fontSize: Typography.size.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  timeAgo: {
    fontSize: Typography.size.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bodyText: {
    fontSize: Typography.size.regular,
    color: Colors.text,
    lineHeight: 22,
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.subtleBlock,
    paddingTop: 16,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  icon: {
    fontSize: 18,
  },
  actionCount: {
    fontSize: Typography.size.regular,
    color: Colors.textMuted,
    marginLeft: 6,
    fontWeight: Typography.weight.semibold,
  },
});