import { Code } from 'lucide-react';

export default function EditorTabs({ 
  activeTab, 
  setActiveTab, 
  currentTheme 
}) {
  return (
    <div className={`flex ${currentTheme.secondary} border-b ${currentTheme.border} px-2 pt-2`}>
      <button
        onClick={() => setActiveTab('html')}
        className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all font-medium ${
          activeTab === 'html'
            ? `${currentTheme.bg} ${currentTheme.text}`
            : `${currentTheme.textSecondary} hover:${currentTheme.text}`
        }`}
      >
        <Code size={16} />
        HTML
      </button>
      <button
        onClick={() => setActiveTab('css')}
        className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all font-medium ${
          activeTab === 'css'
            ? `${currentTheme.bg} ${currentTheme.text}`
            : `${currentTheme.textSecondary} hover:${currentTheme.text}`
        }`}
      >
        <Code size={16} />
        CSS
      </button>
    </div>
  );
}
