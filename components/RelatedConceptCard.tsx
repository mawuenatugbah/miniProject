import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type RelatedConceptCardProps = {
  title: string;
  level: string;
  onPress: () => void;
};

export function RelatedConceptCard({ title, level, onPress }: RelatedConceptCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[
          styles.level,
          level === 'Beginner' && styles.beginnerLevel,
          level === 'Intermediate' && styles.intermediateLevel,
          level === 'Advanced' && styles.advancedLevel,
        ]}>
          {level}
        </Text>
      </View>
      <ArrowRight size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  level: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  beginnerLevel: {
    backgroundColor: 'rgba(76, 185, 68, 0.1)',
    color: '#4CB944',
  },
  intermediateLevel: {
    backgroundColor: 'rgba(243, 121, 32, 0.1)',
    color: '#F37920',
  },
  advancedLevel: {
    backgroundColor: 'rgba(219, 68, 55, 0.1)',
    color: '#DB4437',
  },
});