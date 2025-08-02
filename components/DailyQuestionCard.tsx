import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export function DailyQuestionCard() {
  const router = useRouter();
  
  // Mock daily question
  const dailyQuestion = {
    id: 'daily-1',
    question: 'What is the relationship between electric field and electric potential?',
    subject: 'Physics',
    xpReward: 50,
  };
  
  const handlePress = () => {
    router.push({
      pathname: '/(explanation)/explanation',
      params: { questionId: dailyQuestion.id }
    });
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Calendar size={20} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>Daily Question</Text>
        </View>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{dailyQuestion.xpReward} XP</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectText}>{dailyQuestion.subject}</Text>
        </View>
        <Text style={styles.questionText}>{dailyQuestion.question}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Answer to earn XP</Text>
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
  },
  xpBadge: {
    backgroundColor: 'rgba(76, 185, 68, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  xpText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4CB944',
  },
  content: {
    padding: 16,
  },
  subjectTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(62, 100, 255, 0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  subjectText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.primary,
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  footerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});