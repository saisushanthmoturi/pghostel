import { 
  Wifi, 
  Wind, 
  Utensils, 
  ShieldCheck, 
  Zap, 
  Shirt, 
  Car, 
  Tv, 
  Clock, 
  ThermometerSnowflake 
} from 'lucide-react';

export const AMENITIES = [
  { id: 1, name: 'High-Speed Wi-Fi', icon: Wifi, description: 'Dedicated business-grade internet for work and entertainment.' },
  { id: 2, name: 'Hygienic Food', icon: Utensils, description: 'Nutritious & delicious 3-times North & South Indian meals.' },
  { id: 3, name: 'Air Conditioning', icon: Wind, description: 'Premium split AC rooms available for ultimate comfort.' },
  { id: 4, name: '24/7 Security', icon: ShieldCheck, description: 'CCTV surveillance and professional security personnel.' },
  { id: 5, name: 'Power Backup', icon: Zap, description: 'Uninterrupted power supply with professional generators.' },
  { id: 6, name: 'Laundry Service', icon: Shirt, description: 'Professional washing machine and drying areas provided.' },
  { id: 7, name: 'Parking Area', icon: Car, description: 'Secure and spacious parking for two-wheelers.' },
  { id: 8, name: 'Smart LED TV', icon: Tv, description: 'Each room features a smart TV with digital cable connection.' },
  { id: 9, name: 'Housekeeping', icon: Clock, description: 'Daily professional cleaning and maintenance services.' },
  { id: 10, name: 'Hot Water', icon: ThermometerSnowflake, description: 'Geysers in every bathroom for 24/7 hot water supply.' },
];

export const ROOM_TYPES = [
  {
    id: 'single',
    title: 'Single Occupancy',
    price: '₹15,000',
    description: 'Perfect for professionals seeking privacy and focus.',
    features: ['King sized bed', 'Dedicated workspace', 'Private balcony', 'Smart TV'],
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    popular: false
  },
  {
    id: 'double',
    title: 'Two Sharing',
    price: '₹9,500',
    description: 'Our most popular choice for friends and colleagues.',
    features: ['Twin beds', 'Shared wardrobe', 'High-speed Wi-Fi', 'Attached bathroom'],
    image: 'https://t4.ftcdn.net/jpg/06/32/19/51/360_F_632195151_xTnjr4xGYG3oGyHiSWeCLLdWTKIVCpfY.jpg',
    popular: true
  },
  {
    id: 'triple',
    title: 'Three Sharing',
    price: '₹7,500',
    description: 'Economical yet comfortable with premium amenities.',
    features: ['Individual lockers', 'Common study area', 'Housekeeping', '3-time meals'],
    image: 'https://metrocityhostel.com/images/rooms/slider/booking-hostels-in-panjagutta.jpg',
    popular: false
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    content: 'Best PG in the area. The food is actually good, almost like home. The Wi-Fi is very reliable for my night shifts.',
    rating: 5
  },
  {
    id: 2,
    name: 'Vikas Reddy',
    role: 'Student',
    content: 'Very clean and systematic. Management is very responsive. Highly recommended for students.',
    rating: 5
  },
  {
    id: 3,
    name: 'Suresh Kumar',
    role: 'Marketing Lead',
    content: 'The security and location are excellent. Close to major tech parks. Worth every penny.',
    rating: 4
  }
];

export const RESIDENTS = [
  { id: 1, name: 'Arjun Reddy', room: '101 (Single)', rent: 15000, status: 'Paid', date: '2024-04-05' },
  { id: 2, name: 'Siddharth Rao', room: '202 (Double)', rent: 9500, status: 'Pending', date: '-' },
  { id: 3, name: 'Rahul Varma', room: '303 (Triple)', rent: 7500, status: 'Paid', date: '2024-04-02' },
  { id: 4, name: 'Karthik S.', room: '102 (Single)', rent: 15000, status: 'Paid', date: '2024-04-01' },
  { id: 5, name: 'Manish Kumar', room: '204 (Double)', rent: 9500, status: 'Pending', date: '-' },
  { id: 6, name: 'Pranav M.', room: '305 (Triple)', rent: 7500, status: 'Paid', date: '2024-04-08' },
  { id: 7, name: 'Sandeep T.', room: '105 (Single)', rent: 15000, status: 'Pending', date: '-' },
];
