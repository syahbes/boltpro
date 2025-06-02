import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={theme.colors.gray[800]} />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        {!isSubmitted ? (
          <>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.description}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            
            <View style={styles.inputContainer}>
              <Mail size={20} color={theme.colors.gray[400]} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={theme.colors.gray[400]}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.resetButton, !email && styles.resetButtonDisabled]}
              onPress={handleResetPassword}
              disabled={!email || isLoading}
            >
              <Text style={styles.resetButtonText}>
                {isLoading ? 'Sending...' : 'Reset Password'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <CheckCircle size={64} color={theme.colors.success[500]} />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successDescription}>
              We've sent a password reset link to {email}
            </Text>
            <TouchableOpacity 
              style={styles.backToLoginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 80,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  resetButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.white,
  },
  successContainer: {
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  successDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  backToLoginButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToLoginText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.white,
  },
});