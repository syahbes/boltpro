import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, ArrowRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { getCampaigns } from '@/data/campaigns';

export default function CampaignsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [campaigns, setCampaigns] = useState(getCampaigns());
  
  const filters = ['All', 'Pending', 'Active', 'Completed'];

  const handleCampaignPress = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return theme.colors.success[500];
      case 'Pending':
        return theme.colors.warning[500];
      case 'Completed':
        return theme.colors.gray[500];
      default:
        return theme.colors.gray[500];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campaigns</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search campaigns"
            placeholderTextColor={theme.colors.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.activeFilterChipText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.featuredContainer}>
        <Text style={styles.featuredTitle}>Featured Campaign</Text>
        
        <TouchableOpacity 
          style={styles.featuredCard}
          onPress={() => handleCampaignPress('featured1')}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredContent}>
              <View style={styles.featuredBrandRow}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                  style={styles.featuredBrandLogo}
                />
                <Text style={styles.featuredBrandName}>Nike Sportswear</Text>
              </View>
              <Text style={styles.featuredCampaignTitle}>Summer Sports Collection 2025</Text>
              <View style={styles.featuredTagsRow}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Fashion</Text>
                </View>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Sports</Text>
                </View>
                <View style={styles.featuredCta}>
                  <Text style={styles.featuredCtaText}>Apply Now</Text>
                  <ArrowRight size={16} color={theme.colors.white} />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <View style={styles.campaignsListContainer}>
        <Text style={styles.sectionTitle}>All Campaigns</Text>
        
        <FlatList
          data={campaigns}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.campaignsList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.campaignCard}
              onPress={() => handleCampaignPress(item.id)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.campaignImage}
              />
              <View style={styles.campaignContent}>
                <Text style={styles.campaignTitle}>{item.title}</Text>
                <View style={styles.brandRow}>
                  <Image
                    source={{ uri: item.brandLogo }}
                    style={styles.brandLogo}
                  />
                  <Text style={styles.brandName}>{item.brandName}</Text>
                </View>
                <View style={styles.campaignFooter}>
                  <View style={styles.campaignTags}>
                    {item.tags.slice(0, 2).map((tag) => (
                      <View key={tag} style={styles.miniTagContainer}>
                        <Text style={styles.miniTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.gray[900],
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  filterButton: {
    padding: 6,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary[600],
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  activeFilterChipText: {
    color: theme.colors.white,
  },
  featuredContainer: {
    padding: 16,
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredBrandLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: theme.colors.white,
  },
  featuredBrandName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.white,
  },
  featuredCampaignTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.white,
    marginBottom: 12,
  },
  featuredTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.white,
  },
  featuredCta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  featuredCtaText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.white,
    marginRight: 4,
  },
  campaignsListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  campaignsList: {
    paddingBottom: 120,
  },
  campaignCard: {
    flexDirection: 'row',
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
    width: 100,
    height: 100,
  },
  campaignContent: {
    flex: 1,
    padding: 12,
  },
  campaignTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  brandName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignTags: {
    flexDirection: 'row',
  },
  miniTagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[100],
    marginRight: 4,
  },
  miniTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.gray[700],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});