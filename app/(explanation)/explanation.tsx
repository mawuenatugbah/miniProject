import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Share2, ThumbsUp, MessageCircle, Lightbulb } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { RelatedConceptCard } from '@/components/RelatedConceptCard';

export default function ExplanationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    question: string;
    image: string;
    explanation: string;
  }>();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (params.explanation) {
      setIsLoading(false);
    }
  }, [params.explanation]);

  const explanation = {
    title: params.question || 'Question',
    subject: 'General',
    steps: [
      {
        title: 'AI-Generated Explanation',
        content: params.explanation || 'No explanation received.',
      },
    ],
    relatedConcepts: [
      { id: '1', title: 'Critical Thinking', level: 'Beginner' },
      { id: '2', title: 'Problem Solving Strategies', level: 'Intermediate' },
    ],
    image: params.image,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setIsSaved(!isSaved)}
          >
            <Bookmark 
              size={24} 
              color={isSaved ? theme.colors.primary : theme.colors.textSecondary} 
              fill={isSaved ? theme.colors.primary : 'transparent'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Share2 size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Generating explanation...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.subjectTag}>
            <Text style={styles.subjectText}>{explanation.subject}</Text>
          </View>
          
          <Text style={styles.title}>{explanation.title}</Text>
          
          {explanation.image ? (
            <Image 
              source={{ uri: explanation.image }}
              style={styles.questionImage}
            />
          ) : null}
          
          <View style={styles.explanationContainer}>
            {explanation.steps.map((step, index) => (
              <View key={index} style={styles.step}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepContent}>{step.content}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>Was this explanation helpful?</Text>
            
            <View style={styles.feedbackButtons}>
              <TouchableOpacity style={styles.feedbackButton}>
                <ThumbsUp size={20} color={theme.colors.textSecondary} />
                <Text style={styles.feedbackButtonText}>Helpful</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.feedbackButton}>
                <MessageCircle size={20} color={theme.colors.textSecondary} />
                <Text style={styles.feedbackButtonText}>Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.relatedContainer}>
            <View style={styles.relatedHeader}>
              <Lightbulb size={20} color={theme.colors.primary} />
              <Text style={styles.relatedTitle}>Related Concepts</Text>
            </View>
            
            <View style={styles.relatedConcepts}>
              {explanation.relatedConcepts.map((concept) => (
                <RelatedConceptCard 
                  key={concept.id}
                  title={concept.title}
                  level={concept.level}
                  onPress={() => {/* Navigation can go here */}}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  subjectTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(62, 100, 255, 0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 12,
  },
  subjectText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 24,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  explanationContainer: {
    marginBottom: 32,
  },
  step: {
    marginBottom: 24,
  },
  stepTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 8,
  },
  stepContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  feedbackContainer: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  feedbackTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  feedbackButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  relatedContainer: {
    marginBottom: 32,
  },
  relatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  relatedTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
  },
  relatedConcepts: {
    gap: 12,
  },
});
