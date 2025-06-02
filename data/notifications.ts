export const getNotifications = () => [
  {
    id: 'notif1',
    type: 'campaign',
    title: 'Campaign Approved!',
    message: 'Your application for the Summer Sports Collection has been approved. Check the details and confirm your participation.',
    timestamp: '2 hours ago',
    read: false,
    brandName: 'Nike',
    brandLogo: 'https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    campaignId: 'campaign1',
    ctaText: 'View Details'
  },
  {
    id: 'notif2',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Sephora regarding your upcoming beauty campaign.',
    timestamp: '5 hours ago',
    read: false,
    brandName: 'Sephora',
    brandLogo: 'https://images.pexels.com/photos/5240677/pexels-photo-5240677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ctaText: 'Reply'
  },
  {
    id: 'notif3',
    type: 'reminder',
    title: 'Content Deadline Reminder',
    message: 'Your first deliverable for the Apple campaign is due in 2 days. Don\'t forget to submit your content on time!',
    timestamp: '1 day ago',
    read: true,
    brandName: 'Apple',
    brandLogo: 'https://images.pexels.com/photos/4386426/pexels-photo-4386426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    campaignId: 'campaign3'
  },
  {
    id: 'notif4',
    type: 'review',
    title: 'New Review',
    message: 'Starbucks has left a 5-star review for your previous campaign collaboration. Check it out!',
    timestamp: '2 days ago',
    read: true,
    brandName: 'Starbucks',
    brandLogo: 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    id: 'notif5',
    type: 'invitation',
    title: 'Campaign Invitation',
    message: 'You\'ve been invited to apply for Airbnb\'s "Discover Local Experiences" campaign. Review the details and submit your proposal.',
    timestamp: '3 days ago',
    read: true,
    brandName: 'Airbnb',
    brandLogo: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    campaignId: 'campaign5',
    ctaText: 'Apply Now'
  },
  {
    id: 'notif6',
    type: 'alert',
    title: 'Payment Processed',
    message: 'Your payment of $2,500 for the completed Patagonia campaign has been processed. The funds should appear in your account within 3 business days.',
    timestamp: '4 days ago',
    read: true,
    brandName: 'Patagonia',
    brandLogo: 'https://images.pexels.com/photos/1020145/pexels-photo-1020145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    campaignId: 'campaign6'
  },
];