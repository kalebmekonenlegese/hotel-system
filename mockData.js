export const rooms = [
  {
    id: 1,
    name: "Royal Suite",
    type: "suite",
    price: 500,
    capacity: 4,
    size: 85,
    bedType: "King Size",
    amenities: ["Ocean View", "Private Pool", "Butler Service", "Jacuzzi"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
    ],
    description: "Experience ultimate luxury in our Royal Suite with panoramic ocean views."
  },
  {
    id: 2,
    name: "Deluxe Ocean View",
    type: "deluxe",
    price: 350,
    capacity: 2,
    size: 55,
    bedType: "Queen Size",
    amenities: ["Ocean View", "Minibar", "Rain Shower", "Smart TV"],
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a"],
    description: "Wake up to breathtaking ocean views in our Deluxe Ocean View room."
  },
  {
    id: 3,
    name: "Executive Room",
    type: "executive",
    price: 250,
    capacity: 2,
    size: 45,
    bedType: "Queen Size",
    amenities: ["City View", "Work Desk", "Coffee Maker", "Mini Fridge"],
    images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39"],
    description: "Perfect for business travelers seeking comfort and productivity."
  },
  {
    id: 4,
    name: "Family Suite",
    type: "suite",
    price: 450,
    capacity: 6,
    size: 100,
    bedType: "2 King Beds",
    amenities: ["Two Bedrooms", "Living Room", "Kitchenette", "Garden View"],
    images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd"],
    description: "Spacious suite designed for families with separate living areas."
  },
  {
    id: 5,
    name: "Presidential Penthouse",
    type: "penthouse",
    price: 1200,
    capacity: 8,
    size: 250,
    bedType: "3 King Beds",
    amenities: ["Private Terrace", "Infinity Pool", "Personal Chef", "Helipad"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
    description: "The epitome of luxury living at the top of Hatsey Kaleb Hotel."
  },
  {
    id: 6,
    name: "Standard Room",
    type: "standard",
    price: 150,
    capacity: 2,
    size: 30,
    bedType: "Double Bed",
    amenities: ["WiFi", "TV", "Air Conditioning", "Ensuite Bathroom"],
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304"],
    description: "Comfortable and affordable accommodation for budget-conscious travelers."
  }
];

export const analyticsData = {
  revenue: {
    current: 245000,
    previous: 198000,
    increase: 23.7
  },
  occupancy: {
    current: 87,
    target: 75,
    trend: "+12%"
  },
  bookings: {
    total: 1842,
    pending: 156,
    checkedIn: 89,
    checkedOut: 1597
  },
  customers: {
    total: 5234,
    new: 342,
    returning: 789
  },
  monthlyRevenue: [
    { month: "Jan", revenue: 185000 },
    { month: "Feb", revenue: 192000 },
    { month: "Mar", revenue: 210000 },
    { month: "Apr", revenue: 225000 },
    { month: "May", revenue: 240000 },
    { month: "Jun", revenue: 245000 }
  ],
  occupancyRate: [
    { month: "Jan", rate: 72 },
    { month: "Feb", rate: 75 },
    { month: "Mar", rate: 78 },
    { month: "Apr", rate: 82 },
    { month: "May", rate: 85 },
    { month: "Jun", rate: 87 }
  ],
  roomTypePopularity: [
    { name: "Royal Suite", bookings: 234 },
    { name: "Deluxe Ocean", bookings: 567 },
    { name: "Executive", bookings: 445 },
    { name: "Family Suite", bookings: 389 },
    { name: "Standard", bookings: 678 }
  ]
};

export const recentBookings = [
  { id: 1, customer: "John Smith", room: "Royal Suite", dates: "Dec 20-25", amount: 2500, status: "confirmed" },
  { id: 2, customer: "Sarah Johnson", room: "Deluxe Ocean", dates: "Dec 21-24", amount: 1400, status: "pending" },
  { id: 3, customer: "Michael Brown", room: "Executive", dates: "Dec 22-26", amount: 1000, status: "checked-in" },
  { id: 4, customer: "Emily Davis", room: "Family Suite", dates: "Dec 23-28", amount: 2250, status: "confirmed" }
];

export const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    rating: 5,
    comment: "Absolutely magnificent! The Royal Suite exceeded all expectations. The staff was incredibly attentive.",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "James Anderson",
    rating: 5,
    comment: "Best hotel experience in Ethiopia. The attention to detail and luxury amenities are world-class.",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Maria Garcia",
    rating: 4.5,
    comment: "Stunning views, impeccable service, and the food was extraordinary. Will definitely return.",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];