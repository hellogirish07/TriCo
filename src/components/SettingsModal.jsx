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
              className="w-full accent-[#1e46a1] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${currentTheme.textSecondary}`}>10px</span>
              <span className={`text-xs ${currentTheme.textSecondary}`}>50px</span>
            </div>
            <p className={`mt-2 text-xs ${currentTheme.textSecondary}`}>Hold Ctrl/Cmd and scroll over the editor to adjust.</p>
          </div>

          {/* Font Family */}
          <div className="flex items-center justify-between gap-4">
            <label className={`${currentTheme.text} font-semibold`}>
              Font Family
            </label>
            <select
              value={settings.fontFamily}
              onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
              className={`w-36 rounded-lg border ${currentTheme.border} ${currentTheme.input} px-2 py-1.5 text-sm outline-none focus:border-blue-500`}
            >
              {Object.keys(fontFamilies).map((font) => (
                <option key={font} value={font} className="bg-slate-900 text-slate-100">
                  {font.charAt(0).toUpperCase() + font.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between gap-4">
            <label className={`${currentTheme.text} font-semibold`}>
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className={`w-36 rounded-lg border ${currentTheme.border} ${currentTheme.input} px-2 py-1.5 text-sm outline-none focus:border-blue-500`}
            >
              {Object.keys(themes).map((theme) => (
                <option key={theme} value={theme} className="bg-slate-900 text-slate-100">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Editor Theme */}
          <div className="flex items-center justify-between gap-4">
            <label className={`${currentTheme.text} font-semibold`}>
              Editor Theme
            </label>
            <select
              value={settings.editorTheme}
              onChange={(e) => setSettings({ ...settings, editorTheme: e.target.value })}
              className={`w-36 rounded-lg border ${currentTheme.border} ${currentTheme.input} px-2 py-1.5 text-sm outline-none focus:border-blue-500`}
            >
              {Object.entries(editorThemes).map(([theme, label]) => (
                <option key={theme} value={theme} className="bg-slate-900 text-slate-100">
                  {label}
                </option>
              ))}
            </select>
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
                settings.wordWrap ? 'bg-[#1e46a1]' : `${currentTheme.input}`
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
                settings.autoRun ? 'bg-[#1e46a1]' : `${currentTheme.input}`
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
