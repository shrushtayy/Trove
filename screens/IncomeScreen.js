import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

export default function IncomeScreen({ navigation }) {
  const [income, setIncome] = useState('');

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>Step 1 of 3</Text>
        <Text style={styles.title}>What's your monthly income?</Text>
        <Text style={styles.subtitle}>Your in-hand salary after tax. Not CTC.</Text>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.rupee}>₹</Text>
        <TextInput
          style={styles.input}
          placeholder="35000"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={income}
          onChangeText={setIncome}
          maxLength={7}
        />
      </View>

      {/* Quick select */}
      <Text style={styles.quickLabel}>Quick select</Text>
      <View style={styles.quickRow}>
        {['25000', '35000', '50000', '75000'].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[styles.chip, income === amount && styles.chipActive]}
            onPress={() => setIncome(amount)}
          >
            <Text style={[styles.chipText, income === amount && styles.chipTextActive]}>
              ₹{parseInt(amount).toLocaleString('en-IN')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.button, !income && styles.buttonDisabled]}
        onPress={() => income && navigation.navigate('Expenses', { income })}
      >
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  header: {
    marginBottom: 40,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  rupee: {
    fontSize: typography.sizes.xxl,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.xxl,
    color: colors.textPrimary,
    fontWeight: typography.weights.bold,
    paddingVertical: 20,
  },
  quickLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: '#1A2200',
  },
  chipText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
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