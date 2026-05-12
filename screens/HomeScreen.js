import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../constants/colors';
import typography from '../constants/typography';

export default function HomeScreen({ navigation, route }) {
  const { income, expenses, vibebudget, personality } = route.params;

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
  const spentPercent = Math.min((totalExpenses / parseInt(income)) * 100, 100);

  const personalityLabels = {
    concert: 'Concert Rat 🎵',
    cafe: 'Café Crawler ☕',
    traveller: 'Weekend Escapist ✈️',
    gadget: 'Gadget Head 📱',
    foodie: 'Foodie First 🍜',
    balanced: 'Balanced Builder ⚖️',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey there 👋</Text>
          <Text style={styles.personality}>{personalityLabels[personality]}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>May 2026</Text>
        </View>
      </View>

      {/* Vibe Budget Card */}
      <View style={styles.vibeCard}>
        <Text style={styles.vibeLabel}>Your vibe budget</Text>
        <Text style={styles.vibeAmount}>₹{parseInt(vibebudget).toLocaleString('en-IN')}</Text>
        <Text style={styles.vibeSub}>Left to live your life this month</Text>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${spentPercent}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>₹{totalExpenses.toLocaleString('en-IN')} fixed</Text>
          <Text style={styles.progressText}>₹{parseInt(income).toLocaleString('en-IN')} income</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statAmount}>₹{parseInt(income).toLocaleString('en-IN')}</Text>
          <Text style={styles.statLabel}>Monthly income</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statAmount}>₹{totalExpenses.toLocaleString('en-IN')}</Text>
          <Text style={styles.statLabel}>Fixed costs</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick actions</Text>
      <View style={styles.actionsGrid}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Goals', route.params)}
        >
          <Text style={styles.actionEmoji}>🎯</Text>
          <Text style={styles.actionTitle}>Plan a goal</Text>
          <Text style={styles.actionSub}>Save for something</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Subscriptions', route.params)}
        >
          <Text style={styles.actionEmoji}>👻</Text>
          <Text style={styles.actionTitle}>Graveyard</Text>
          <Text style={styles.actionSub}>Find ghost subs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Split', route.params)}
        >
          <Text style={styles.actionEmoji}>🤝</Text>
          <Text style={styles.actionTitle}>Split bill</Text>
          <Text style={styles.actionSub}>Split with friends</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('AskTrove', route.params)}
        >
          <Text style={styles.actionEmoji}>🧮</Text>
          <Text style={styles.actionTitle}>Ask Trove</Text>
          <Text style={styles.actionSub}>Can I afford this?</Text>
        </TouchableOpacity>

      </View>

      {/* Learn Section */}
      <Text style={styles.sectionTitle}>Learn</Text>
      <View style={styles.learnRow}>
        <TouchableOpacity
          style={styles.learnCard}
          onPress={() => navigation.navigate('CreditCoach', route.params)}
        >
          <Text style={styles.learnEmoji}>💳</Text>
          <Text style={styles.learnTitle}>Credit card coach</Text>
          <Text style={styles.learnSub}>Use cards smartly</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.learnCard}
          onPress={() => navigation.navigate('CIBIL', route.params)}
        >
          <Text style={styles.learnEmoji}>📊</Text>
          <Text style={styles.learnTitle}>CIBIL explainer</Text>
          <Text style={styles.learnSub}>Know your score</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.black,
    color: colors.textPrimary,
  },
  personality: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  vibeCard: {
    backgroundColor: '#0D1F00',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  vibeLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  vibeAmount: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.black,
    color: colors.primary,
    marginBottom: 4,
  },
  vibeSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.cardBorder,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 16,
  },
  statAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 16,
    width: '47%',
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  actionSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  learnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  learnCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 16,
  },
  learnEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  learnTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  learnSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
});