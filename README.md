# CodePen Mini - Online Code Editor

A modern, responsive web-based code editor built with React that allows you to write HTML and CSS code with live preview functionality.

## ✨ Features

### 🎨 **Multi-Theme Support**
- **Dark Theme** - Professional dark interface
- **Light Theme** - Clean light interface  
- **Ocean Theme** - Beautiful cyan color scheme

### 📝 **Code Editor**
- **HTML Editor** - Write and edit HTML code
- **CSS Editor** - Write and edit CSS styles
- **Tab Switching** - Easy switching between HTML and CSS
- **Auto-save** - Your code is preserved as you type

### 🔧 **Customizable Settings**
- **Font Size** - Adjustable from 10px to 24px
- **Font Family** - Choose from Monospace, Sans-serif, or Serif
- **Auto Run** - Automatically show preview as you type
- **Theme Selection** - Switch between different color schemes

### 👁️ **Live Preview**
- **Real-time Preview** - See your changes instantly
- **Responsive Design** - Preview adapts to different screen sizes
- **Full HTML Output** - Complete HTML document generation

### 💾 **Export Functionality**
- **Download HTML** - Export your code as a complete HTML file
- **Ready to Use** - Downloaded file includes all CSS and HTML

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header with logo and action buttons
│   ├── EditorTabs.jsx      # HTML/CSS tab navigation
│   ├── CodeEditor.jsx      # Main code editing interface
│   ├── PreviewPanel.jsx    # Live preview iframe
│   └── SettingsModal.jsx   # Settings configuration modal
├── constants/
│   └── themes.js           # Theme definitions and font families
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## 🎯 Usage

### Basic Usage
1. **Write HTML** - Switch to the HTML tab and start coding
2. **Add Styles** - Switch to the CSS tab and style your HTML
3. **Preview** - Click the "Run" button to see your code in action
4. **Customize** - Use the Settings button to adjust editor preferences
5. **Export** - Download your complete HTML file when ready

### Keyboard Shortcuts
- **Tab** - Switch between HTML and CSS tabs
- **Ctrl/Cmd + S** - Save your work (browser will prompt)
- **Ctrl/Cmd + A** - Select all text in current editor

### Settings Options
- **Font Size**: Adjust text size for better readability
- **Font Family**: Choose your preferred coding font
- **Theme**: Switch between dark, light, and ocean themes
- **Auto Run**: Enable to automatically show preview while typing

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **JavaScript ES6+** - Modern JavaScript features

## 📱 Responsive Design

The editor is fully responsive and works great on:
- **Desktop** - Full feature experience
- **Tablet** - Optimized layout for medium screens
- **Mobile** - Touch-friendly interface

## 🎨 Theme Customization

The editor supports three built-in themes:

### Dark Theme
- Deep slate background
- Blue and purple accents
- Easy on the eyes for long coding sessions

### Light Theme  
- Clean white background
- Professional gray tones
- Perfect for bright environments

### Ocean Theme
- Cyan and teal color scheme
- Fresh, modern appearance
- Unique visual experience

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Themes
To add a new theme, edit `src/constants/themes.js`:

```javascript
export const themes = {
  // ... existing themes
  yourTheme: {
    bg: 'bg-your-bg',
    secondary: 'bg-your-secondary',
    border: 'border-your-border',
    text: 'text-your-text',
    textSecondary: 'text-your-secondary-text',
    input: 'bg-your-input text-your-input-text',
    accent: 'from-your-accent to-your-accent-secondary'
  }
};
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy Coding!** 🎉
