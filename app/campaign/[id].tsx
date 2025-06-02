import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle,
  Share,
  Bookmark,
  MessageSquare
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { getCampaigns } from '@/data/campaigns';
import { getBrands } from '@/data/brands';

export default function CampaignScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Find the campaign based on the ID
  const campaign = getCampaigns().find(c => c.id === id);
  const brand = campaign ? getBrands().find(b => b.name === campaign.brandName) : null;
  
  if (!campaign || !brand) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Campaign not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleApply = () => {
    Alert.alert(
      "Apply to Campaign",
      "Are you sure you want to apply to this campaign?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Apply",
          onPress: () => {
            // Handle application logic
            Alert.alert(
              "Application Submitted",
              "Your application has been submitted successfully. The brand will review your profile and get back to you soon."
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: campaign.image }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={styles.headerGradient}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerActionButton}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark 
                size={24} 
                color={theme.colors.white}
                fill={isBookmarked ? theme.colors.white : 'transparent'} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionButton}>
              <Share size={24} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusBadge,
                { 
                  backgroundColor: 
                    campaign.status === 'Active' 
                      ? theme.colors.success[50]
                      : campaign.status === 'Pending'
                        ? theme.colors.warning[50]
                        : theme.colors.gray[50]
                }
              ]}
            >
              <Text 
                style={[
                  styles.statusText,
                  { 
                    color: 
                      campaign.status === 'Active' 
                        ? theme.colors.success[600]
                        : campaign.status === 'Pending'
                          ? theme.colors.warning[600]
                          : theme.colors.gray[600]
                  }
                ]}
              >
                {campaign.status}
              </Text>
            </View>
          </View>
          
          <Text style={styles.campaignTitle}>{campaign.title}</Text>
          
          <TouchableOpacity 
            style={styles.brandContainer}
            onPress={() => router.push(`/brand/${brand.id}`)}
          >
            <Image
              source={{ uri: brand.logo }}
              style={styles.brandLogo}
            />
            <View>
              <Text style={styles.brandName}>{brand.name}</Text>
              <View style={styles.brandCategoryRow}>
                {brand.categories.slice(0, 2).map((category, index) => (
                  <Text key={index} style={styles.brandCategory}>
                    {category}{index < Math.min(brand.categories.length, 2) - 1 ? ', ' : ''}
                  </Text>
                ))}
                {brand.categories.length > 2 && (
                  <Text style={styles.brandCategory}>+{brand.categories.length - 2} more</Text>
                )}
              </View>
            </View>
            <MessageSquare size={20} color={theme.colors.primary[600]} style={styles.messageIcon} />
          </TouchableOpacity>
          
          <View style={styles.tagsContainer}>
            {campaign.tags.map((tag, index) => (
              <View key={index} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Calendar size={20} color={theme.colors.primary[600]} />
              <View style={styles.infoCardTextContainer}>
                <Text style={styles.infoCardLabel}>Duration</Text>
                <Text style={styles.infoCardValue}>{campaign.duration}</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <DollarSign size={20} color={theme.colors.success[600]} />
              <View style={styles.infoCardTextContainer}>
                <Text style={styles.infoCardLabel}>Compensation</Text>
                <Text style={styles.infoCardValue}>{campaign.compensation}</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Clock size={20} color={theme.colors.warning[600]} />
              <View style={styles.infoCardTextContainer}>
                <Text style={styles.infoCardLabel}>Deadline</Text>
                <Text style={styles.infoCardValue}>{campaign.endDate}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campaign Details</Text>
            <Text style={styles.descriptionText}>
              {campaign.description}
              {"\n\n"}
              We're looking for authentic content creators who can showcase our products in a natural and engaging way. This campaign aims to highlight the versatility and quality of our products while reaching new audiences.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <Text style={styles.requirementText}>{campaign.requirements}</Text>
            <View style={styles.requirementsList}>
              <View style={styles.requirementItem}>
                <CheckCircle size={20} color={theme.colors.success[500]} />
                <Text style={styles.requirementItemText}>High-quality, well-lit photos/videos</Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckCircle size={20} color={theme.colors.success[500]} />
                <Text style={styles.requirementItemText}>Creative, authentic content showcasing products</Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckCircle size={20} color={theme.colors.success[500]} />
                <Text style={styles.requirementItemText}>Use specific hashtags provided by brand</Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckCircle size={20} color={theme.colors.success[500]} />
                <Text style={styles.requirementItemText}>Mention and tag brand in all posts</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Timeline</Text>
            <View style={styles.timelineContainer}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>Now - {campaign.startDate}</Text>
                  <Text style={styles.timelineTitle}>Application Period</Text>
                  <Text style={styles.timelineDescription}>Submit your application and get selected by the brand</Text>
                </View>
              </View>
              <View style={[styles.timelineConnector, { backgroundColor: theme.colors.primary[200] }]} />
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: theme.colors.primary[400] }]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{campaign.startDate} - {campaign.endDate}</Text>
                  <Text style={styles.timelineTitle}>Content Creation</Text>
                  <Text style={styles.timelineDescription}>Create and publish content according to requirements</Text>
                </View>
              </View>
              <View style={[styles.timelineConnector, { backgroundColor: theme.colors.gray[300] }]} />
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: theme.colors.gray[400] }]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>After {campaign.endDate}</Text>
                  <Text style={styles.timelineTitle}>Review & Payment</Text>
                  <Text style={styles.timelineDescription}>Content review by brand and compensation payment</Text>
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>Apply to Campaign</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollView: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 16,
  },
  backLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.primary[600],
  },
  headerImageContainer: {
    height: 240,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    position: 'absolute',
    top: 48,
    right: 16,
    flexDirection: 'row',
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  statusContainer: {
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  campaignTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
    marginBottom: 16,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  brandName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  brandCategoryRow: {
    flexDirection: 'row',
  },
  brandCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  messageIcon: {
    marginLeft: 'auto',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.primary[50],
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[700],
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  infoCardTextContainer: {
    marginLeft: 8,
  },
  infoCardLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
  },
  infoCardValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[900],
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[700],
    lineHeight: 24,
  },
  requirementText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  requirementsList: {
    marginTop: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  requirementItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[700],
    marginLeft: 12,
  },
  timelineContainer: {
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary[600],
    marginRight: 12,
    marginTop: 4,
  },
  timelineConnector: {
    position: 'absolute',
    left: 7,
    top: 16,
    width: 2,
    height: 50,
    backgroundColor: theme.colors.primary[600],
    zIndex: 0,
  },
  timelineContent: {
    flex: 1,
    marginBottom: 16,
  },
  timelineDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginBottom: 4,
  },
  timelineTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  timelineDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
    shadowColor: theme.colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.white,
  },
});