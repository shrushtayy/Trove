import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

const personalities = [
  { id: 'concert', emoji: '🎵', title: 'Concert Rat', desc: 'Experiences over everything' },
  { id: 'cafe', emoji: '☕', title: 'Café Crawler', desc: 'Daily small spends add up' },
  { id: 'traveller', emoji: '✈️', title: 'Weekend Escapist', desc: 'Save all week, spend all weekend' },
  { id: 'gadget', emoji: '📱', title: 'Gadget Head', desc: 'Tech and gear spending' },
  { id: 'foodie', emoji: '🍜', title: 'Foodie First', desc: 'Dining and delivery heavy' },
  { id: 'balanced', emoji: '⚖️', title: 'Balanced Builder', desc: 'Relatively even across categories' },
];

export default function PersonalityScreen({ navigation, route }) {
  const { income, expenses, vibebudget } = route.params;
  const [selected, setSelected] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>Step 3 of 3</Text>
        <Text style={styles.title}>What's your spending personality?</Text>
        <Text style={styles.subtitle}>Be honest. Trove plans better when it knows you.</Text>
      </View>

      {/* Personality grid */}
      <View style={styles.grid}>
        {personalities.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.card, selected === p.id && styles.cardActive]}
            onPress={() => setSelected(p.id)}
          >
            <Text style={styles.emoji}>{p.emoji}</Text>
            <Text style={[styles.cardTitle, selected === p.id && styles.cardTitleActive]}>
              {p.title}
            </Text>
            <Text style={styles.cardDesc}>{p.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.button, !selected && styles.buttonDisabled]}
        onPress={() => selected && navigation.navigate('Home', { income, expenses, vibebudget, personality: selected })}
      >
        <Text style={styles.buttonText}>Enter Trove →</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  step: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    marginBottom: 8,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.black,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 16,
    width: '47%',
    alignItems: 'center',
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: '#0D1F00',
  },
  emoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardTitleActive: {
    color: colors.primary,
  },
  cardDesc: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.background,
  },
});