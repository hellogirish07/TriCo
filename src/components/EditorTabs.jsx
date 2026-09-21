import { FileCode2, X } from 'lucide-react';

const fileColors = { html: 'text-orange-400', css: 'text-sky-400', js: 'text-amber-300' };

export default function EditorTabs({ files, activeTab, setActiveTab, onCloseTab, currentTheme }) {
  return (
    <div className={`flex min-h-[50px] overflow-x-auto ${currentTheme.secondary} border-b ${currentTheme.border} px-2 pt-2`}>
      {files.map((file) => (
        <div
          key={file.path}
          className={`flex shrink-0 items-center rounded-t-lg text-sm font-medium transition-all ${
            activeTab === file.path
              ? `${currentTheme.bg} ${currentTheme.text}`
              : `${currentTheme.textSecondary} hover:text-white`
          }`}
        >
          <button type="button" onClick={() => setActiveTab(file.path)} title={file.path} className="flex items-center gap-2 px-3 py-3 text-left">
            <FileCode2 size={16} className={fileColors[file.type] || currentTheme.textSecondary} />
            {file.name}
          </button>
          <button type="button" onClick={() => onCloseTab(file.path)} aria-label={`Close ${file.name}`} title={`Close ${file.name}`} className="mr-1 rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white">
            <X size={14} />
          </button>
        </div>
      ))}
      {files.length === 0 && <span className={`px-4 py-3 text-sm ${currentTheme.textSecondary}`}>No files open</span>}
    </div>
  );
}
