import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

const goalCategories = [
  { id: 'concert', emoji: '🎵', label: 'Concert' },
  { id: 'travel', emoji: '✈️', label: 'Travel' },
  { id: 'gadget', emoji: '📱', label: 'Gadget' },
  { id: 'food', emoji: '🍜', label: 'Dining' },
  { id: 'fashion', emoji: '👗', label: 'Fashion' },
  { id: 'other', emoji: '🎯', label: 'Other' },
];

export default function GoalsScreen({ navigation, route }) {
  const { vibebudget } = route.params;
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    amount: '',
    months: '',
    category: 'concert',
  });

  const addGoal = () => {
    if (!newGoal.title || !newGoal.amount || !newGoal.months) return;
    const monthlySaving = Math.ceil(parseInt(newGoal.amount) / parseInt(newGoal.months));
    setGoals(prev => [...prev, {
      ...newGoal,
      id: Date.now(),
      monthlySaving,
      saved: 0,
    }]);
    setNewGoal({ title: '', amount: '', months: '', category: 'concert' });
    setShowModal(false);
  };

  const totalMonthlyCommitment = goals.reduce((sum, g) => sum + g.monthlySaving, 0);
  const remainingAfterGoals = parseInt(vibebudget) - totalMonthlyCommitment;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your goals</Text>
        <Text style={styles.subtitle}>What do you want to do?</Text>

        {/* Budget impact */}
        {goals.length > 0 && (
          <View style={[styles.impactCard, remainingAfterGoals < 0 && styles.impactCardDanger]}>
            <Text style={styles.impactLabel}>After all goals</Text>
            <Text style={[styles.impactAmount, remainingAfterGoals < 0 && styles.impactAmountDanger]}>
              ₹{remainingAfterGoals.toLocaleString('en-IN')}/month
            </Text>
            <Text style={styles.impactSub}>
              {remainingAfterGoals < 0
                ? 'Your goals exceed your vibe budget'
                : 'Still available after saving for goals'}
            </Text>
          </View>
        )}

        {/* Goals list */}
        {goals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyTitle}>No goals yet</Text>
            <Text style={styles.emptySub}>Add your first goal — a concert, trip, or anything you want to do.</Text>
          </View>
        ) : (
          goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalEmoji}>
                  {goalCategories.find(c => c.id === goal.category)?.emoji}
                </Text>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalTarget}>₹{parseInt(goal.amount).toLocaleString('en-IN')} in {goal.months} months</Text>
                </View>
                <View style={styles.goalSaving}>
                  <Text style={styles.goalSavingAmount}>₹{goal.monthlySaving.toLocaleString('en-IN')}</Text>
                  <Text style={styles.goalSavingLabel}>per month</Text>
                </View>
              </View>
              <View style={styles.goalProgress}>
                <View style={styles.goalProgressFill} />
              </View>
              <Text style={styles.goalProgressText}>₹0 saved of ₹{parseInt(goal.amount).toLocaleString('en-IN')}</Text>
            </View>
          ))
        )}

      </ScrollView>

      {/* Add goal button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+ Add a goal</Text>
      </TouchableOpacity>

      {/* Add Goal Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New goal</Text>

            {/* Category selector */}
            <Text style={styles.modalLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {goalCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryChip, newGoal.category === cat.id && styles.categoryChipActive]}
                  onPress={() => setNewGoal(prev => ({ ...prev, category: cat.id }))}
                >
                  <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                  <Text style={[styles.categoryLabel, newGoal.category === cat.id && styles.categoryLabelActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Goal name */}
            <Text style={styles.modalLabel}>What's the goal?</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Lollapalooza 2026"
              placeholderTextColor={colors.textMuted}
              value={newGoal.title}
              onChangeText={(val) => setNewGoal(prev => ({ ...prev, title: val }))}
            />

            {/* Amount */}
            <Text style={styles.modalLabel}>How much does it cost?</Text>
            <View style={styles.modalInputRow}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput
                style={styles.modalInputInner}
                placeholder="7500"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={newGoal.amount}
                onChangeText={(val) => setNewGoal(prev => ({ ...prev, amount: val }))}
              />
            </View>

            {/* Months */}
            <Text style={styles.modalLabel}>How many months to save?</Text>
            <View style={styles.monthsRow}>
              {['1', '2', '3', '6', '9', '12'].map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.monthChip, newGoal.months === m && styles.monthChipActive]}
                  onPress={() => setNewGoal(prev => ({ ...prev, months: m }))}
                >
                  <Text style={[styles.monthChipText, newGoal.months === m && styles.monthChipTextActive]}>
                    {m}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Preview */}
            {newGoal.amount && newGoal.months && (
              <View style={styles.preview}>
                <Text style={styles.previewText}>
                  Save{' '}
                  <Text style={styles.previewHighlight}>
                    ₹{Math.ceil(parseInt(newGoal.amount) / parseInt(newGoal.months)).toLocaleString('en-IN')}/month
                  </Text>
                  {' '}for {newGoal.months} months
                </Text>
              </View>
            )}

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={addGoal}>
                <Text style={styles.saveText}>Add goal</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
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
    paddingBottom: 100,
  },
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.black,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  impactCard: {
    backgroundColor: '#0D1F00',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  impactCardDanger: {
    backgroundColor: '#1F0000',
    borderColor: colors.danger,
  },
  impactLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  impactAmount: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.black,
    color: colors.primary,
  },
  impactAmountDanger: {
    color: colors.danger,
  },
  impactSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  goalCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  goalTarget: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  goalSaving: {
    alignItems: 'flex-end',
  },
  goalSavingAmount: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  goalSavingLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  goalProgress: {
    height: 4,
    backgroundColor: colors.cardBorder,
    borderRadius: 2,
    marginBottom: 6,
  },
  goalProgressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    width: '0%',
  },
  goalProgressText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.background,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#141414',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.black,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryChip: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
    minWidth: 64,
  },
  categoryChipActive: {
    borderColor: colors.primary,
    backgroundColor: '#0D1F00',
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  categoryLabelActive: {
    color: colors.primary,
  },
  modalInput: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  modalInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  rupee: {
    fontSize: typography.sizes.lg,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginRight: 8,
  },
  modalInputInner: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    paddingVertical: 14,
  },
  monthsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  monthChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
  },
  monthChipActive: {
    borderColor: colors.primary,
    backgroundColor: '#0D1F00',
  },
  monthChipText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  monthChipTextActive: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  preview: {
    backgroundColor: '#0D1F00',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  previewText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  previewHighlight: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
  },
  cancelText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  saveText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.background,
  },
});