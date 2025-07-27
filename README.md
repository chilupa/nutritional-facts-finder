# 🥗 Nutrition Facts Finder

A modern, elegant web app to find detailed nutritional information for thousands of foods. Built with Next.js, Material-UI, and powered by real USDA data.

## ✨ Features

- **Real-time food search** - Search thousands of foods from USDA database
- **Comprehensive nutrition data** - Calories, macronutrients, vitamins, and minerals per 100g
- **Health benefits** - AI-generated health insights based on nutrient content
- **Beautiful UI** - Clean, minimal design with gradient backgrounds
- **Responsive** - Works perfectly on all devices
- **Fast & reliable** - Built with modern web technologies

## 🛠️ Tech Stack

- **Next.js 15** - React framework with API routes
- **Material-UI v5** - Component library with custom theming
- **React 19** - Latest React with modern hooks
- **Poppins Font** - Clean, modern typography
- **USDA FoodData Central API** - Real nutrition data

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
echo "USDA_API_KEY=your_key_here" > .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` file with your USDA API key:
   ```
   USDA_API_KEY=your_api_key_here
   ```
4. Get your free API key from [USDA FoodData Central](https://api.nal.usda.gov/)
5. Run development server: `npm run dev`

## 📱 How to Use

1. Enter any food item (e.g., "quinoa", "salmon", "spinach")
2. Click search or press Enter
3. View comprehensive nutritional information:
   - Calories and macronutrients per 100g (USDA standard)
   - Vitamins and minerals with precise values
   - Food category classification
   - Auto-generated health benefits

## 🍎 Supported Foods

**Thousands of foods** including:
- Fresh fruits and vegetables
- Meats, poultry, and seafood
- Grains, nuts, and seeds
- Dairy products
- Processed and packaged foods
- International cuisines

## 🎨 Design Features

- **Minimal & elegant** - Clean design with subtle gradients
- **Glassmorphism effects** - Modern card designs
- **Color-coded nutrients** - Easy-to-read nutrition chips
- **Organized styles** - Separate theme and style files
- **Responsive layout** - Perfect on mobile and desktop

## 🔮 Future Enhancements

- Food comparison feature
- Meal planning tools
- Nutritional goal tracking
- Barcode scanning
- Recipe nutrition calculator