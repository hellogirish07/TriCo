import { useState } from 'react';
import { themes, fontFamilies } from './constants/themes';
import Header from './components/Header';
import EditorTabs from './components/EditorTabs';
import CodeEditor from './components/CodeEditor';
import PreviewPanel from './components/PreviewPanel';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [html, setHtml] = useState('<div class="container">\n  <h1>Hello World!</h1>\n  <p>Start editing to see changes.</p>\n</div>');
  const [css, setCss] = useState('.container {\n  padding: 2rem;\n  text-align: center;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #3b82f6;\n  margin-bottom: 1rem;\n}\n\np {\n  color: #6b7280;\n}');
  const [activeTab, setActiveTab] = useState('html');
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [settings, setSettings] = useState({
    fontSize: '14',
    fontFamily: 'mono',
    theme: 'dark',
    autoRun: false
  });

  const currentTheme = themes[settings.theme];

  const getPreviewContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
  };

  const downloadCode = () => {
    const content = getPreviewContent();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`h-screen flex flex-col ${currentTheme.bg}`}>
      <Header 
        currentTheme={currentTheme}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        onDownload={downloadCode}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Editor Panel */}
        <div className={`flex flex-col ${currentTheme.border} ${showPreview ? 'hidden md:flex md:w-1/2' : 'w-full'}`}>
          <EditorTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentTheme={currentTheme}
          />
          
          <CodeEditor 
            activeTab={activeTab}
            html={html}
            css={css}
            setHtml={setHtml}
            setCss={setCss}
            settings={settings}
            currentTheme={currentTheme}
            fontFamilies={fontFamilies}
            onAutoRun={() => setShowPreview(true)}
          />
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <PreviewPanel 
            currentTheme={currentTheme}
            previewContent={getPreviewContent()}
          />
        )}

        {/* Settings Panel */}
        <SettingsModal 
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          settings={settings}
          setSettings={setSettings}
          currentTheme={currentTheme}
          fontFamilies={fontFamilies}
          themes={themes}
        />
      </div>
    </div>
  );
}