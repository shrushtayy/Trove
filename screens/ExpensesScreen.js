import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

export default function ExpensesScreen({ navigation, route }) {
  const { income } = route.params;
  const [expenses, setExpenses] = useState({
    rent: '',
    emi: '',
    subscriptions: '',
    other: '',
  });

  const total = Object.values(expenses).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
  const vibebudget = parseInt(income) - total;

  const updateExpense = (key, value) => {
    setExpenses(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>Step 2 of 3</Text>
        <Text style={styles.title}>Your fixed expenses</Text>
        <Text style={styles.subtitle}>What goes out every month no matter what.</Text>
      </View>

      {/* Inputs */}
      {[
        { key: 'rent', label: 'Rent / PG', placeholder: '12000' },
        { key: 'emi', label: 'EMIs', placeholder: '5000' },
        { key: 'subscriptions', label: 'Subscriptions', placeholder: '1500' },
        { key: 'other', label: 'Other fixed costs', placeholder: '2000' },
      ].map((item) => (
        <View key={item.key} style={styles.inputRow}>
          <Text style={styles.inputLabel}>{item.label}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={styles.input}
              placeholder={item.placeholder}
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={expenses[item.key]}
              onChangeText={(val) => updateExpense(item.key, val)}
            />
          </View>
        </View>
      ))}

      {/* Vibe budget preview */}
      <View style={[styles.preview, vibebudget < 0 && styles.previewDanger]}>
        <Text style={styles.previewLabel}>Your vibe budget</Text>
        <Text style={[styles.previewAmount, vibebudget < 0 && styles.previewAmountDanger]}>
          ₹{vibebudget.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.previewSub}>
          {vibebudget < 0 ? 'Your expenses exceed your income' : 'Left after all fixed costs'}
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Personality', { income, expenses, vibebudget })}
      >
        <Text style={styles.buttonText}>Next →</Text>
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
  inputRow: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  rupee: {
    fontSize: typography.sizes.lg,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.lg,
    color: colors.textPrimary,
    paddingVertical: 14,
  },
  preview: {
    backgroundColor: '#0D1F00',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 32,
    alignItems: 'center',
  },
  previewDanger: {
    backgroundColor: '#1F0000',
    borderColor: colors.danger,
  },
  previewLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  previewAmount: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.black,
    color: colors.primary,
  },
  previewAmountDanger: {
    color: colors.danger,
  },
  previewSub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.background,
  },
});