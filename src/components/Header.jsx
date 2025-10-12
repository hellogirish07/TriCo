import { Code, Play, Settings, Download } from 'lucide-react';

export default function Header({ 
  currentTheme, 
  showPreview, 
  setShowPreview, 
  showSettings, 
  setShowSettings, 
  onDownload 
}) {
  return (
    <div className={`${currentTheme.secondary} border-b ${currentTheme.border} px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${currentTheme.accent} p-2 rounded-lg`}>
            <Code className="text-white" size={20} />
          </div>
          <h1 className={`${currentTheme.text} font-bold text-xl`}>CodePen Mini</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Play size={16} />
            <span className="hidden sm:inline">Run</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-2 ${currentTheme.secondary} hover:${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border} px-4 py-2.5 rounded-xl transition-all font-medium`}
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            onClick={onDownload}
            className={`flex items-center gap-2 bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-medium`}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
