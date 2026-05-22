import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors, { Typography } from '../constants/Colors';

interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
}: ExperienceProps) {

  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>

      {/* Título da seção */}
      <Text style={styles.sectionTitle}>
        Experiência
      </Text>

      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >

        {/* Logo/Ícone */}
        <View style={styles.logoContainer}>
          <Ionicons
            name="briefcase-outline"
            size={24}
            color={Colors.primary}
          />
        </View>

        {/* Conteúdo */}
        <View style={styles.titleContainer}>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.company}>
            {company}
          </Text>

          <Text style={styles.period}>
            {period}
          </Text>

        </View>

        {/* Expandir */}
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Colors.primary}
        />

      </TouchableOpacity>

      {/* Descrição */}
      {expanded && (
        <View style={styles.details}>

          <View style={styles.skillsRow}>
            <Ionicons
              name="ribbon-outline"
              size={15}
              color={Colors.primary}
            />

            <Text style={styles.skillsText}>
              Competências e experiências
            </Text>
          </View>

          <Text style={styles.description}>
            {description}
          </Text>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    width: '100%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: Typography.weight.bold as '700',
    color: Colors.foreground,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.muted,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: Typography.weight.bold as '700',
    color: Colors.foreground,
    marginBottom: 2,
  },

  company: {
    fontSize: 15,
    color: Colors.foreground,
    marginBottom: 4,
  },

  period: {
    fontSize: 13,
    color: Colors.mutedForeground,
    lineHeight: 18,
  },

  details: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 14,
  },

  skillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },

  skillsText: {
    fontSize: 14,
    color: Colors.foreground,
    fontWeight: Typography.weight.medium as '500',
  },

  description: {
    fontSize: 14,
    color: Colors.foreground,
    lineHeight: 22,
  },

});