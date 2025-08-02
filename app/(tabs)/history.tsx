import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Search,
  Clock,
  BookOpen,
  Tag,
  ChevronRight,
  Filter,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { getQuestions } from '../../services/history';
import { formatRelative } from 'date-fns';

type Question = {
  id: string;
  question: string;
  timestamp: string;
  subject: string;
  hasImage: boolean;
};

export default function HistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<Question[]>([]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'math', label: 'Math' },
    { id: 'science', label: 'Science' },
    { id: 'english', label: 'English' },
    { id: 'history', label: 'History' },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getQuestions();
        const formatted = data.map(q => ({
          ...q,
          timestamp: formatRelative(new Date(q.timestamp?.seconds * 1000), new Date()),
        }));
        setHistoryData(formatted);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      selectedFilter === null ||
      (selectedFilter === 'math' && item.subject === 'Mathematics') ||
      (selectedFilter === 'science' &&
        ['Biology', 'Chemistry', 'Physics'].includes(item.subject)) ||
      (selectedFilter === 'english' && item.subject === 'English') ||
      (selectedFilter === 'history' && item.subject === 'History');

    return matchesSearch && matchesFilter;
  });

  const renderHistoryItem = ({ item }: { item: Question }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => {
        router.push({
          pathname: '/(explanation)/explanation',
          params: { questionId: item.id },
        });
      }}
    >
      <View style={styles.historyContent}>
        <View style={styles.historyHeader}>
          <View style={styles.subjectTag}>
            <Text style={styles.subjectText}>{item.subject}</Text>
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.questionText} numberOfLines={2}>
          {item.question}
        </Text>
      </View>
      <ChevronRight size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>
          Review your past questions and explanations
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search
            size={20}
            color={theme.colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your questions..."
            placeholderTextColor={theme.colors.textPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.filterHeader}>
            <Filter size={16} color={theme.colors.textSecondary} />
            <Text style={styles.filterTitle}>Filters</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          >
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterItem,
                  selectedFilter === filter.id && styles.filterItemSelected,
                ]}
                onPress={() =>
                  setSelectedFilter(filter.id === selectedFilter ? null : filter.id)
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.filterTextSelected,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Clock size={20} color={theme.colors.primary} />
            <View>
              <Text style={styles.statValue}>{historyData.length}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <BookOpen size={20} color="#5E60CE" />
            <View>
              <Text style={styles.statValue}>
                {
                  [...new Set(historyData.map(item => item.subject))].length
                }
              </Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Tag size={20} color="#4CB944" />
            <View>
              <Text style={styles.statValue}>
                {
                  historyData.filter(item => item.hasImage).length
                }
              </Text>
              <Text style={styles.statLabel}>With Image</Text>
            </View>
          </View>
        </View>

        {filteredHistory.length > 0 ? (
          <FlatList
            data={filteredHistory}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.historyList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              No questions found matching your search.
            </Text>
          </View>
        )}
      </View>
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
    paddingHorizontal: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 12,
    marginBottom: 16,
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
  filtersContainer: {
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  filterTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  filtersList: {
    paddingVertical: 4,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundLight,
    marginRight: 8,
  },
  filterItemSelected: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  filterTextSelected: {
    color: 'white',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    gap: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.text,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  historyList: {
    paddingBottom: 100,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: 'rgba(62, 100, 255, 0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  subjectText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.primary,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.text,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});