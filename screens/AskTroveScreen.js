import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import colors from '../constants/colors';
import typography from '../constants/typography';

const suggestions = [
  'Can I afford Lollapalooza tickets at ₹7,500?',
  'How much can I save this month?',
  'Can I go to Goa next month for ₹15,000?',
  'What if I save ₹2,000 more per month?',
];

export default function AskTroveScreen({ navigation, route }) {
  const { income, vibebudget } = route.params;
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `Hey! I'm Trove's math buddy. I can tell you if you can afford something based on your ₹${parseInt(vibebudget).toLocaleString('en-IN')} vibe budget. Ask me anything.`,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_API_KEY_HERE',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Trove's math buddy — a calculator that speaks English. 
          
The user's financial situation:
- Monthly income: ₹${income}
- Vibe budget (after fixed costs): ₹${vibebudget}

Your rules:
1. Only do math on the numbers provided. Never give opinions.
2. Never recommend specific financial products, stocks, mutual funds or investments.
3. Always show your calculation clearly.
4. Keep responses short — 3-4 lines maximum.
5. End every response with the disclaimer: "📚 This is a calculation, not financial advice."
6. If asked about investments, say: "I only do spending math. For investments, speak to a SEBI registered advisor."
7. Be friendly and direct. No lectures.`,
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      const reply = data.content[0].text;
      setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        text: 'Something went wrong. Please check your connection and try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ask Trove</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Math only</Text>
        </View>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          🧮 Trove does calculations only — not financial advice. Not SEBI registered.
        </Text>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
            <Text style={[styles.bubbleText, msg.role === 'user' ? styles.userText : styles.assistantText]}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.assistantBubble}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}

        {/* Suggestions */}
        {messages.length === 1 && (
          <View style={styles.suggestions}>
            <Text style={styles.suggestionsLabel}>Try asking</Text>
            {suggestions.map((s) => (
              <TouchableOpacity key={s} style={styles.suggestionChip} onPress={() => setInput(s)}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Can I afford...?"
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}
        >
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 64, paddingBottom: 16 },
  backText: { fontSize: typography.sizes.sm, color: colors.primary },
  headerTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary },
  headerBadge: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  headerBadgeText: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  disclaimer: { marginHorizontal: 24, backgroundColor: '#1A1500', borderWidth: 1, borderColor: '#333200', borderRadius: 10, padding: 10, marginBottom: 8 },
  disclaimerText: { fontSize: typography.sizes.xs, color: '#AAA080' },
  messages: { flex: 1 },
  messagesContent: { paddingHorizontal: 24, paddingVertical: 16, gap: 12 },
  bubble: { maxWidth: '85%', borderRadius: 16, padding: 14 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  assistantBubble: { alignSelf: 'flex-start', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder },
  bubbleText: { fontSize: typography.sizes.sm, lineHeight: 20 },
  userText: { color: colors.background, fontWeight: typography.weights.medium },
  assistantText: { color: colors.textPrimary },
  suggestions: { marginTop: 8 },
  suggestionsLabel: { fontSize: typography.sizes.xs, color: colors.textMuted, marginBottom: 8 },
  suggestionChip: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, marginBottom: 8, alignSelf: 'flex-start' },
  suggestionText: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 24, paddingVertical: 16, gap: 12, borderTopWidth: 1, borderTopColor: colors.cardBorder },
  input: { flex: 1, backgroundColor: colors.inputBackground, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, fontSize: typography.sizes.sm, color: colors.textPrimary, maxHeight: 100 },
  sendButton: { backgroundColor: colors.primary, borderRadius: 12, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  sendButtonDisabled: { opacity: 0.4 },
  sendButtonText: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.background },
});