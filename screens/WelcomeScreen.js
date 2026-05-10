import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../constants/colors';
import typography from '../constants/typography';

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>trove</Text>
        <Text style={styles.tagline}>plan for everything you want to do</Text>
      </View>

      {/* What Trove does */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What Trove does</Text>
        <Text style={styles.cardItem}>💚  Shows your real spendable money</Text>
        <Text style={styles.cardItem}>🎯  Helps you save for concerts & trips</Text>
        <Text style={styles.cardItem}>👻  Finds subscriptions draining you</Text>
        <Text style={styles.cardItem}>🧮  Tells you if you can afford something</Text>
      </View>

      {/* SEBI Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>Important notice</Text>
        <Text style={styles.disclaimerText}>
          Trove is a personal finance planning tool for educational purposes only. 
          Trove is not a SEBI registered investment advisor and does not provide 
          investment advice. All calculations are based on information you provide. 
          For investment decisions, consult a SEBI registered advisor.
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Income')}
      >
        <Text style={styles.buttonText}>Let's plan your life →</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardItem: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  disclaimer: {
    backgroundColor: '#1A1500',
    borderWidth: 1,
    borderColor: '#333200',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  disclaimerTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.warning,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: typography.sizes.xs,
    color: '#AAA080',
    lineHeight: 18,
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