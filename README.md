# TriCo

TriCo is a VS Code-inspired browser workspace for opening, editing, and managing real project folders directly in the browser. It combines a file explorer, tabbed editor, live preview, project save flow, and responsive layout in a single modern interface.

## ✨ Latest Updates

### VS Code-like project workspace
- Open a real project folder from your machine
- Browse nested files and folders in a sidebar explorer
- Create, rename, and delete files directly from the UI
- Use the three-dot menu on any file for rename and delete actions
- See the current file tree update immediately as your workspace changes

### File-based editor workflow
- Each file opens in its own tab with a proper file name instead of fixed HTML/CSS/JS placeholders
- File content updates live while you edit
- Closing a file from the sidebar also removes the matching editor tab
- A welcome screen appears when no project is open

### Save and project management
- Save changes back to the opened folder when supported by the browser
- Keep the project in sync with your local workspace
- Close folder button clears the active project cleanly
- Refresh and quit prompts help prevent accidental loss of work

### Modern editor experience
- CodeMirror-based editing with Dracula theme
- Syntax highlighting for HTML, CSS, and JavaScript
- Adjustable editor settings for font size, family, and theme
- Built-in live preview panel for rapid iteration

### Better UX and responsiveness
- Sidebar toggle placed before the logo and app branding
- Clean, IDE-like layout with a more polished welcome experience
- Responsive layout optimized for desktop, tablet, and mobile use
- SweetAlert2 dialogs replace browser alerts for more consistent confirmation flows

### Tooling and stack
- React and Vite updated to the latest compatible versions
- Modern frontend build setup with Vite 8
- Fast local development and production build workflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually http://localhost:5173.

### Build for production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## 🏗️ App Flow

1. Open a project folder from your machine.
2. Browse files in the sidebar explorer.
3. Edit files in the tabbed CodeMirror editor.
4. Run the preview to check the rendered output.
5. Save updates back to the folder when needed.

## 🧩 Tech Stack

- React
- Vite
- CodeMirror
- Dracula theme
- Lucide icons
- SweetAlert2

## 📁 Project Structure

```bash
src/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── components/
│   ├── CodeEditor.jsx
│   ├── EditorTabs.jsx
│   ├── Header.jsx
│   ├── PreviewPanel.jsx
│   ├── SettingsModal.jsx
│   ├── Sidebar.jsx
│   └── SymbolPalette.jsx
├── constants/
│   └── themes.js
└── assets/
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request with improvements.
