import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings, 
  Edit2, 
  Award, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Camera,
  TrendingUp,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stats');
  
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[theme.colors.primary[700], theme.colors.primary[500]]}
        style={styles.headerGradient}
      >
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit2 size={16} color={theme.colors.white} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={16} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.profileName}>Emily Johnson</Text>
        <Text style={styles.profileBio}>Lifestyle & Fashion Influencer</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Campaigns</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
        
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialLink}>
            <Instagram size={20} color={theme.colors.gray[600]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLink}>
            <Twitter size={20} color={theme.colors.gray[600]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLink}>
            <Youtube size={20} color={theme.colors.gray[600]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLink}>
            <Linkedin size={20} color={theme.colors.gray[600]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            onPress={() => setActiveTab('stats')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'stats' && styles.activeTabText
              ]}
            >
              Stats
            </Text>
          </TouchableOpacity>
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
        </View>
      </View>
      
      {activeTab === 'stats' && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardTitle}>Audience Demographics</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.demographicsRow}>
              <View style={styles.demographicItem}>
                <View style={[styles.demographicCircle, { backgroundColor: theme.colors.primary[500] }]}>
                  <Text style={styles.demographicPercent}>65%</Text>
                </View>
                <Text style={styles.demographicLabel}>Female</Text>
              </View>
              <View style={styles.demographicItem}>
                <View style={[styles.demographicCircle, { backgroundColor: theme.colors.info[500] }]}>
                  <Text style={styles.demographicPercent}>35%</Text>
                </View>
                <Text style={styles.demographicLabel}>Male</Text>
              </View>
            </View>
            
            <Text style={styles.ageGroupTitle}>Age Groups</Text>
            <View style={styles.ageGroupsContainer}>
              <View style={styles.ageGroup}>
                <View style={styles.ageGroupBarContainer}>
                  <View style={[styles.ageGroupBar, { height: 80, backgroundColor: theme.colors.primary[500] }]} />
                </View>
                <Text style={styles.ageGroupLabel}>18-24</Text>
              </View>
              <View style={styles.ageGroup}>
                <View style={styles.ageGroupBarContainer}>
                  <View style={[styles.ageGroupBar, { height: 120, backgroundColor: theme.colors.primary[600] }]} />
                </View>
                <Text style={styles.ageGroupLabel}>25-34</Text>
              </View>
              <View style={styles.ageGroup}>
                <View style={styles.ageGroupBarContainer}>
                  <View style={[styles.ageGroupBar, { height: 70, backgroundColor: theme.colors.primary[400] }]} />
                </View>
                <Text style={styles.ageGroupLabel}>35-44</Text>
              </View>
              <View style={styles.ageGroup}>
                <View style={styles.ageGroupBarContainer}>
                  <View style={[styles.ageGroupBar, { height: 40, backgroundColor: theme.colors.primary[300] }]} />
                </View>
                <Text style={styles.ageGroupLabel}>45+</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardTitle}>Engagement</Text>
              <TrendingUp size={20} color={theme.colors.success[500]} />
            </View>
            
            <View style={styles.engagementStats}>
              <View style={styles.engagementStat}>
                <Text style={styles.engagementValue}>4.8%</Text>
                <Text style={styles.engagementLabel}>Avg. Engagement Rate</Text>
              </View>
              <View style={styles.engagementStat}>
                <Text style={styles.engagementValue}>12K</Text>
                <Text style={styles.engagementLabel}>Monthly Impressions</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      
      {activeTab === 'campaigns' && (
        <View style={styles.campaignsContainer}>
          {/* Active Campaigns */}
          <Text style={styles.campaignsSectionTitle}>Active Campaigns</Text>
          <View style={styles.campaignCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5325588/pexels-photo-5325588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
              style={styles.campaignImage}
            />
            <View style={styles.campaignContent}>
              <Text style={styles.campaignTitle}>Summer Fashion Collection</Text>
              <View style={styles.brandRow}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/4386426/pexels-photo-4386426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                  style={styles.brandLogo}
                />
                <Text style={styles.brandName}>Fashion Brand</Text>
              </View>
              <View style={styles.campaignDetailsRow}>
                <View style={styles.campaignDetail}>
                  <Calendar size={16} color={theme.colors.gray[500]} />
                  <Text style={styles.detailText}>Ends in 12 days</Text>
                </View>
                <View style={styles.campaignStatus}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Completed Campaigns */}
          <Text style={styles.campaignsSectionTitle}>Past Campaigns</Text>
          <View style={styles.campaignCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
              style={styles.campaignImage}
            />
            <View style={styles.campaignContent}>
              <Text style={styles.campaignTitle}>Winter Accessories Collection</Text>
              <View style={styles.brandRow}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                  style={styles.brandLogo}
                />
                <Text style={styles.brandName}>Accessory Co.</Text>
              </View>
              <View style={styles.campaignDetailsRow}>
                <View style={styles.campaignDetail}>
                  <Award size={16} color={theme.colors.warning[500]} />
                  <Text style={styles.detailText}>Earnings: $1,250</Text>
                </View>
                <View style={[styles.campaignStatus, styles.completedStatus]}>
                  <View style={[styles.statusDot, styles.completedDot]} />
                  <Text style={[styles.statusText, styles.completedText]}>Completed</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      
      {activeTab === 'about' && (
        <View style={styles.aboutContainer}>
          <View style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Bio</Text>
            <Text style={styles.aboutText}>
              Lifestyle and fashion content creator based in Los Angeles. I specialize in creating authentic content that resonates with millennial and Gen Z audiences. With a focus on sustainable fashion and mindful living, I partner with brands that share my values.
            </Text>
          </View>
          
          <View style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Industry Tags</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Fashion</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Lifestyle</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Beauty</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Travel</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Sustainability</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Contact</Text>
            <View style={styles.contactItem}>
              <Mail size={20} color={theme.colors.gray[500]} />
              <Text style={styles.contactText}>emily.johnson@example.com</Text>
            </View>
            <View style={styles.contactItem}>
              <MessageSquare size={20} color={theme.colors.gray[500]} />
              <Text style={styles.contactText}>Available for business inquiries</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  headerGradient: {
    height: 150,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.white,
    marginLeft: 8,
  },
  profileInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -60,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
    marginTop: 16,
  },
  profileBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.gray[900],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
    marginTop: 4,
  },
  statDivider: {
    height: 24,
    width: 1,
    backgroundColor: theme.colors.gray[300],
    alignSelf: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 24,
  },
  socialLink: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    width: '100%',
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
  statsContainer: {
    padding: 16,
  },
  statCard: {
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
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  demographicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  demographicItem: {
    alignItems: 'center',
  },
  demographicCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  demographicPercent: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.white,
  },
  demographicLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  ageGroupTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 16,
  },
  ageGroupsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    alignItems: 'flex-end',
  },
  ageGroup: {
    alignItems: 'center',
  },
  ageGroupBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
  },
  ageGroupBar: {
    width: 30,
    borderRadius: 4,
  },
  ageGroupLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.gray[600],
    marginTop: 8,
  },
  engagementStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementStat: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    width: '48%',
  },
  engagementValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  engagementLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
    textAlign: 'center',
  },
  campaignsContainer: {
    padding: 16,
  },
  campaignsSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  campaignCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  brandName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  campaignDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
    marginLeft: 6,
  },
  campaignStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.success[50],
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success[500],
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.success[600],
  },
  completedStatus: {
    backgroundColor: theme.colors.gray[100],
  },
  completedDot: {
    backgroundColor: theme.colors.gray[500],
  },
  completedText: {
    color: theme.colors.gray[700],
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
  aboutSectionTitle: {
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
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
});