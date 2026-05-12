import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import colors from '../constants/colors';
import typography from '../constants/typography';

const factors = [
  { emoji: '✅', title: 'Payment history', impact: 'High impact', desc: 'Paying on time every month is the single biggest factor. Even one missed payment can drop your score by 50-100 points.' },
  { emoji: '📊', title: 'Credit utilization', impact: 'High impact', desc: 'Keep usage below 30% of your credit limit. Lower is better. High utilization signals financial stress to lenders.' },
  { emoji: '📅', title: 'Credit age', impact: 'Medium impact', desc: 'Older accounts help your score. Don\'t close your oldest credit card even if you don\'t use it much.' },
  { emoji: '🔍', title: 'Hard inquiries', impact: 'Low impact', desc: 'Every loan or card application triggers a hard inquiry. Too many in a short period hurts your score slightly.' },
  { emoji: '🗂️', title: 'Credit mix', impact: 'Low impact', desc: 'Having both secured (home loan) and unsecured (credit card) credit shows you can handle different types of debt.' },
];

const ranges = [
  { range: '300-549', label: 'Poor', color: colors.danger, desc: 'Loan applications likely rejected' },
  { range: '550-649', label: 'Fair', color: colors.warning, desc: 'High interest rates if approved' },
  { range: '650-749', label: 'Good', color: '#A8D63D', desc: 'Most loans approved at decent rates' },
  { range: '750-900', label: 'Excellent', color: colors.primary, desc: 'Best rates, easy approvals' },
];

export default function CIBILScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>CIBIL score explained</Text>
      <Text style={styles.subtitle}>Know what it is. Know how to improve it.</Text>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          📚 Trove does not access or store your CIBIL score. Check your actual score at cibil.com directly.
        </Text>
      </View>

      {/* What is CIBIL */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What is a CIBIL score?</Text>
        <Text style={styles.cardText}>
          Your CIBIL score is a 3-digit number between 300 and 900 that tells lenders how trustworthy you are with credit. The higher the number the easier it is to get loans, credit cards, and better interest rates. Think of it as your financial reputation score.
        </Text>
      </View>

      {/* Score ranges */}
      <Text style={styles.sectionTitle}>Score ranges</Text>
      {ranges.map((r) => (
        <View key={r.range} style={styles.rangeCard}>
          <View style={[styles.rangeBar, { backgroundColor: r.color }]} />
          <View style={styles.rangeInfo}>
            <View style={styles.rangeTop}>
              <Text style={styles.rangeNumber}>{r.range}</Text>
              <Text style={[styles.rangeLabel, { color: r.color }]}>{r.label}</Text>
            </View>
            <Text style={styles.rangeDesc}>{r.desc}</Text>
          </View>
        </View>
      ))}

      {/* Factors */}
      <Text style={styles.sectionTitle}>What affects your score</Text>
      {factors.map((f) => (
        <View key={f.title} style={styles.factorCard}>
          <View style={styles.factorHeader}>
            <Text style={styles.factorEmoji}>{f.emoji}</Text>
            <View style={styles.factorInfo}>
              <Text style={styles.factorTitle}>{f.title}</Text>
              <Text style={styles.factorImpact}>{f.impact}</Text>
            </View>
          </View>
          <Text style={styles.factorDesc}>{f.desc}</Text>
        </View>
      ))}

      {/* Check your score CTA */}
      <TouchableOpacity
        style={styles.cibilButton}
        onPress={() => Linking.openURL('https://www.cibil.com')}
      >
        <Text style={styles.cibilButtonText}>Check your score at cibil.com →</Text>
      </TouchableOpacity>

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
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 16, padding: 20, marginBottom: 24 },
  cardTitle: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 8 },
  cardText: { fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 22 },
  sectionTitle: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 12 },
  rangeCard: { flexDirection: 'row', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 12, marginBottom: 8, overflow: 'hidden' },
  rangeBar: { width: 4 },
  rangeInfo: { flex: 1, padding: 14 },
  rangeTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  rangeNumber: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  rangeLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold },
  rangeDesc: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  factorCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 14, padding: 16, marginBottom: 10 },
  factorHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  factorEmoji: { fontSize: 20, marginRight: 12 },
  factorInfo: { flex: 1 },
  factorTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  factorImpact: { fontSize: typography.sizes.xs, color: colors.textMuted },
  factorDesc: { fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 20 },
  cibilButton: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  cibilButtonText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.primary },
});