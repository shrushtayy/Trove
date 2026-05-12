import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

const lessons = [
  {
    id: 1,
    emoji: '💳',
    title: 'What is a credit card?',
    content: 'A credit card lets you spend money the bank lends you. You pay it back at the end of the billing cycle. Used correctly it is one of the most powerful financial tools available to you — free short term credit, rewards, and credit score building all in one.',
  },
  {
    id: 2,
    emoji: '📅',
    title: 'The billing cycle trick',
    content: 'Your billing cycle is typically 30 days. After it ends you get 15-20 days to pay. This means if you spend on day 1 of the cycle you get up to 45-50 days of completely free credit. No interest. No charges. Just free money temporarily.',
  },
  {
    id: 3,
    emoji: '📊',
    title: 'Credit utilization',
    content: 'Credit utilization is how much of your credit limit you use. If your limit is ₹1,00,000 and you spend ₹30,000 your utilization is 30%. Keep it below 30% always. Above 30% hurts your CIBIL score even if you pay on time.',
  },
  {
    id: 4,
    emoji: '⚠️',
    title: 'What happens if you miss a payment',
    content: 'Missing a payment is the worst thing you can do. You get charged 3-4% interest per month — that is 36-48% annually. Your CIBIL score drops significantly. Always pay at least the minimum due. Always set up autopay.',
  },
  {
    id: 5,
    emoji: '🎁',
    title: 'Rewards and cashback',
    content: 'Most credit cards give 1-5% back on spends as cashback, points, or miles. On ₹20,000 monthly spend at 2% cashback you earn ₹400/month — ₹4,800/year — for free. Just for using the card instead of UPI.',
  },
  {
    id: 6,
    emoji: '🛡️',
    title: 'Credit cards and CIBIL',
    content: 'Every on-time payment builds your CIBIL score. Every missed payment damages it. A credit card used responsibly for 2-3 years is the fastest way to build a strong credit history — which gets you better loans, lower interest rates, and more financial freedom later.',
  },
];

export default function CreditCoachScreen({ navigation }) {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const toggleLesson = (id) => {
    setExpanded(prev => prev === id ? null : id);
    if (!completed.includes(id)) {
      setCompleted(prev => [...prev, id]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Credit card coach</Text>
      <Text style={styles.subtitle}>Everything you need to know. Nothing you don't.</Text>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          📚 Educational content only — not a recommendation for any specific credit card product.
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>{completed.length} of {lessons.length} lessons read</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completed.length / lessons.length) * 100}%` }]} />
        </View>
      </View>

      {/* Lessons */}
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={[styles.lessonCard, completed.includes(lesson.id) && styles.lessonCardDone]}
          onPress={() => toggleLesson(lesson.id)}
        >
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonEmoji}>{lesson.emoji}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonChevron}>{expanded === lesson.id ? '↑' : '↓'}</Text>
          </View>
          {expanded === lesson.id && (
            <Text style={styles.lessonContent}>{lesson.content}</Text>
          )}
        </TouchableOpacity>
      ))}

      {completed.length === lessons.length && (
        <View style={styles.completedBanner}>
          <Text style={styles.completedText}>🎉 You've completed the credit card coach!</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 64, paddingBottom: 40 },
  backBtn: { marginBottom: 16 },
  backText: { fontSize: typography.sizes.sm, color: colors.primary },
  title: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.black, color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 16 },
  disclaimer: { backgroundColor: '#1A1500', borderWidth: 1, borderColor: '#333200', borderRadius: 12, padding: 12, marginBottom: 20 },
  disclaimerText: { fontSize: typography.sizes.xs, color: '#AAA080', lineHeight: 18 },
  progressRow: { marginBottom: 20 },
  progressText: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: colors.cardBorder, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 },
  lessonCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 16, padding: 16, marginBottom: 10 },
  lessonCardDone: { borderColor: colors.primary + '60' },
  lessonHeader: { flexDirection: 'row', alignItems: 'center' },
  lessonEmoji: { fontSize: 20, marginRight: 12 },
  lessonTitle: { flex: 1, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  lessonChevron: { fontSize: typography.sizes.sm, color: colors.textMuted },
  lessonContent: { fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 22, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.cardBorder },
  completedBanner: { backgroundColor: '#0D1F00', borderWidth: 1, borderColor: colors.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  completedText: { fontSize: typography.sizes.sm, color: colors.primary, fontWeight: typography.weights.bold },
});