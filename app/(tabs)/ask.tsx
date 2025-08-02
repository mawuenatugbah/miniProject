import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Camera, Image as ImageIcon, X, Send, Loader as Loader2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { askQuestion } from '@/services/ai';
import { useCameraPermissions } from 'expo-camera';

export default function AskScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        return;
      }
    }
    // For this demo, we'll simulate uploading an image
    setImage('https://images.pexels.com/photos/8473654/pexels-photo-8473654.jpeg');
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

const handleSubmitQuestion = async () => {
  if (!question.trim() && !image) return;

  setIsLoading(true);

  try {
    const explanation = await askQuestion({
      question: question.trim(),
    });

    setIsLoading(false);

    router.push({
      pathname: '/(explanation)/explanation',
      params: {
        question: question.trim(),
        image: image || '',
        explanation,
      },
    });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    setIsLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ask a Question</Text>
        <Text style={styles.subtitle}>
          Get step-by-step explanations with AI
        </Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your question here..."
            placeholderTextColor={theme.colors.textPlaceholder}
            multiline
            value={question}
            onChangeText={setQuestion}
          />
          
          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={handleRemoveImage}
              >
                <X size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={handleOpenCamera}
            >
              <Camera size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.imageButton}
              onPress={() => {/* Implement image upload */}}
            >
              <ImageIcon size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Example questions</Text>
          
          <TouchableOpacity 
            style={styles.exampleCard}
            onPress={() => setQuestion('What is the quadratic formula and how do I use it?')}
          >
            <Text style={styles.exampleQuestion}>
              What is the quadratic formula and how do I use it?
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleCard}
            onPress={() => setQuestion('Explain how photosynthesis works in plants.')}
          >
            <Text style={styles.exampleQuestion}>
              Explain how photosynthesis works in plants.
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleCard}
            onPress={() => setQuestion('How do I find the derivative of sin(x²)?')}
          >
            <Text style={styles.exampleQuestion}>
              How do I find the derivative of sin(x²)?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!question.trim() && !image) && styles.submitButtonDisabled,
            isLoading && styles.submitButtonLoading
          ]}
          onPress={handleSubmitQuestion}
          disabled={(!question.trim() && !image) || isLoading}
        >
          {isLoading ? (
            <Loader2 size={24} color="white" style={styles.loadingIcon} />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Get explanation</Text>
              <Send size={20} color="white" />
            </>
          )}
        </TouchableOpacity>
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
  },
  contentContainer: {
    padding: 24,
    paddingTop: 0,
  },
  inputContainer: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    minHeight: 160,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    marginTop: 16,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
  cameraButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(62, 100, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(62, 100, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  examplesContainer: {
    marginBottom: 24,
  },
  examplesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 16,
  },
  exampleCard: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exampleQuestion: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.disabledBackground,
  },
  submitButtonLoading: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  loadingIcon: {
    // Add rotating animation in a real implementation
  },
});