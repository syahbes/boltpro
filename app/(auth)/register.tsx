import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isStepOneComplete = name.length > 0 && email.length > 0;
  const isStepTwoComplete = password.length >= 8;
  
  const handleContinue = () => {
    if (step === 1 && isStepOneComplete) {
      setStep(2);
    } else if (step === 2 && isStepTwoComplete) {
      handleRegister();
    }
  };

  const handleRegister = () => {
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[theme.colors.primary[400], theme.colors.primary[600]]}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => step === 1 ? router.back() : setStep(1)}
          >
            <ArrowLeft size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </LinearGradient>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressStepActive}>
            <CheckCircle2 size={24} color={theme.colors.white} />
          </View>
          <View style={[styles.progressLine, step >= 2 && styles.progressLineActive]} />
          <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]}>
            {step >= 2 ? (
              <CheckCircle2 size={24} color={theme.colors.white} />
            ) : (
              <Text style={styles.progressNumber}>2</Text>
            )}
          </View>
        </View>
        
        <View style={styles.formContainer}>
          {step === 1 ? (
            <>
              <Text style={styles.stepTitle}>Personal Information</Text>
              <Text style={styles.stepDescription}>Tell us a bit about yourself</Text>
              
              <View style={styles.inputContainer}>
                <User size={20} color={theme.colors.gray[400]} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={theme.colors.gray[400]}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              
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
            </>
          ) : (
            <>
              <Text style={styles.stepTitle}>Security</Text>
              <Text style={styles.stepDescription}>Create a secure password</Text>
              
              <View style={styles.inputContainer}>
                <Lock size={20} color={theme.colors.gray[400]} />
                <TextInput
                  style={styles.input}
                  placeholder="Password (minimum 8 characters)"
                  placeholderTextColor={theme.colors.gray[400]}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              
              <View style={styles.passwordStrength}>
                <Text style={styles.passwordStrengthText}>Password strength:</Text>
                <View style={styles.strengthMeter}>
                  <View 
                    style={[
                      styles.strengthIndicator, 
                      password.length >= 8 && styles.strengthIndicatorMedium,
                      password.length >= 12 && styles.strengthIndicatorStrong
                    ]} 
                  />
                </View>
                <Text style={styles.strengthText}>
                  {password.length < 8 ? 'Weak' : password.length < 12 ? 'Medium' : 'Strong'}
                </Text>
              </View>
            </>
          )}
          
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              ((step === 1 && !isStepOneComplete) || (step === 2 && !isStepTwoComplete)) && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={(step === 1 && !isStepOneComplete) || (step === 2 && !isStepTwoComplete) || isLoading}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'Creating Account...' : step === 1 ? 'Continue' : 'Create Account'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.white,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  progressStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLine: {
    flex: 0.25,
    height: 3,
    backgroundColor: theme.colors.gray[200],
  },
  progressLineActive: {
    backgroundColor: theme.colors.primary[600],
  },
  progressNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: theme.colors.gray[500],
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[500],
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: theme.colors.white,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  passwordStrength: {
    marginVertical: 16,
  },
  passwordStrengthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 8,
  },
  strengthMeter: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  strengthIndicator: {
    height: '100%',
    width: '33%',
    backgroundColor: theme.colors.error[500],
    borderRadius: 4,
  },
  strengthIndicatorMedium: {
    width: '66%',
    backgroundColor: theme.colors.warning[500],
  },
  strengthIndicatorStrong: {
    width: '100%',
    backgroundColor: theme.colors.success[500],
  },
  strengthText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  continueButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: theme.colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
  },
  loginLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.primary[600],
  },
});