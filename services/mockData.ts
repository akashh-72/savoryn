import { Post, Story, User, ChatPreview } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'chef_priya',
  displayName: 'Priya Sharma',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  bio: 'Bringing the taste of India to your kitchen. 🇮🇳🍛 Spice enthusiast.',
  followers: 45600,
  following: 120,
};

export const MOCK_STORIES: Story[] = [
  { 
    id: 's1', 
    userId: 'u2', 
    username: 'delhi_eats', 
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 
    mediaUrl: 'https://images.unsplash.com/photo-1513634917488-b2a63720743f?auto=format&fit=crop&w=400&h=600&q=80', // Tea/Chai
    hasUnseen: true 
  },
  { 
    id: 's2', 
    userId: 'u3', 
    username: 'spice_mama', 
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', 
    mediaUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&h=600&q=80', // Spices
    hasUnseen: true 
  },
  { 
    id: 's3', 
    userId: 'u4', 
    username: 'curry_king', 
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 
    mediaUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&h=600&q=80', // Samosa
    hasUnseen: false 
  },
  { 
    id: 's4', 
    userId: 'u5', 
    username: 'sweet_mithai', 
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', 
    mediaUrl: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400&h=600&q=80', // Jalebi
    hasUnseen: true 
  },
  { 
    id: 's5', 
    userId: 'u6', 
    username: 'tandoor_guy', 
    avatarUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80', 
    mediaUrl: 'https://images.unsplash.com/photo-1628294895950-98052523e036?auto=format&fit=crop&w=400&h=600&q=80', // Naan
    hasUnseen: false 
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    type: 'video',
    // Generic cooking video that looks like a rich curry being made
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    thumbnailUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80', // Butter Chicken
    caption: 'Creamy, rich, and absolutely divine. My grandma\'s secret Butter Chicken recipe! 🍗🍅 #butterchicken #indianfood #desifood',
    tags: ['indian', 'curry', 'dinner'],
    likes: 15420,
    commentsCount: 845,
    user: {
      id: 'u2',
      username: 'delhi_eats',
      displayName: 'Rajesh Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      followers: 85000,
      following: 200,
    },
    recipe: {
      ingredients: ['500g Chicken Thighs', '2 tbsp Butter', '1 cup Tomato Puree', '1/2 cup Fresh Cream', '1 tbsp Kasuri Methi', '2 tsp Garam Masala'],
      steps: ['Marinate chicken with yogurt and spices', 'Sear chicken in butter until golden', 'Simmer tomato puree with spices', 'Add chicken and finish with cream & kasuri methi'],
      cookingTime: '45 mins',
      difficulty: 'Medium',
    },
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'p2',
    type: 'video',
    // Generic nature/cooking video placeholder
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', // Biryani
    caption: 'Hyderabadi Dum Biryani layer by layer. The aroma is taking over the house! 🥘✨ #biryani #hyderabad #rice',
    tags: ['biryani', 'rice', 'festive'],
    likes: 22100,
    commentsCount: 1200,
    user: {
      id: 'u4',
      username: 'curry_king',
      displayName: 'Arjun Singh',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      followers: 12000,
      following: 150,
    },
    recipe: {
      ingredients: ['2 cups Basmati Rice', '500g Mutton/Chicken', '1 cup Fried Onions', 'Saffron Milk', 'Whole Spices', 'Mint & Coriander'],
      steps: ['Parboil rice with whole spices', 'Marinate meat with yogurt and spices', 'Layer meat and rice in a pot', 'Seal with dough and cook on "Dum" (slow steam) for 30 mins'],
      cookingTime: '1 hr 30 mins',
      difficulty: 'Hard',
    },
    isLiked: false,
    isSaved: true,
  },
   {
    id: 'p3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', // Pani Puri / Samosa vibe
    thumbnailUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    caption: 'Who can stop at just one Pani Puri? 🤤 The perfect spicy, tangy, crunchy snack! #panipuri #golgappa #streetfood',
    tags: ['snack', 'streetfood', 'spicy'],
    likes: 5600,
    commentsCount: 220,
    user: {
      id: 'u3',
      username: 'spice_mama',
      displayName: 'Anjali Desai',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      followers: 32000,
      following: 800,
    },
    recipe: {
        ingredients: ['Puri shells', 'Boiled Potato', 'Black Chickpeas', 'Mint Water (Pani)', 'Tamarind Chutney', 'Chaat Masala'],
        steps: ['Prepare spicy mint water', 'Mash potatoes with spices', 'Crack top of puri', 'Fill with potato mix and dunk in spicy water'],
        cookingTime: '30 mins',
        difficulty: 'Easy'
    },
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'p4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1668236368031-48e69d32d043?auto=format&fit=crop&w=800&q=80', // Dosa
    thumbnailUrl: 'https://images.unsplash.com/photo-1668236368031-48e69d32d043?auto=format&fit=crop&w=800&q=80',
    caption: 'Crispy Masala Dosa for breakfast is a love language. Served with coconut chutney and sambar. 🥥🌶️ #dosa #southindian #breakfast',
    tags: ['breakfast', 'southindian', 'healthy'],
    likes: 8900,
    commentsCount: 410,
    user: {
      id: 'u7',
      username: 'chennai_chef',
      displayName: 'Lakshmi N.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      followers: 15000,
      following: 300,
    },
    recipe: {
        ingredients: ['Dosa Batter (Rice/Lentil)', 'Potatoes', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Onions'],
        steps: ['Spread batter thin on hot tawa', 'Prepare potato masala tempering', 'Add ghee around edges', 'Place filling and roll'],
        cookingTime: '20 mins',
        difficulty: 'Medium'
    },
    isLiked: false,
    isSaved: false,
  },
];

export const MOCK_CHATS: ChatPreview[] = [
  {
    id: 'c1',
    user: {
        id: 'u2',
        username: 'delhi_eats',
        displayName: 'Rajesh Kumar',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        followers: 85000,
        following: 200
    },
    lastMessage: 'The spice blend you asked for is 50:50 cumin and coriander.',
    timestamp: '5m ago',
    unread: 2,
  },
  {
    id: 'c2',
    user: {
        id: 'u3',
        username: 'spice_mama',
        displayName: 'Anjali Desai',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
        followers: 32000,
        following: 800
    },
    lastMessage: 'Loved your reel on Paneer Tikka! 😍',
    timestamp: '2h ago',
    unread: 0,
  }
];

// New dedicated mock data for the Explore screen
export const MOCK_EXPLORE_ITEMS = [
    { id: 'e1', title: 'Street Food: Mumbai Vada Pav', image: 'https://images.unsplash.com/photo-1606491956689-2ea28c67a19a?auto=format&fit=crop&w=400&q=80', category: 'Street Food', layout: 'tall' },
    { id: 'e2', title: 'Authentic Dal Makhani', image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&w=400&q=80', category: 'North Indian', layout: 'square' },
    { id: 'e3', title: 'Spicy Paneer Tikka', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80', category: 'Starters', layout: 'square' },
    { id: 'e4', title: 'Grand Thali Feast', image: 'https://images.unsplash.com/photo-1626777552726-4a6531934686?auto=format&fit=crop&w=400&q=80', category: 'Thali', layout: 'tall' },
    { id: 'e5', title: 'Chole Bhature Delight', image: 'https://images.unsplash.com/photo-1626132661869-796497e674d4?auto=format&fit=crop&w=400&q=80', category: 'Breakfast', layout: 'square' },
    { id: 'e6', title: 'Sweet Gulab Jamun', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400&q=80', category: 'Dessert', layout: 'square' },
    { id: 'e7', title: 'Tandoori Naan Making', image: 'https://images.unsplash.com/photo-1628294895950-98052523e036?auto=format&fit=crop&w=400&q=80', category: 'Breads', layout: 'square' },
    { id: 'e8', title: 'Idli Sambar Morning', image: 'https://images.unsplash.com/photo-1589301760574-052c95360bf5?auto=format&fit=crop&w=400&q=80', category: 'South Indian', layout: 'tall' },
];