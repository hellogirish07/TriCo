export default function CodeEditor({ 
  activeTab, 
  html, 
  css, 
  setHtml, 
  setCss, 
  settings, 
  currentTheme, 
  fontFamilies,
  onAutoRun
}) {
  const handleHtmlChange = (e) => {
    setHtml(e.target.value);
    if (settings.autoRun && onAutoRun) {
      onAutoRun();
    }
  };

  const handleCssChange = (e) => {
    setCss(e.target.value);
    if (settings.autoRun && onAutoRun) {
      onAutoRun();
    }
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      {activeTab === 'html' ? (
        <textarea
          value={html}
          onChange={handleHtmlChange}
          className={`w-full h-full ${currentTheme.input} ${fontFamilies[settings.fontFamily]} p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none`}
          style={{ fontSize: `${settings.fontSize}px` }}
          placeholder="Enter HTML here..."
          spellCheck={false}
        />
      ) : (
        <textarea
          value={css}
          onChange={handleCssChange}
          className={`w-full h-full ${currentTheme.input} ${fontFamilies[settings.fontFamily]} p-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none`}
          style={{ fontSize: `${settings.fontSize}px` }}
          placeholder="Enter CSS here..."
          spellCheck={false}
        />
      )}
    </div>
  );
}
