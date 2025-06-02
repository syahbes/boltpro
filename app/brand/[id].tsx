import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  Globe, 
  Users,
  ChevronRight,
  Instagram,
  Twitter
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { getBrands } from '@/data/brands';
import { getCampaigns } from '@/data/campaigns';

export default function BrandScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('campaigns');
  
  // Find the brand based on the ID
  const brand = getBrands().find(b => b.id === id);
  const campaigns = getCampaigns().filter(c => c.brandName === brand?.name);
  
  if (!brand) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Brand not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: brand.coverImage }}
            style={styles.coverImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={styles.coverGradient}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.brandInfoContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: brand.logo }}
              style={styles.logo}
            />
          </View>
          
          <View style={styles.brandHeader}>
            <View style={styles.nameRow}>
              <Text style={styles.brandName}>{brand.name}</Text>
              {brand.verified && (
                <ShieldCheck size={20} color={theme.colors.primary[600]} />
              )}
            </View>
            
            <View style={styles.categoryRow}>
              {brand.categories.map((category, index) => (
                <View key={index} style={styles.categoryPill}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.ratingRow}>
              <Star size={16} color={theme.colors.warning[500]} fill={theme.colors.warning[500]} />
              <Text style={styles.ratingText}>{brand.rating}</Text>
              <Text style={styles.reviewCount}>({brand.reviews} reviews)</Text>
            </View>
          </View>
          
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.messageButton}>
              <MessageSquare size={20} color={theme.colors.white} />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{brand.activeCampaigns}</Text>
              <Text style={styles.statLabel}>Active Campaigns</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>10K+</Text>
              <Text style={styles.statLabel}>Influencers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'campaigns' && styles.activeTab]}
              onPress={() => setActiveTab('campaigns')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  activeTab === 'campaigns' && styles.activeTabText
                ]}
              >
                Campaigns
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'about' && styles.activeTab]}
              onPress={() => setActiveTab('about')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  activeTab === 'about' && styles.activeTabText
                ]}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  activeTab === 'reviews' && styles.activeTabText
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {activeTab === 'campaigns' && (
          <View style={styles.campaignsContainer}>
            {campaigns.map((campaign) => (
              <TouchableOpacity 
                key={campaign.id}
                style={styles.campaignCard}
                onPress={() => router.push(`/campaign/${campaign.id}`)}
              >
                <Image
                  source={{ uri: campaign.image }}
                  style={styles.campaignImage}
                />
                <View style={styles.campaignContent}>
                  <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  <Text style={styles.campaignDescription} numberOfLines={2}>
                    {campaign.description}
                  </Text>
                  <View style={styles.campaignMetaRow}>
                    <View style={styles.campaignTags}>
                      {campaign.tags.slice(0, 2).map((tag, index) => (
                        <View key={index} style={styles.campaignTag}>
                          <Text style={styles.campaignTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <View 
                      style={[
                        styles.campaignStatus,
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
                          styles.campaignStatusText,
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
                  <View style={styles.campaignFooter}>
                    <Text style={styles.campaignCompensation}>{campaign.compensation}</Text>
                    <ChevronRight size={20} color={theme.colors.gray[400]} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {activeTab === 'about' && (
          <View style={styles.aboutContainer}>
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>About {brand.name}</Text>
              <Text style={styles.aboutText}>
                {brand.description}
                {"\n\n"}
                Founded as a small startup and now a global brand, {brand.name} is committed to innovation and quality in every product. Our mission is to inspire and equip our customers with the best products in the {brand.categories.join(', ')} space.
              </Text>
            </View>
            
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactItem}>
                <Globe size={20} color={theme.colors.gray[500]} />
                <Text style={styles.contactText}>www.{brand.name.toLowerCase()}.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Users size={20} color={theme.colors.gray[500]} />
                <Text style={styles.contactText}>partnerships@{brand.name.toLowerCase()}.com</Text>
              </View>
            </View>
            
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Social Media</Text>
              <View style={styles.socialLinks}>
                <View style={styles.socialItem}>
                  <Instagram size={20} color={theme.colors.gray[700]} />
                  <Text style={styles.socialText}>@{brand.name.toLowerCase()}</Text>
                  <Text style={styles.followerCount}>2.4M followers</Text>
                </View>
                <View style={styles.socialItem}>
                  <Twitter size={20} color={theme.colors.gray[700]} />
                  <Text style={styles.socialText}>@{brand.name.toLowerCase()}</Text>
                  <Text style={styles.followerCount}>1.8M followers</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            <View style={styles.reviewSummary}>
              <View style={styles.reviewRatingContainer}>
                <Text style={styles.reviewRatingText}>{brand.rating}</Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={20} 
                      color={theme.colors.warning[500]} 
                      fill={star <= Math.floor(brand.rating) ? theme.colors.warning[500] : 'transparent'}
                    />
                  ))}
                </View>
                <Text style={styles.reviewCountText}>Based on {brand.reviews} reviews</Text>
              </View>
            </View>
            
            {/* Sample reviews */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                  style={styles.reviewerImage}
                />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>Emily Johnson</Text>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        size={14} 
                        color={theme.colors.warning[500]} 
                        fill={star <= 5 ? theme.colors.warning[500] : 'transparent'}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>2 weeks ago</Text>
              </View>
              <Text style={styles.reviewText}>
                Working with {brand.name} was an amazing experience! The team was professional, responsive, and provided clear guidelines. The products were high quality and my audience loved the content. Highly recommend collaborating with them!
              </Text>
              <Text style={styles.campaignLabel}>Campaign: Summer Collection 2024</Text>
            </View>
            
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                  style={styles.reviewerImage}
                />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>Michael Chen</Text>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        size={14} 
                        color={theme.colors.warning[500]} 
                        fill={star <= 4 ? theme.colors.warning[500] : 'transparent'}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>1 month ago</Text>
              </View>
              <Text style={styles.reviewText}>
                Great brand to collaborate with. Communication was smooth and payment was prompt. Would work with them again on future campaigns.
              </Text>
              <Text style={styles.campaignLabel}>Campaign: Product Launch 2024</Text>
            </View>
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Reviews</Text>
            </TouchableOpacity>
          </View>
        )}
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
  coverImageContainer: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
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
  brandInfoContainer: {
    paddingHorizontal: 16,
    marginTop: -40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  brandHeader: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
    marginRight: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[900],
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[500],
    marginLeft: 4,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    flex: 1,
  },
  messageButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.white,
    marginLeft: 8,
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[100],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
  },
  followButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
    marginTop: 4,
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: theme.colors.gray[200],
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary[600],
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[600],
  },
  activeTabText: {
    color: theme.colors.primary[600],
  },
  campaignsContainer: {
    padding: 16,
  },
  campaignCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  campaignImage: {
    width: '100%',
    height: 160,
  },
  campaignContent: {
    padding: 16,
  },
  campaignTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 8,
  },
  campaignDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 12,
    lineHeight: 20,
  },
  campaignMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campaignTags: {
    flexDirection: 'row',
  },
  campaignTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    marginRight: 8,
  },
  campaignTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.gray[700],
  },
  campaignStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  campaignStatusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  campaignCompensation: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  aboutContainer: {
    padding: 16,
  },
  aboutSection: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  aboutText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[700],
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[700],
    marginLeft: 12,
  },
  socialLinks: {
    marginTop: 8,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  socialText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginLeft: 12,
  },
  followerCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[500],
    marginLeft: 'auto',
  },
  reviewsContainer: {
    padding: 16,
  },
  reviewSummary: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewRatingContainer: {
    alignItems: 'center',
  },
  reviewRatingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: theme.colors.gray[900],
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewCountText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  reviewCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[500],
  },
  reviewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[700],
    lineHeight: 24,
    marginBottom: 12,
  },
  campaignLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  viewAllButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    marginTop: 8,
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.primary[600],
  },
});