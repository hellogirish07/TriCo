import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import SymbolPalette from './SymbolPalette';

const placeholders = {
  html: 'Enter HTML here...',
  css: 'Enter CSS here...',
  js: 'Enter JavaScript here...',
};

const editorThemeExtensions = { dracula, oneDark, light: 'light' };

export default function CodeEditor({ file, onChange, settings, currentTheme, onAutoRun, onFontSizeChange }) {
  const editorViewRef = useRef(null);
  const editorSurfaceRef = useRef(null);
  const [showSymbols, setShowSymbols] = useState(() => window.innerWidth >= 768);
  const value = file?.content || '';

  const handleChange = (event) => {
    onChange(event.target.value);
    if (settings.autoRun && onAutoRun) onAutoRun();
  };

  const insertSymbol = (symbol) => {
    const view = editorViewRef.current;
    if (!view || !file) return;
    const { from, to } = view.state.selection.main;
    view.dispatch({
      changes: { from, to, insert: symbol },
      selection: { anchor: from + symbol.length },
    });
    view.focus();
  };

  useEffect(() => {
    const editorSurface = editorSurfaceRef.current;
    if (!editorSurface) return undefined;

    const handleWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      event.stopPropagation();
      const direction = event.deltaY < 0 ? 1 : -1;
      const nextSize = Math.min(50, Math.max(10, Number(settings.fontSize) + direction));
      if (nextSize !== Number(settings.fontSize)) onFontSizeChange(nextSize);
    };

    editorSurface.addEventListener('wheel', handleWheel, { passive: false });
    return () => editorSurface.removeEventListener('wheel', handleWheel);
  }, [onFontSizeChange, settings.fontSize]);

  if (!file) {
    return <div className={`flex flex-1 items-center justify-center text-sm ${currentTheme.textSecondary}`}>Create or open a file to start editing.</div>;
  }

  const languageExtension = file.type === 'html' ? html() : file.type === 'css' ? css() : javascript();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {!showSymbols && (
        <button
          type="button"
          onClick={() => setShowSymbols(true)}
          className={`flex items-center gap-2 border-b ${currentTheme.border} ${currentTheme.bg} px-3 py-2 text-xs ${currentTheme.textSecondary} hover:${currentTheme.text} lg:hidden`}
        >
          <Zap size={14} />
          Show quick symbols
        </button>
      )}
      <SymbolPalette isVisible={showSymbols} onSymbolInsert={insertSymbol} currentTheme={currentTheme} />
      <div ref={editorSurfaceRef} className="flex-1 overflow-auto p-4">
        <CodeMirror
          key={file.path}
          value={value}
          onChange={handleChange}
          onCreateEditor={(view) => { editorViewRef.current = view; }}
          theme={editorThemeExtensions[settings.editorTheme] || dracula}
          extensions={[languageExtension, ...(settings.wordWrap ? [EditorView.lineWrapping] : [])]}
          height="100%"
          placeholder={placeholders[file.type] || 'Enter code here...'}
          basicSetup={{ lineNumbers: true, foldGutter: true, highlightActiveLine: true, bracketMatching: true, closeBrackets: true }}
          style={{ fontSize: `${settings.fontSize}px`, minHeight: '100%' }}
          className="h-full overflow-hidden rounded-xl border border-slate-700"
        />
      </div>
    </div>
  );
}
