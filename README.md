# Multi-Step Form

A modern, responsive multi-step form built with vanilla JavaScript, HTML5, and CSS3. Features smooth animations, form validation, and a beautiful user interface that works seamlessly across all devices.

![Multi-Step Form Preview](./preview.jpg)

## ✨ Features

### 🎯 Core Functionality
- **5-Step Form Flow**: Personal Info → Select Plan → Add-ons → Summary → Thank You
- **Smart Navigation**: Step indicators with progress tracking
- **Form Validation**: Real-time validation with helpful error messages
- **Data Persistence**: User data preserved across form steps
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🎨 User Experience
- **Smooth Animations**: Elegant transitions between steps
- **Interactive Elements**: Hover states, focus indicators, and micro-interactions
- **Billing Toggle**: Switch between monthly and yearly pricing
- **Dynamic Pricing**: Real-time price calculations
- **Change Plan**: Easy navigation back to modify selections

### 🛠 Technical Features
- **Semantic HTML5**: Accessible and well-structured markup
- **Modern CSS**: Flexbox, Grid, and CSS custom properties
- **Vanilla JavaScript**: No frameworks required
- **Mobile-First**: Progressive enhancement approach
- **Cross-Browser Compatible**: Works on all modern browsers

## 📱 Responsive Design

### Mobile (< 940px)
- Horizontal step indicators
- Vertical stacked layout
- Touch-optimized interactions
- Compact typography

### Desktop (≥ 940px)
- Vertical sidebar with step descriptions
- Side-by-side layout
- Enhanced spacing and typography
- Mouse-optimized interactions

## 🎯 Live Demo

Experience the multi-step form in action:
**[Live Demo](https://your-demo-url.com)**

## 📸 Screenshots

### Step 1: Personal Information
![Personal Info Step](./design/mobile-design-step-1.jpg)

### Step 2: Select Plan (Mobile & Desktop)
![Mobile Plan Selection](./design/mobile-design-step-2-monthly.jpg)
![Desktop Plan Selection](./design/desktop-design-step-2-monthly.jpg)

### Step 3: Add-ons
![Add-ons Selection](./design/mobile-design-step-3-monthly.jpg)

### Step 4: Summary
![Order Summary](./design/mobile-design-step-4-monthly.jpg)

### Step 5: Thank You
![Thank You Page](./design/mobile-design-step-5.jpg)

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/multi-step-form.git
   cd multi-step-form
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Then visit http://localhost:8000
   ```

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Ubuntu font family

### Tools & Techniques
- **Responsive Design**: Mobile-first approach
- **CSS Grid & Flexbox**: Modern layout systems
- **CSS Custom Properties**: Consistent theming
- **Form Validation**: HTML5 validation + custom logic
- **Progressive Enhancement**: Works without JavaScript

## 📋 Form Flow

### 1. Personal Information
- Name validation
- Email format validation
- Phone number validation
- Required field checking

### 2. Plan Selection
- Three pricing tiers (Arcade, Advanced, Pro)
- Monthly/Yearly billing toggle
- Visual plan comparison
- 2 months free for yearly plans

### 3. Add-ons
- Optional service selections
- Dynamic pricing display
- Checkbox interactions
- Clear service descriptions

### 4. Order Summary
- Selected plan details
- Chosen add-ons list
- Total price calculation
- Change plan functionality

### 5. Confirmation
- Success message
- Contact information
- Clean completion state

## 🎨 Design System

### Colors
- **Primary Blue**: `hsl(213, 96%, 18%)`
- **Accent Purple**: `hsl(243, 100%, 62%)`
- **Light Blue**: `hsl(206, 94%, 87%)`
- **Error Red**: `hsl(354, 84%, 57%)`
- **Neutral Grays**: Various shades for text and backgrounds

### Typography
- **Font Family**: Ubuntu (400, 500, 700 weights)
- **Headings**: Responsive scaling from 1.5rem to 2.5rem
- **Body Text**: 16px base size with proper line height

### Breakpoints
- **Mobile**: 320px - 939px
- **Desktop**: 940px and above
- **Small Mobile**: Up to 480px (enhanced optimizations)

## 🔧 Customization

### Adding New Steps
1. Add new step HTML to `index.html`
2. Update step indicators in the sidebar
3. Add navigation logic to `script.js`
4. Style accordingly in `styles.css`

### Modifying Colors
Update CSS custom properties at the top of `styles.css`:
```css
:root {
  --primary-blue: hsl(213, 96%, 18%);
  --accent-purple: hsl(243, 100%, 62%);
  /* Add more colors as needed */
}
```

### Changing Plans
Modify plan data in `script.js`:
```javascript
const plans = [
  { name: 'arcade', price: 9, yearlyPrice: 90 },
  // Add or modify plans here
];
```

## 🌟 Highlights

### Performance
- **Lightweight**: No external dependencies
- **Fast Loading**: Optimized assets and minimal code
- **Smooth Animations**: CSS-based transitions
- **Efficient**: Single-page application architecture

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Focus Management**: Logical tab order
- **Color Contrast**: WCAG compliant color ratios

### User Experience
- **Intuitive Flow**: Clear step progression
- **Error Prevention**: Real-time validation
- **Visual Feedback**: Hover and focus states
- **Responsive**: Works on all devices
- **Fast**: Smooth interactions and transitions

## 📊 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 8+)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern SaaS onboarding flows
- Color palette and typography guidelines from design systems
- Frontend Mentor for the challenge specification

---

**Built with ❤️ using vanilla web technologies**
