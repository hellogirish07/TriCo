import { useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronRight, FileCode2, Folder, FolderOpen, FolderUp, FolderX, MoreVertical, Pencil, Plus, Trash2, UploadCloud } from 'lucide-react';

const buildTree = (files) => {
  const root = { folders: {}, files: [] };
  files.forEach((file) => {
    const parts = file.path.split('/');
    let cursor = root;
    parts.slice(0, -1).forEach((part) => {
      cursor.folders[part] ||= { folders: {}, files: [] };
      cursor = cursor.folders[part];
    });
    cursor.files.push(file);
  });
  return root;
};

const fileColors = { html: 'text-orange-400', css: 'text-sky-400', js: 'text-amber-300' };

export default function Sidebar({ files, selectedFile, onSelectFile, onCreateFile, onRenameFile, onDeleteFile, onDropFiles, onFolderUpload, onOpenProjectFolder, onCloseFolder, currentTheme }) {
  const [newFileName, setNewFileName] = useState('');
  const [renamingPath, setRenamingPath] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [openFolders, setOpenFolders] = useState({});
  const [openMenuPath, setOpenMenuPath] = useState(null);
  const tree = useMemo(() => buildTree(files), [files]);

  const submitNewFile = (event) => {
    event.preventDefault();
    onCreateFile(newFileName);
    setNewFileName('');
  };

  const beginRename = (file) => {
    setOpenMenuPath(null);
    setRenamingPath(file.path);
    setRenameValue(file.name);
  };

  const submitRename = (event, file) => {
    event.preventDefault();
    onRenameFile(file.path, renameValue);
    setRenamingPath(null);
  };

  const renderTree = (node, prefix = '', depth = 0) => (
    <div>
      {Object.entries(node.folders).sort(([a], [b]) => a.localeCompare(b)).map(([folderName, folder]) => {
        const folderPath = `${prefix}${folderName}`;
        const isOpen = openFolders[folderPath] !== false;
        return (
          <div key={folderPath}>
            <button type="button" onClick={() => setOpenFolders((current) => ({ ...current, [folderPath]: !isOpen }))} className={`flex w-full items-center gap-1 py-1 text-xs ${currentTheme.textSecondary} hover:text-white`} style={{ paddingLeft: `${depth * 14 + 4}px` }}>
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              {isOpen ? <FolderOpen size={15} className="text-yellow-400" /> : <Folder size={15} className="text-yellow-400" />}
              <span className="truncate">{folderName}</span>
            </button>
            {isOpen && renderTree(folder, `${folderPath}/`, depth + 1)}
          </div>
        );
      })}
      {node.files.sort((a, b) => a.name.localeCompare(b.name)).map((file) => (
        <div key={file.path} className={`relative flex items-center gap-1 rounded px-2 py-1 text-sm ${selectedFile === file.path ? 'bg-blue-600/20 text-blue-100' : `${currentTheme.text} hover:bg-slate-800`}`} style={{ paddingLeft: `${depth * 14 + 18}px` }}>
          {renamingPath === file.path ? (
            <form onSubmit={(event) => submitRename(event, file)} className="flex min-w-0 flex-1 items-center gap-1">
              <input autoFocus value={renameValue} onChange={(event) => setRenameValue(event.target.value)} onKeyDown={(event) => event.key === 'Escape' && setRenamingPath(null)} className={`min-w-0 flex-1 rounded border ${currentTheme.border} ${currentTheme.input} px-1 py-0.5 text-xs outline-none`} />
              <button type="submit" aria-label={`Save ${file.name}`}><Check size={14} /></button>
            </form>
          ) : (
            <>
              <button type="button" onClick={() => onSelectFile(file.path)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                <FileCode2 size={15} className={fileColors[file.type] || currentTheme.textSecondary} />
                <span className="truncate">{file.name}</span>
              </button>
              <button
                type="button"
                onClick={() => setOpenMenuPath((currentPath) => currentPath === file.path ? null : file.path)}
                className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
                aria-label={`File actions for ${file.name}`}
                aria-expanded={openMenuPath === file.path}
                title={`File actions for ${file.name}`}
              >
                <MoreVertical size={15} />
              </button>
              {openMenuPath === file.path && (
                <div className={`absolute right-2 top-full z-20 mt-1 min-w-32 rounded-md border ${currentTheme.border} ${currentTheme.secondary} p-1 shadow-xl`} role="menu">
                  <button type="button" onClick={() => beginRename(file)} className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs ${currentTheme.text} hover:bg-slate-700`} role="menuitem">
                    <Pencil size={13} />
                    Rename
                  </button>
                  <button type="button" onClick={() => { setOpenMenuPath(null); onDeleteFile(file.path); }} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-red-300 hover:bg-red-500/10" role="menuitem">
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`flex w-72 shrink-0 flex-col ${currentTheme.secondary} border-r ${currentTheme.border}`}>
      <div className={`border-b ${currentTheme.border} px-4 py-4`}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className={`text-sm font-semibold ${currentTheme.text}`}>Explorer</p>
            <p className={`text-xs ${currentTheme.textSecondary}`}>Workspace files</p>
          </div>
          <button type="button" onClick={() => document.getElementById('new-file-name')?.focus()} className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="New file"><Plus size={17} /></button>
        </div>
        <button type="button" onClick={onOpenProjectFolder} className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-blue-500/50 px-2 py-1.5 text-xs text-blue-300 transition hover:bg-blue-500/10">
          <FolderUp size={14} />
          Open project folder
        </button>
        <button type="button" onClick={onCloseFolder} className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-red-500/40 px-2 py-1.5 text-xs text-red-300 transition hover:bg-red-500/10">
          <FolderX size={14} />
          Close folder
        </button>
        <input id="project-folder-input" type="file" webkitdirectory="true" directory="true" multiple className="hidden" onChange={onFolderUpload} />
        <form onSubmit={submitNewFile} className="mt-3 flex gap-1">
          <input id="new-file-name" value={newFileName} onChange={(event) => setNewFileName(event.target.value)} placeholder="new-file.html" className={`min-w-0 flex-1 rounded border ${currentTheme.border} ${currentTheme.input} px-2 py-1.5 text-xs outline-none focus:border-blue-500`} />
          <button type="submit" className="rounded bg-blue-600 px-2 text-white hover:bg-blue-500" aria-label="Create file"><Check size={14} /></button>
        </form>
      </div>

      <div className={`m-4 rounded-xl border border-dashed ${currentTheme.border} ${currentTheme.input} p-3 text-xs text-slate-400`} onDragOver={(event) => event.preventDefault()} onDrop={onDropFiles}>
        <div className="flex items-center gap-2"><UploadCloud size={17} /><span>Drop HTML, CSS, or JS files</span></div>
      </div>

      <div className="flex-1 overflow-auto px-3 pb-4">
        <div className={`mb-2 px-1 text-xs uppercase tracking-[0.2em] ${currentTheme.textSecondary}`}>Workspace</div>
        {renderTree(tree)}
      </div>

      <div className={`border-t ${currentTheme.border} px-4 py-3`}>
        <div className={`text-xs ${currentTheme.textSecondary}`}>Files update as you edit.</div>
        <div className={`text-xs ${currentTheme.textSecondary}`}>TriCo v2.2.1</div>
      </div>
    </div>
  );
}
