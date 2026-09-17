import { Code, Play, Settings, Menu, Save } from 'lucide-react';

export default function Header({ 
  currentTheme, 
  showPreview, 
  setShowPreview, 
  showSettings, 
  setShowSettings,
  showSidebar,
  setShowSidebar,
  onSave,
  // onDownload 
}) {
  return (
    <div className={`${currentTheme.secondary} border-b ${currentTheme.border} px-3 py-3 sm:px-6 sm:py-4`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`shrink-0 rounded-xl border ${currentTheme.border} ${currentTheme.secondary} p-2.5 ${currentTheme.text} transition-all hover:${currentTheme.bg}`}
            aria-label="Toggle Explorer"
            title="Toggle Explorer"
          >
            <Menu size={18} />
          </button>

          <div className={`bg-gradient-to-br ${currentTheme.accent} p-2 rounded-lg`}>
            <Code className="text-white" size={20} />
          </div>
          <h1 className={`${currentTheme.text} truncate text-lg font-bold sm:text-xl`}>CodePen Mini</h1>
          
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={onSave}
            className={`flex items-center gap-2 ${currentTheme.secondary} hover:${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border} px-2.5 py-2.5 sm:px-4 rounded-xl transition-all font-medium`}
          >
            <Save size={16} />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-2 ${currentTheme.secondary} hover:${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border} px-2.5 py-2.5 sm:px-4 rounded-xl transition-all font-medium`}
          >
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-2.5 py-2.5 font-medium text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-xl sm:px-4"
          >
            <Play size={16} />
            <span className="hidden sm:inline">Run</span>
          </button>
          
          {/* <button
            onClick={onDownload}
            className={`flex items-center gap-2 bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-medium`}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
