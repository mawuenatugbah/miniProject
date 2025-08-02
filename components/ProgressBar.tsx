import { View, StyleSheet } from 'react-native';

type ProgressBarProps = {
  progress: number;
  height?: number;
  backgroundColor?: string;
  trackColor?: string;
};

export function ProgressBar({ 
  progress, 
  height = 8, 
  backgroundColor = '#3E64FF', 
  trackColor = 'rgba(0, 0, 0, 0.1)' 
}: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={[
      styles.container,
      { height, backgroundColor: trackColor }
    ]}>
      <View 
        style={[
          styles.progress,
          { 
            width: `${validProgress}%`,
            backgroundColor,
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});