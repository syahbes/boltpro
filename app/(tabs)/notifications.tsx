import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  MessageSquare,
  Award,
  Star,
  AlertCircle,
  Calendar,
  Mail
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { getNotifications } from '@/data/notifications';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(getNotifications());
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={20} color={theme.colors.primary[600]} />;
      case 'campaign':
        return <Award size={20} color={theme.colors.success[500]} />;
      case 'review':
        return <Star size={20} color={theme.colors.warning[500]} />;
      case 'alert':
        return <AlertCircle size={20} color={theme.colors.error[500]} />;
      case 'reminder':
        return <Calendar size={20} color={theme.colors.info[500]} />;
      case 'invitation':
        return <Mail size={20} color={theme.colors.purple[500]} />;
      default:
        return <MessageSquare size={20} color={theme.colors.primary[600]} />;
    }
  };
  
  const getBgColorForType = (type: string) => {
    switch (type) {
      case 'message':
        return theme.colors.primary[50];
      case 'campaign':
        return theme.colors.success[50];
      case 'review':
        return theme.colors.warning[50];
      case 'alert':
        return theme.colors.error[50];
      case 'reminder':
        return theme.colors.info[50];
      case 'invitation':
        return theme.colors.purple[50];
      default:
        return theme.colors.gray[50];
    }
  };
  
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleNotificationPress = (notification: any) => {
    markAsRead(notification.id);
    
    if (notification.type === 'message') {
      router.push('/messages');
    } else if (notification.type === 'campaign') {
      router.push(`/campaign/${notification.campaignId}`);
    }
  };
  
  const renderTimestamp = (timestamp: string) => {
    return timestamp;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.notificationItem, 
              !item.read && styles.unreadNotification
            ]}
            onPress={() => handleNotificationPress(item)}
          >
            <View 
              style={[
                styles.iconContainer, 
                { backgroundColor: getBgColorForType(item.type) }
              ]}
            >
              {getIconForType(item.type)}
            </View>
            
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationTime}>{renderTimestamp(item.timestamp)}</Text>
              </View>
              
              <Text style={styles.notificationMessage}>{item.message}</Text>
              
              {item.brandLogo && (
                <View style={styles.brandRow}>
                  <Image
                    source={{ uri: item.brandLogo }}
                    style={styles.brandLogo}
                  />
                  <Text style={styles.brandName}>{item.brandName}</Text>
                </View>
              )}
              
              {item.ctaText && (
                <TouchableOpacity style={styles.ctaButton}>
                  <Text style={styles.ctaText}>{item.ctaText}</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  markAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  notificationsList: {
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: theme.colors.primary[50],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[500],
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 8,
    lineHeight: 20,
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
  ctaButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ctaText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.white,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary[600],
    position: 'absolute',
    top: 16,
    right: 16,
  },
});