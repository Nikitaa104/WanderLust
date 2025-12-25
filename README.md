
# StaySphere

A full-stack web application for discovering and booking unique accommodations around the world. StaySphere provides a platform where users can list their properties and travelers can find their perfect stay.

## 🌟 Features

### For Travelers
- **Browse Listings**: Explore a wide variety of accommodations with detailed descriptions and images
- **Search & Filter**: Find properties based on location, price, and amenities
- **User Reviews**: Read and write reviews to help make informed decisions
- **Secure Booking**: Easy and secure reservation system

### For Hosts
- **List Properties**: Create detailed listings with multiple images and descriptions
- **Manage Listings**: Edit, update, or remove your properties
- **Host Dashboard**: Track your listings and manage bookings

### Platform Features
- **User Authentication**: Secure signup and login system
- **Image Upload**: Cloud-based image storage and optimization
- **Interactive Maps**: View property locations on integrated maps
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Review System**: Rating and review functionality for properties

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Templating engine for dynamic HTML
- **CSS** - Custom styling
- **JavaScript** - Client-side interactivity

### Additional Tools & Services
- **Cloudinary** - Cloud-based image management and storage
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **Joi** - Schema validation

## 📁 Project Structure

```
StaySphere/
├── controllers/        # Route controllers (business logic)
├── models/            # Mongoose models (database schemas)
├── routes/            # Express route definitions
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS, images)
├── utils/             # Utility functions and helpers
├── init/              # Database initialization scripts
├── middleware.js      # Custom middleware functions
├── schema.js          # Joi validation schemas
├── cloudConfig.js     # Cloudinary configuration
├── app.js             # Main application file
└── package.json       # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nikitaa104/StaySphere.git
   cd StaySphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=your_session_secret
   ```

4. **Seed the Database** (Optional)
   ```bash
   node seed.js
   ```

5. **Start the Application**
   ```bash
   node app.js
   ```

6. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 🎯 Key Functionalities

### Listings Management
- Create new property listings with images
- Update existing listings
- Delete listings
- View all listings with pagination

### User Authentication
- User registration with validation
- Secure login/logout
- Password encryption
- Session management

### Reviews & Ratings
- Add reviews to listings
- Rate properties (1-5 stars)
- Edit and delete own reviews
- Display average ratings

### Image Handling
- Multiple image upload per listing
- Image optimization and transformation via Cloudinary
- Secure image storage and delivery

## 🔒 Security Features

- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure session management
- Password hashing
- Authentication and authorization middleware

## 📦 NPM Packages Used

```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "ejs": "Template engine",
  "passport": "Authentication middleware",
  "cloudinary": "Image management",
  "multer": "File upload handling",
  "joi": "Data validation",
  "express-session": "Session management",
  "connect-flash": "Flash messages",
  "method-override": "HTTP method support"
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Nikita**
- GitHub: [@Nikitaa104](https://github.com/Nikitaa104)
- LinkedIn: https://www.linkedin.com/in/nikita-pandey-2297bb31b/

## 🙏 Acknowledgments

- Inspired by platforms like Airbnb and other vacation rental websites
- Built as a learning project to demonstrate full-stack web development skills
- Thanks to the open-source community for the amazing tools and libraries

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
