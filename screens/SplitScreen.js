import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Linking } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

export default function SplitScreen({ navigation }) {
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('2');
  const [splits, setSplits] = useState([]);

  const perPerson = total && people ? Math.ceil(parseInt(total) / parseInt(people)) : 0;

  const openUPI = (amount) => {
    const upiUrl = `upi://pay?am=${amount}&cu=INR`;
    Linking.openURL(upiUrl).catch(() => {
      alert('No UPI app found. Please install GPay or PhonePe.');
    });
  };

  const addSplit = () => {
    if (!total || !people) return;
    setSplits(prev => [...prev, {
      id: Date.now(),
      total: parseInt(total),
      people: parseInt(people),
      perPerson,
      date: new Date().toLocaleDateString('en-IN'),
    }]);
    setTotal('');
    setPeople('2');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Split bill</Text>
        <Text style={styles.subtitle}>Split with friends, pay via UPI</Text>

        {/* Calculator */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>New split</Text>

          <Text style={styles.label}>Total bill</Text>
          <View style={styles.inputRow}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={styles.input}
              placeholder="2400"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={total}
              onChangeText={setTotal}
            />
          </View>

          <Text style={styles.label}>Number of people</Text>
          <View style={styles.peopleRow}>
            {['2', '3', '4', '5', '6'].map((n) => (
              <TouchableOpacity
                key={n}
                style={[styles.peopleChip, people === n && styles.peopleChipActive]}
                onPress={() => setPeople(n)}
              >
                <Text style={[styles.peopleText, people === n && styles.peopleTextActive]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {perPerson > 0 && (
            <View style={styles.result}>
              <Text style={styles.resultLabel}>Each person pays</Text>
              <Text style={styles.resultAmount}>₹{perPerson.toLocaleString('en-IN')}</Text>
              <TouchableOpacity style={styles.upiButton} onPress={() => openUPI(perPerson)}>
                <Text style={styles.upiButtonText}>Request via UPI →</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.addButton, (!total || !people) && styles.addButtonDisabled]}
            onPress={addSplit}
          >
            <Text style={styles.addButtonText}>Save split</Text>
          </TouchableOpacity>
        </View>

        {/* History */}
        {splits.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recent splits</Text>
            {splits.map((split) => (
              <View key={split.id} style={styles.historyCard}>
                <View>
                  <Text style={styles.historyAmount}>₹{split.total.toLocaleString('en-IN')} total</Text>
                  <Text style={styles.historyDetail}>{split.people} people · ₹{split.perPerson.toLocaleString('en-IN')} each · {split.date}</Text>
                </View>
                <TouchableOpacity onPress={() => openUPI(split.perPerson)}>
                  <Text style={styles.upiLink}>Pay →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 64, paddingBottom: 40 },
  backBtn: { marginBottom: 16 },
  backText: { fontSize: typography.sizes.sm, color: colors.primary },
  title: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.black, color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 24 },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 20, padding: 20, marginBottom: 24 },
  cardTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 16 },
  label: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16 },
  rupee: { fontSize: typography.sizes.lg, color: colors.primary, fontWeight: typography.weights.bold, marginRight: 8 },
  input: { flex: 1, fontSize: typography.sizes.lg, color: colors.textPrimary, paddingVertical: 14 },
  peopleRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  peopleChip: { flex: 1, alignItems: 'center', paddingVertical: 10, backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 10 },
  peopleChipActive: { borderColor: colors.primary, backgroundColor: '#0D1F00' },
  peopleText: { fontSize: typography.sizes.md, color: colors.textSecondary, fontWeight: typography.weights.bold },
  peopleTextActive: { color: colors.primary },
  result: { backgroundColor: '#0D1F00', borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center' },
  resultLabel: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 4 },
  resultAmount: { fontSize: typography.sizes.xxxl, fontWeight: typography.weights.black, color: colors.primary, marginBottom: 12 },
  upiButton: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 24 },
  upiButtonText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.background },
  addButton: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  addButtonDisabled: { opacity: 0.4 },
  addButtonText: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.background },
  sectionTitle: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 12 },
  historyCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyAmount: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 2 },
  historyDetail: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  upiLink: { fontSize: typography.sizes.sm, color: colors.primary, fontWeight: typography.weights.bold },
});