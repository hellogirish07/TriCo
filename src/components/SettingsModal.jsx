import { Settings, X } from 'lucide-react';

export default function SettingsModal({ 
  showSettings, 
  setShowSettings, 
  settings, 
  setSettings, 
  currentTheme, 
  fontFamilies, 
  themes,
  editorThemes
}) {
  if (!showSettings) return null;

  return (
    <div className="absolute inset-0 bg-black/40 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${currentTheme.secondary} max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl w-full max-w-md border ${currentTheme.border}`}>
        <div className={`sticky top-0 flex items-center justify-between border-b ${currentTheme.border} ${currentTheme.secondary} px-5 py-4 sm:px-6`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600/20 p-2 text-blue-400">
              <Settings size={19} />
            </div>
            <div>
              <h2 className={`${currentTheme.text} text-lg font-bold`}>Editor Settings</h2>
              <p className={`text-xs ${currentTheme.textSecondary}`}>Customize the editor</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
            aria-label="Close settings"
          >
            <X size={22} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Font Size */}
          <div>
            <label className={`block ${currentTheme.text} font-semibold mb-3`}>
              Font Size: {settings.fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.fontSize}
              onChange={(e) => setSettings({...settings, fontSize: e.target.value})}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${currentTheme.textSecondary}`}>10px</span>
              <span className={`text-xs ${currentTheme.textSecondary}`}>50px</span>
            </div>
            <p className={`mt-2 text-xs ${currentTheme.textSecondary}`}>Hold Ctrl/Cmd and scroll over the editor to adjust.</p>
          </div>

          {/* Font Family */}
          <div>
            <label className={`block ${currentTheme.text} font-semibold mb-3`}>
              Font Family
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(fontFamilies).map(font => (
                <button
                  key={font}
                  onClick={() => setSettings({...settings, fontFamily: font})}
                  className={`py-2.5 rounded-lg font-medium transition-all capitalize ${
                    settings.fontFamily === font
                      ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-lg`
                      : `${currentTheme.input} ${currentTheme.text} border`
                  }`}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className={`block ${currentTheme.text} font-semibold mb-3`}>
              Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(themes).map(theme => (
                <button
                  key={theme}
                  onClick={() => setSettings({...settings, theme})}
                  className={`py-2.5 rounded-lg font-medium transition-all capitalize ${
                    settings.theme === theme
                      ? `bg-gradient-to-r ${themes[theme].accent} text-white shadow-lg`
                      : `${currentTheme.input} ${currentTheme.text} border`
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Editor Theme */}
          <div>
            <label className={`block ${currentTheme.text} font-semibold mb-3`}>
              Editor Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(editorThemes).map(([theme, label]) => (
                <button
                  key={theme}
                  onClick={() => setSettings({...settings, editorTheme: theme})}
                  className={`py-2.5 rounded-lg font-medium transition-all ${
                    settings.editorTheme === theme
                      ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-lg`
                      : `${currentTheme.input} ${currentTheme.text} border`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className={`mt-2 text-xs ${currentTheme.textSecondary}`}>Changes the code editor only.</p>
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <div>
              <label className={`${currentTheme.text} font-semibold`}>
                Word Wrap
              </label>
              <p className={`mt-1 text-xs ${currentTheme.textSecondary}`}>Wrap long lines inside the editor.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.wordWrap}
              aria-label="Toggle word wrap"
              onClick={() => setSettings({...settings, wordWrap: !settings.wordWrap})}
              className={`relative h-6 w-12 rounded-full transition-colors ${
                settings.wordWrap ? 'bg-green-500' : `${currentTheme.input}`
              }`}
            >
              <div className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                settings.wordWrap ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Auto Run */}
          <div className="flex items-center justify-between">
            <label className={`${currentTheme.text} font-semibold`}>
              Auto Run Preview
            </label>
            <button
              onClick={() => setSettings({...settings, autoRun: !settings.autoRun})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.autoRun ? 'bg-green-500' : `${currentTheme.input}`
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.autoRun ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
