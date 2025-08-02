import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(62, 100, 255, 0.1)', 'rgba(94, 96, 206, 0.05)']}
        style={styles.background}
      />
      
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Homework Helper</Text>
      </View>
      
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5905859/pexels-photo-5905859.jpeg' }}
          style={styles.heroImage}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Learn Smarter, Not Harder</Text>
        <Text style={styles.subtitle}>
          Get step-by-step explanations for any academic question, powered by AI
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/signup')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign Up</Text>
            <ArrowRight size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  logoContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.primary,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  heroImage: {
    width: '80%',
    height: 300,
    borderRadius: 16,
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    gap: 8,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
});