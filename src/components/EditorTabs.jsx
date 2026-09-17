import { FileCode2 } from 'lucide-react';

const fileColors = { html: 'text-orange-400', css: 'text-sky-400', js: 'text-amber-300' };

export default function EditorTabs({ files, activeTab, setActiveTab, currentTheme }) {
  return (
    <div className={`flex min-h-[50px] overflow-x-auto ${currentTheme.secondary} border-b ${currentTheme.border} px-2 pt-2`}>
      {files.map((file) => (
        <button
          key={file.path}
          onClick={() => setActiveTab(file.path)}
          title={file.path}
          className={`flex shrink-0 items-center gap-2 rounded-t-lg px-4 py-3 text-sm font-medium transition-all ${
            activeTab === file.path
              ? `${currentTheme.bg} ${currentTheme.text}`
              : `${currentTheme.textSecondary} hover:text-white`
          }`}
        >
          <FileCode2 size={16} className={fileColors[file.type] || currentTheme.textSecondary} />
          {file.name}
        </button>
      ))}
      {files.length === 0 && <span className={`px-4 py-3 text-sm ${currentTheme.textSecondary}`}>No files open</span>}
    </div>
  );
}
