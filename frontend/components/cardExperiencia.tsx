import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/Colors';

interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export function ExperienceCard({ title, company, period, description }: ExperienceProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)} activeOpacity={0.7}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.company}>{company} • <Text style={styles.period}>{period}</Text></Text>
        </View>
        <Text style={styles.toggleIcon}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.subtleBlock, 
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.size.medium,
    fontWeight: Typography.weight.bold,
    color: Colors.text,
  },
  company: {
    fontSize: Typography.size.regular,
    color: Colors.primary,
    fontWeight: Typography.weight.semibold,
    marginTop: 2,
  },
  period: {
    fontSize: Typography.size.small,
    color: Colors.textMuted,
    fontWeight: Typography.weight.regular,
  },
  toggleIcon: {
    fontSize: Typography.size.small,
    color: Colors.primary,
    paddingLeft: 8,
  },
  details: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
    paddingTop: 12,
  },
  description: {
    fontSize: Typography.size.regular,
    color: Colors.text,
    lineHeight: 20,
  },
});