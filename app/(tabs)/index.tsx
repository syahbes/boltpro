import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Dimensions,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Filter, Star, ShieldCheck } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { getBrands } from '@/data/brands';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

export default function ExploreScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [brands, setBrands] = useState(getBrands());
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const categories = ['All', 'Fashion', 'Beauty', 'Tech', 'Food', 'Lifestyle'];

  const handleBrandPress = (brandId: string) => {
    router.push(`/brand/${brandId}`);
  };

  // Filter brands based on search query and active category
  useEffect(() => {
    let filtered = getBrands();
    
    if (searchQuery) {
      filtered = filtered.filter(brand => 
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(brand => 
        brand.categories.includes(activeCategory)
      );
    }
    
    setBrands(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Discover</Text>
          <Text style={styles.nameText}>Top Brands & Campaigns</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search brands or campaigns"
            placeholderTextColor={theme.colors.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  activeCategory === category && styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Brands</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <Animated.FlatList
            ref={flatListRef}
            data={brands.filter(brand => brand.featured)}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 16}
            decelerationRate="fast"
            contentContainerStyle={styles.featuredBrandsContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (CARD_WIDTH + 16),
                index * (CARD_WIDTH + 16),
                (index + 1) * (CARD_WIDTH + 16),
              ];
              
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });
              
              return (
                <Animated.View
                  style={[
                    styles.featuredBrandCard,
                    { transform: [{ scale }], width: CARD_WIDTH }
                  ]}
                >
                  <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={() => handleBrandPress(item.id)}
                  >
                    <Image
                      source={{ uri: item.coverImage }}
                      style={styles.featuredBrandImage}
                    />
                    <View style={styles.brandLogoContainer}>
                      <Image
                        source={{ uri: item.logo }}
                        style={styles.brandLogo}
                      />
                    </View>
                    <View style={styles.featuredBrandContent}>
                      <View style={styles.brandHeaderRow}>
                        <Text style={styles.featuredBrandName}>{item.name}</Text>
                        {item.verified && (
                          <ShieldCheck size={18} color={theme.colors.primary[600]} />
                        )}
                      </View>
                      <View style={styles.ratingContainer}>
                        <Star size={16} color={theme.colors.warning[500]} fill={theme.colors.warning[500]} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Text style={styles.ratingCount}>({item.reviews} reviews)</Text>
                      </View>
                      <Text style={styles.campaignCount}>
                        {item.activeCampaigns} active campaigns
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
        
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Campaigns</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {brands.slice(0, 4).map((brand) => (
            <TouchableOpacity 
              key={brand.id}
              style={styles.campaignCard}
              onPress={() => handleBrandPress(brand.id)}
            >
              <Image
                source={{ uri: brand.campaignImage || brand.coverImage }}
                style={styles.campaignImage}
              />
              <View style={styles.campaignContent}>
                <Text style={styles.campaignTitle}>{brand.latestCampaign}</Text>
                <View style={styles.brandRow}>
                  <Image
                    source={{ uri: brand.logo }}
                    style={styles.smallBrandLogo}
                  />
                  <Text style={styles.campaignBrandName}>{brand.name}</Text>
                </View>
                <View style={styles.campaignTags}>
                  {brand.categories.slice(0, 2).map((category) => (
                    <View key={category} style={styles.tagContainer}>
                      <Text style={styles.tagText}>{category}</Text>
                    </View>
                  ))}
                  {brand.categories.length > 2 && (
                    <View style={styles.tagContainer}>
                      <Text style={styles.tagText}>+{brand.categories.length - 2}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  greeting: {
    marginBottom: 16,
  },
  greetingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[600],
  },
  nameText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  scrollContent: {
    paddingBottom: 120,
  },
  categoriesContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  categoriesScroll: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
  },
  activeCategoryButton: {
    backgroundColor: theme.colors.primary[600],
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  activeCategoryText: {
    color: theme.colors.white,
  },
  featuredSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  seeAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  featuredBrandsContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  featuredBrandCard: {
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  featuredBrandImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  brandLogoContainer: {
    position: 'absolute',
    top: 120,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  brandLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  featuredBrandContent: {
    padding: 16,
    paddingTop: 24,
  },
  brandHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredBrandName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginRight: 8,
  },
  ratingContainer: {
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
  ratingCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[500],
    marginLeft: 4,
  },
  campaignCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginTop: 8,
  },
  recentSection: {
    marginTop: 32,
  },
  campaignCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  campaignImage: {
    width: 96,
    height: 96,
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
  smallBrandLogo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  campaignBrandName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  campaignTags: {
    flexDirection: 'row',
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[100],
    marginRight: 8,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.gray[700],
  },
});