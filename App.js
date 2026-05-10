import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './constants/colors';
import typography from './constants/typography';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Logo area */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>trove</Text>
        <Text style={styles.tagline}>spend for the life you want</Text>
      </View>

      {/* Stats preview */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>This month's vibe budget</Text>
        <Text style={styles.cardAmount}>₹12,500</Text>
        <Text style={styles.cardSub}>After rent, bills & EMIs</Text>
      </View>

      {/* CTA */}
      <View style={styles.button}>
        <Text style={styles.buttonText}>Get Started →</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.black,
    color: colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 8,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  cardAmount: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.background,
  },
});