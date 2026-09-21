import { Info, X } from 'lucide-react';

const shortcuts = [
  ['Alt + Z', 'Toggle word wrap'],
  ['Ctrl + .', 'Open or close Settings'],
  ['Ctrl + Alt + N', 'Run the preview'],
  ['Ctrl + B', 'Toggle the Explorer sidebar'],
  ['Ctrl + O', 'Open a project folder'],
  ['Ctrl/Cmd + wheel', 'Adjust editor font size'],
];

export default function InfoModal({ showInfo, setShowInfo, currentTheme }) {
  if (!showInfo) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className={`max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border ${currentTheme.border} ${currentTheme.secondary} shadow-2xl`}>
        <div className={`sticky top-0 flex items-center justify-between border-b ${currentTheme.border} ${currentTheme.secondary} px-5 py-4 sm:px-6`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600/20 p-2 text-blue-400">
              <Info size={19} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${currentTheme.text}`}>Using TriCo</h2>
              <p className={`text-xs ${currentTheme.textSecondary}`}>Editor guide and keyboard shortcuts</p>
            </div>
          </div>
          <button type="button" onClick={() => setShowInfo(false)} className={`${currentTheme.textSecondary} transition-colors hover:${currentTheme.text}`} aria-label="Close information">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <section>
            <h3 className={`mb-2 text-sm font-semibold ${currentTheme.text}`}>Workspace</h3>
            <p className={`text-sm leading-6 ${currentTheme.textSecondary}`}>
              Use the Explorer to open a project folder, browse supported HTML, CSS, and JavaScript files, and create, rename, or delete files. Select a file to open it in the editor. Closing a tab removes it from the editor only; the file stays available in the Explorer.
            </p>
          </section>

          <section>
            <h3 className={`mb-2 text-sm font-semibold ${currentTheme.text}`}>Editor</h3>
            <p className={`text-sm leading-6 ${currentTheme.textSecondary}`}>
              TriCo uses CodeMirror with syntax highlighting, line numbers, bracket matching, quick symbols, and multiple editor themes. Change the editor theme, font family, font size, word wrap, and app theme from Settings. Hold Ctrl or Cmd and scroll over the editor to change its font size without zooming the browser.
            </p>
          </section>

          <section>
            <h3 className={`mb-3 text-sm font-semibold ${currentTheme.text}`}>Keyboard shortcuts</h3>
            <div className={`overflow-hidden rounded-lg border ${currentTheme.border}`}>
              {shortcuts.map(([shortcut, description]) => (
                <div key={shortcut} className={`flex items-center justify-between gap-4 border-b ${currentTheme.border} px-3 py-2.5 last:border-b-0`}>
                  <kbd className={`rounded border ${currentTheme.border} ${currentTheme.input} px-2 py-1 text-xs font-semibold ${currentTheme.text}`}>{shortcut}</kbd>
                  <span className={`text-right text-xs ${currentTheme.textSecondary}`}>{description}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className={`mb-2 text-sm font-semibold ${currentTheme.text}`}>Preview and saving</h3>
            <p className={`text-sm leading-6 ${currentTheme.textSecondary}`}>
              Use Run or Ctrl + Alt + N to preview the current HTML, CSS, and JavaScript together. Save writes changes back to the opened project folder when the browser grants file access. TriCo also keeps the workspace in browser storage and warns before accidental refresh or exit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
