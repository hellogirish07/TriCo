import { X } from 'lucide-react';

export default function SettingsModal({ 
  showSettings, 
  setShowSettings, 
  settings, 
  setSettings, 
  currentTheme, 
  fontFamilies, 
  themes 
}) {
  if (!showSettings) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${currentTheme.secondary} rounded-2xl shadow-2xl w-full max-w-md border ${currentTheme.border}`}>
        <div className={`flex items-center justify-between px-6 py-4 border-b ${currentTheme.border}`}>
          <h2 className={`${currentTheme.text} font-bold text-xl`}>Editor Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors`}
          >
            <X size={24} />
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
