import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { BrainCircuit, Trophy, Flame, ChevronRight, Award } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { ProgressBar } from '@/components/ProgressBar';
import { DailyQuestionCard } from '@/components/DailyQuestionCard';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [dailyStreak, setDailyStreak] = useState(7);
  const [xp, setXp] = useState(2450);
  const [level, setLevel] = useState(5);
  const [xpForNextLevel, setXpForNextLevel] = useState(3000);
  
  // Mock data
  const recommendedTopics = [
    { id: '1', title: 'Calculus', icon: '🧮', progress: 45 },
    { id: '2', title: 'Chemistry', icon: '⚗️', progress: 30 },
    { id: '3', title: 'Physics', icon: '🔭', progress: 65 },
  ];
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, {user?.name || 'Student'}!</Text>
          <Text style={styles.subtitle}>Ready to learn something new?</Text>
        </View>
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={() => router.push('/profile')}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(62, 100, 255, 0.1)' }]}>
            <BrainCircuit size={20} color={theme.colors.primary} />
          </View>
          <View>
            <Text style={styles.statTitle}>Level {level}</Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={(xp / xpForNextLevel) * 100}
                height={4}
                backgroundColor={theme.colors.primary}
              />
              <Text style={styles.progressText}>{xp}/{xpForNextLevel} XP</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(243, 121, 32, 0.1)' }]}>
            <Flame size={20} color="#F37920" />
          </View>
          <View>
            <Text style={styles.statTitle}>{dailyStreak} day streak</Text>
            <Text style={styles.statSubtitle}>Keep it going!</Text>
          </View>
        </View>
      </View>
      
      <DailyQuestionCard />
      
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Award size={20} color={theme.colors.primary} />
          <Text style={styles.sectionTitle}>Recommended Topics</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/concepts')}>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {recommendedTopics.map((topic) => (
        <TouchableOpacity 
          key={topic.id}
          style={styles.topicCard}
          onPress={() => {/* Navigate to topic */}}
        >
          <View style={styles.topicIcon}>
            <Text style={styles.topicIconText}>{topic.icon}</Text>
          </View>
          <View style={styles.topicContent}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <View style={styles.topicProgressContainer}>
              <ProgressBar
                progress={topic.progress}
                height={4}
                backgroundColor={theme.colors.primary}
              />
              <Text style={styles.topicProgressText}>{topic.progress}%</Text>
            </View>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      ))}
      
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Trophy size={20} color={theme.colors.primary} />
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.achievementsContainer}>
        <View style={styles.achievementCard}>
          <View style={styles.achievementIconContainer}>
            <Flame size={24} color="#F37920" />
          </View>
          <Text style={styles.achievementTitle}>7 Day Streak</Text>
        </View>
        
        <View style={[styles.achievementCard, styles.achievementCardLocked]}>
          <View style={[styles.achievementIconContainer, styles.achievementIconLocked]}>
            <BrainCircuit size={24} color={theme.colors.textSecondary} />
          </View>
          <Text style={styles.achievementTitleLocked}>Master Explainer</Text>
        </View>
        
        <View style={styles.achievementCard}>
          <View style={styles.achievementIconContainer}>
            <Award size={24} color="#4CB944" />
          </View>
          <Text style={styles.achievementTitle}>First Question</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.text,
  },
  statSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    width: '100%',
    marginTop: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
  },
  seeAllButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  topicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicIconText: {
    fontSize: 20,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  topicProgressContainer: {
    width: '100%',
  },
  topicProgressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  achievementCard: {
    alignItems: 'center',
    width: '30%',
  },
  achievementIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(76, 185, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.text,
    textAlign: 'center',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIconLocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  achievementTitleLocked: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});