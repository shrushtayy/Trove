import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

const categories = ['Entertainment', 'Food', 'Fitness', 'Productivity', 'Other'];

export default function SubscriptionsScreen({ navigation, route }) {
  const [subs, setSubs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSub, setNewSub] = useState({ name: '', amount: '', category: 'Entertainment', lastUsed: 'This week' });

  const totalMonthly = subs.reduce((sum, s) => sum + (parseInt(s.amount) || 0), 0);
  const totalAnnual = totalMonthly * 12;
  const ghostSubs = subs.filter(s => s.lastUsed === 'Over a month ago');

  const addSub = () => {
    if (!newSub.name || !newSub.amount) return;
    setSubs(prev => [...prev, { ...newSub, id: Date.now() }]);
    setNewSub({ name: '', amount: '', category: 'Entertainment', lastUsed: 'This week' });
    setShowModal(false);
  };

  const removeSub = (id) => setSubs(prev => prev.filter(s => s.id !== id));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Subscription graveyard</Text>
        <Text style={styles.subtitle}>Find what's silently draining you</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statAmount}>₹{totalMonthly.toLocaleString('en-IN')}</Text>
            <Text style={styles.statLabel}>Monthly burn</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statAmount}>₹{totalAnnual.toLocaleString('en-IN')}</Text>
            <Text style={styles.statLabel}>Annual burn</Text>
          </View>
          <View style={[styles.statCard, ghostSubs.length > 0 && styles.statCardDanger]}>
            <Text style={[styles.statAmount, ghostSubs.length > 0 && styles.statAmountDanger]}>
              {ghostSubs.length}
            </Text>
            <Text style={styles.statLabel}>Ghost subs 👻</Text>
          </View>
        </View>

        {/* Ghost warning */}
        {ghostSubs.length > 0 && (
          <View style={styles.ghostWarning}>
            <Text style={styles.ghostTitle}>👻 You're paying for things you don't use</Text>
            <Text style={styles.ghostSub}>
              ₹{ghostSubs.reduce((s, g) => s + parseInt(g.amount), 0).toLocaleString('en-IN')}/month on unused subscriptions
            </Text>
          </View>
        )}

        {/* Subscriptions list */}
        {subs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>👻</Text>
            <Text style={styles.emptyTitle}>No subscriptions added</Text>
            <Text style={styles.emptySub}>Add your subscriptions to see what's draining you silently.</Text>
          </View>
        ) : (
          subs.map((sub) => (
            <View key={sub.id} style={[styles.subCard, sub.lastUsed === 'Over a month ago' && styles.subCardGhost]}>
              <View style={styles.subLeft}>
                {sub.lastUsed === 'Over a month ago' && <Text style={styles.ghostTag}>👻 Ghost</Text>}
                <Text style={styles.subName}>{sub.name}</Text>
                <Text style={styles.subCategory}>{sub.category} · Last used: {sub.lastUsed}</Text>
              </View>
              <View style={styles.subRight}>
                <Text style={styles.subAmount}>₹{parseInt(sub.amount).toLocaleString('en-IN')}/mo</Text>
                <TouchableOpacity onPress={() => removeSub(sub.id)}>
                  <Text style={styles.cancelSub}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+ Add subscription</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add subscription</Text>

            <Text style={styles.modalLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Netflix, Spotify, Gym..."
              placeholderTextColor={colors.textMuted}
              value={newSub.name}
              onChangeText={(val) => setNewSub(prev => ({ ...prev, name: val }))}
            />

            <Text style={styles.modalLabel}>Monthly cost</Text>
            <View style={styles.modalInputRow}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput
                style={styles.modalInputInner}
                placeholder="299"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={newSub.amount}
                onChangeText={(val) => setNewSub(prev => ({ ...prev, amount: val }))}
              />
            </View>

            <Text style={styles.modalLabel}>Last used</Text>
            <View style={styles.lastUsedRow}>
              {['This week', 'This month', 'Over a month ago'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.lastUsedChip, newSub.lastUsed === opt && styles.lastUsedChipActive]}
                  onPress={() => setNewSub(prev => ({ ...prev, lastUsed: opt }))}
                >
                  <Text style={[styles.lastUsedText, newSub.lastUsed === opt && styles.lastUsedTextActive]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={addSub}>
                <Text style={styles.saveText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 64, paddingBottom: 100 },
  backBtn: { marginBottom: 16 },
  backText: { fontSize: typography.sizes.sm, color: colors.primary },
  title: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.black, color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 12, padding: 12 },
  statCardDanger: { borderColor: colors.danger },
  statAmount: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 2 },
  statAmountDanger: { color: colors.danger },
  statLabel: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  ghostWarning: { backgroundColor: '#1F0A00', borderWidth: 1, borderColor: colors.warning, borderRadius: 12, padding: 16, marginBottom: 16 },
  ghostTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.warning, marginBottom: 4 },
  ghostSub: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 8 },
  emptySub: { fontSize: typography.sizes.sm, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  subCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subCardGhost: { borderColor: '#333', backgroundColor: '#1A1000' },
  subLeft: { flex: 1 },
  ghostTag: { fontSize: typography.sizes.xs, color: colors.warning, marginBottom: 4 },
  subName: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 2 },
  subCategory: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  subRight: { alignItems: 'flex-end', gap: 8 },
  subAmount: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.primary },
  cancelSub: { fontSize: typography.sizes.xs, color: colors.danger },
  addButton: { position: 'absolute', bottom: 32, left: 24, right: 24, backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  addButtonText: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.background },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#141414', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.black, color: colors.textPrimary, marginBottom: 20 },
  modalLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 8 },
  modalInput: { backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: typography.sizes.md, color: colors.textPrimary, marginBottom: 16 },
  modalInputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 },
  rupee: { fontSize: typography.sizes.lg, color: colors.primary, fontWeight: typography.weights.bold, marginRight: 8 },
  modalInputInner: { flex: 1, fontSize: typography.sizes.md, color: colors.textPrimary, paddingVertical: 14 },
  lastUsedRow: { flexDirection: 'row', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  lastUsedChip: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 20 },
  lastUsedChipActive: { borderColor: colors.primary, backgroundColor: '#0D1F00' },
  lastUsedText: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  lastUsedTextActive: { color: colors.primary },
  modalButtons: { flexDirection: 'row', gap: 12 },
  cancelButton: { flex: 1, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 12 },
  cancelText: { fontSize: typography.sizes.md, color: colors.textSecondary },
  saveButton: { flex: 1, paddingVertical: 14, alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12 },
  saveText: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.background },
});