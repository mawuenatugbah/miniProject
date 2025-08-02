import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Search, Book, ArrowRight, Zap, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function ConceptsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedConcepts, setSavedConcepts] = useState<string[]>(['calc-derivatives']);
  
  // Mock data
  const featuredConcepts = [
    { 
      id: 'calc-derivatives', 
      title: 'Calculus: Derivatives', 
      description: 'Learn the basics of derivatives and their applications',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg',
      level: 'Intermediate'
    },
    { 
      id: 'algebra-equations', 
      title: 'Algebra: Solving Equations', 
      description: 'Master the techniques for solving different types of equations',
      image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg',
      level: 'Beginner'
    },
    { 
      id: 'physics-motion', 
      title: 'Physics: Laws of Motion', 
      description: 'Understand Newton\'s laws and how they apply to motion',
      image: 'https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg',
      level: 'Intermediate'
    },
  ];
  
  const recommendedConcepts = [
    { 
      id: 'chem-periodic', 
      title: 'Chemistry: Periodic Table', 
      description: 'Learn about the elements and their properties',
      difficulty: 'Beginner'
    },
    { 
      id: 'bio-genetics', 
      title: 'Biology: Genetics', 
      description: 'Understand inheritance patterns and genetic principles',
      difficulty: 'Advanced'
    },
    { 
      id: 'stat-probability', 
      title: 'Statistics: Probability', 
      description: 'Master the fundamentals of probability theory',
      difficulty: 'Intermediate'
    },
  ];
  
  const toggleSaveConcept = (conceptId: string) => {
    if (savedConcepts.includes(conceptId)) {
      setSavedConcepts(savedConcepts.filter(id => id !== conceptId));
    } else {
      setSavedConcepts([...savedConcepts, conceptId]);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Concepts</Text>
        <Text style={styles.subtitle}>
          Explore topics and build your knowledge
        </Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search concepts..."
            placeholderTextColor={theme.colors.textPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Featured Concepts</Text>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
        >
          {featuredConcepts.map((concept) => (
            <TouchableOpacity 
              key={concept.id}
              style={styles.featuredCard}
              onPress={() => {/* Navigate to concept details */}}
            >
              <Image source={{ uri: concept.image }} style={styles.featuredImage} />
              <View style={styles.featuredOverlay}>
                <View style={styles.featuredContent}>
                  <View style={styles.featuredMeta}>
                    <Text style={styles.featuredLevel}>{concept.level}</Text>
                    <TouchableOpacity
                      onPress={() => toggleSaveConcept(concept.id)}
                      style={styles.saveButton}
                    >
                      {savedConcepts.includes(concept.id) ? (
                        <BookmarkCheck size={20} color={theme.colors.primary} />
                      ) : (
                        <Bookmark size={20} color="white" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.featuredTitle}>{concept.title}</Text>
                  <Text style={styles.featuredDescription} numberOfLines={2}>
                    {concept.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: 'rgba(62, 100, 255, 0.1)' }]}>
                <Book size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.categoryTitle}>Mathematics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: 'rgba(76, 185, 68, 0.1)' }]}>
                <Zap size={24} color="#4CB944" />
              </View>
              <Text style={styles.categoryTitle}>Physics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: 'rgba(243, 121, 32, 0.1)' }]}>
                <Book size={24} color="#F37920" />
              </View>
              <Text style={styles.categoryTitle}>Chemistry</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: 'rgba(94, 96, 206, 0.1)' }]}>
                <Book size={24} color="#5E60CE" />
              </View>
              <Text style={styles.categoryTitle}>Biology</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          
          {recommendedConcepts.map((concept) => (
            <TouchableOpacity 
              key={concept.id}
              style={styles.recommendedCard}
              onPress={() => {/* Navigate to concept details */}}
            >
              <View style={styles.recommendedContent}>
                <Text style={styles.recommendedTitle}>{concept.title}</Text>
                <Text style={styles.recommendedDescription} numberOfLines={1}>
                  {concept.description}
                </Text>
                <View style={styles.recommendedMeta}>
                  <Text 
                    style={[
                      styles.recommendedDifficulty,
                      concept.difficulty === 'Beginner' && styles.difficultyBeginner,
                      concept.difficulty === 'Intermediate' && styles.difficultyIntermediate,
                      concept.difficulty === 'Advanced' && styles.difficultyAdvanced,
                    ]}
                  >
                    {concept.difficulty}
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 16,
    marginHorizontal: 24,
  },
  featuredContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  featuredCard: {
    width: 280,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredLevel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saveButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 4,
  },
  featuredDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  categoriesSection: {
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  recommendedSection: {
    paddingHorizontal: 24,
  },
  recommendedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  recommendedContent: {
    flex: 1,
  },
  recommendedTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  recommendedDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  recommendedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedDifficulty: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyBeginner: {
    backgroundColor: 'rgba(76, 185, 68, 0.1)',
    color: '#4CB944',
  },
  difficultyIntermediate: {
    backgroundColor: 'rgba(243, 121, 32, 0.1)',
    color: '#F37920',
  },
  difficultyAdvanced: {
    backgroundColor: 'rgba(219, 68, 55, 0.1)',
    color: '#DB4437',
  },
});