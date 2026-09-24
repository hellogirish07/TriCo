import { useEffect, useRef, useState } from 'react';
import { Code, FileCode2, FolderOpen, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { themes, fontFamilies, editorThemes } from './constants/themes';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EditorTabs from './components/EditorTabs';
import CodeEditor from './components/CodeEditor';
import PreviewPanel from './components/PreviewPanel';
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';
import './App.css';

const initialFiles = [
  {
    name: 'index.html',
    path: 'index.html',
    type: 'html',
    content: '<div class="container">\n  <h1>Hello World!</h1>\n  <p>Welcome to TriCo.</p>\n</div>',
  },
  {
    name: 'styles.css',
    path: 'styles.css',
    type: 'css',
    content: '.container {\n  padding: 2rem;\n  text-align: center;\n  font-family: Arial, sans-serif;\n  background-color: rgb(121, 184, 247);\n}\n\nh1 {\n  color: red;\n  margin-bottom: 1rem;\n}\n\np {\n  color: #6b7280;\n}',
  },
  {
    name: 'script.js',
    path: 'script.js',
    type: 'js',
    content: "console.log('Hello from script.js');",
  },
];

const getFileType = (fileName) => {
  if (/\.html?$/i.test(fileName)) return 'html';
  if (/\.css$/i.test(fileName)) return 'css';
  if (/\.js$/i.test(fileName)) return 'js';
  return 'html';
};

const getFileName = (filePath) => filePath.split('/').pop();
const WORKSPACE_STORAGE_KEY = 'trico-workspace';
const SETTINGS_STORAGE_KEY = 'trico-settings';
const LEGACY_WORKSPACE_STORAGE_KEYS = ['hypercode-workspace', 'codepen-mini-workspace'];
const supportedFilePattern = /\.(html?|css|js)$/i;

const defaultSettings = {
  fontSize: '20',
  fontFamily: 'mono',
  theme: 'midnight',
  editorTheme: 'dracula',
  wordWrap: false,
  autoRun: false,
};

const loadSavedSettings = () => {
  try {
    const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || 'null');
    if (savedSettings && typeof savedSettings === 'object') {
      return { ...defaultSettings, ...savedSettings };
    }
  } catch {
    return defaultSettings;
  }
  return defaultSettings;
};

const loadSavedFiles = () => {
  try {
    const savedWorkspace = [
      localStorage.getItem(WORKSPACE_STORAGE_KEY),
      ...LEGACY_WORKSPACE_STORAGE_KEYS.map((key) => localStorage.getItem(key)),
    ].find(Boolean);
    const savedFiles = JSON.parse(savedWorkspace || 'null');
    if (Array.isArray(savedFiles) && savedFiles.every((file) => file?.path && file?.name && file?.content !== undefined)) {
      return savedFiles;
    }
  } catch {
    return initialFiles;
  }
  return initialFiles;
};

const defaultContentForType = {
  html: '<div class="container">\n <h1>Welcome to TriCo.</h1>\n <p>Start building your page here.</p>\n</div>',
  css: '.container {\n  padding: 1.5rem;\n  color: #111827;\n  font-family: Arial, sans-serif;\n}',
  js: "console.log('Welcome to TriCo.');",
};

const readProjectFolder = async (directoryHandle, prefix = '') => {
  const projectFiles = [];
  for await (const [name, entry] of directoryHandle.entries()) {
    const path = `${prefix}${name}`;
    if (entry.kind === 'directory') {
      projectFiles.push(...await readProjectFolder(entry, `${path}/`));
    } else if (supportedFilePattern.test(name)) {
      const file = await entry.getFile();
      projectFiles.push({ name, path, type: getFileType(name), content: await file.text() });
    }
  }
  return projectFiles;
};

export default function App() {
  const [files, setFiles] = useState(loadSavedFiles);
  const [selectedFile, setSelectedFile] = useState(() => loadSavedFiles()[0]?.path || null);
  const [openTabs, setOpenTabs] = useState(() => loadSavedFiles().map((file) => file.path));
  const [activeTab, setActiveTab] = useState(() => loadSavedFiles()[0]?.path || null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(() => window.innerWidth >= 768);
  const projectHandleRef = useRef(null);
  const diskPathsRef = useRef([]);
  const openProjectFolderRef = useRef(null);

  const [settings, setSettings] = useState(loadSavedSettings);

  const currentTheme = themes[settings.theme] || themes.midnight;
  const currentFile = files.find((file) => file.path === selectedFile) || null;
  const openFiles = openTabs.map((path) => files.find((file) => file.path === path)).filter(Boolean);

  useEffect(() => {
    try {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(files));
    } catch {
      return;
    }
  }, [files]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      return;
    }
  }, [settings]);

  useEffect(() => {
    const confirmExit = (event) => {
      event.preventDefault();
      event.returnValue = 'You have changes in your project. Save them before leaving?';
    };

    window.addEventListener('beforeunload', confirmExit);
    return () => window.removeEventListener('beforeunload', confirmExit);
  }, []);

  const selectTab = (path) => {
    const file = files.find((item) => item.path === path);
    if (!file) return;
    setOpenTabs((currentTabs) => currentTabs.includes(path) ? currentTabs : [...currentTabs, path]);
    setActiveTab(file.path);
    setSelectedFile(file.path);
  };

  const setFileContent = (name, content) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.path === name ? { ...file, content } : file))
    );
  };

  const deleteFile = (name) => {
    setFiles((prevFiles) => {
      const nextFiles = prevFiles.filter((file) => file.path !== name);
      if (nextFiles.length === 0) {
        setSelectedFile(null);
        setActiveTab(null);
        setOpenTabs([]);
        return [];
      }

      return nextFiles;
    });
    setOpenTabs((currentTabs) => {
      const nextTabs = currentTabs.filter((tabPath) => tabPath !== name);
      if (activeTab === name) {
        const nextPath = nextTabs[0] || null;
        setSelectedFile(nextPath);
        setActiveTab(nextPath);
      }
      return nextTabs;
    });
  };

  const closeTab = (path) => {
    setOpenTabs((currentTabs) => {
      const nextTabs = currentTabs.filter((tabPath) => tabPath !== path);
      if (activeTab === path) {
        const closedIndex = currentTabs.indexOf(path);
        const nextPath = nextTabs[Math.min(closedIndex, nextTabs.length - 1)] || null;
        setActiveTab(nextPath);
        setSelectedFile(nextPath);
      }
      return nextTabs;
    });
  };

  const createNewFile = (requestedName) => {
    const trimmedName = requestedName.trim().replace(/^\/+|\/+$/g, '');
    if (!trimmedName || !/\.(html?|css|js)$/i.test(trimmedName)) return;
    const type = getFileType(trimmedName);
    const baseName = getFileName(trimmedName);
    const folder = trimmedName.includes('/') ? trimmedName.slice(0, trimmedName.lastIndexOf('/') + 1) : '';
    let filePath = trimmedName;
    let counter = 1;
    while (files.some((file) => file.path === filePath)) {
      const prefix = baseName.replace(/\.[^.]+$/, '');
      const extension = baseName.split('.').pop();
      filePath = `${folder}${prefix}-${counter}.${extension}`;
      counter += 1;
    }

    const newFile = {
      name: getFileName(filePath),
      path: filePath,
      type,
      content: defaultContentForType[type],
    };

    setFiles((prevFiles) => [...prevFiles, newFile]);
    setOpenTabs((currentTabs) => [...currentTabs, newFile.path]);
    setSelectedFile(newFile.path);
    setActiveTab(newFile.path);
  };

  const selectFile = (name) => {
    const file = files.find((item) => item.path === name);
    if (!file) return;
    setOpenTabs((currentTabs) => currentTabs.includes(file.path) ? currentTabs : [...currentTabs, file.path]);
    setSelectedFile(file.path);
    setActiveTab(file.path);
  };

  const importFiles = async (fileList, replaceWorkspace = false) => {
    const sourceFiles = Array.from(fileList).filter((file) => supportedFilePattern.test(file.name));
    if (sourceFiles.length === 0) return;

    const processed = await Promise.all(
      sourceFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const path = file.webkitRelativePath || file.name;
              resolve({
                name: getFileName(path),
                path,
                type: getFileType(file.name),
                content: String(reader.result || ''),
              });
            };
            reader.readAsText(file);
          })
      )
    );

    setFiles((prevFiles) => {
      const nextFiles = replaceWorkspace ? [] : [...prevFiles];
      processed.forEach((newFile) => {
        const existingIndex = nextFiles.findIndex((file) => file.path === newFile.path);
        if (existingIndex >= 0) {
          nextFiles[existingIndex] = { ...nextFiles[existingIndex], ...newFile };
        } else {
          nextFiles.push(newFile);
        }
      });
      return nextFiles;
    });

    setSelectedFile(processed[0].path);
    setActiveTab(processed[0].path);
    setOpenTabs(replaceWorkspace
      ? processed.map((file) => file.path)
      : (currentTabs) => [...new Set([...currentTabs, ...processed.map((file) => file.path)])]);
  };

  const handleDropFiles = async (event) => {
    event.preventDefault();
    await importFiles(event.dataTransfer.files);
  };

  const handleFolderUpload = async (event) => {
    if (files.length > 0 && !(await Swal.fire({
      title: 'Open another project?',
      text: 'This will replace the current workspace.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Open folder',
      confirmButtonColor: '#2563eb',
    })).isConfirmed) {
      event.target.value = '';
      return;
    }
    await importFiles(event.target.files, true);
    event.target.value = '';
  };

  const openProjectFolder = async () => {
    if (!window.showDirectoryPicker) {
      document.getElementById('project-folder-input')?.click();
      return;
    }
    if (files.length > 0 && !(await Swal.fire({
      title: 'Open another project?',
      text: 'This will replace the current workspace.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Open folder',
      confirmButtonColor: '#2563eb',
    })).isConfirmed) return;

    try {
      const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
      const permission = await handle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted') return;
      const projectFiles = await readProjectFolder(handle);
      if (projectFiles.length === 0) {
        await Swal.fire({ title: 'No supported files found', text: 'Choose a folder containing HTML, CSS, or JavaScript files.', icon: 'info' });
        return;
      }
      projectHandleRef.current = handle;
      diskPathsRef.current = projectFiles.map((file) => file.path);
      setFiles(projectFiles);
      setSelectedFile(projectFiles[0].path);
      setActiveTab(projectFiles[0].path);
      setOpenTabs(projectFiles.map((file) => file.path));
    } catch (error) {
      if (error.name !== 'AbortError') {
        await Swal.fire({ title: 'Could not open folder', text: error.message, icon: 'error' });
      }
    }
  };

  const saveProject = async () => {
    const handle = projectHandleRef.current;
    if (!handle) {
      await Swal.fire({ title: 'Open a project folder first', text: 'Use Open project folder to enable saving directly to disk.', icon: 'info' });
      return;
    }
    try {
      for (const file of files) {
        const parts = file.path.split('/');
        const fileName = parts.pop();
        let directory = handle;
        for (const folder of parts) directory = await directory.getDirectoryHandle(folder, { create: true });
        const writableFile = await (await directory.getFileHandle(fileName, { create: true })).createWritable();
        await writableFile.write(file.content);
        await writableFile.close();
      }
      for (const oldPath of diskPathsRef.current.filter((path) => !files.some((file) => file.path === path))) {
        const parts = oldPath.split('/');
        const fileName = parts.pop();
        let directory = handle;
        for (const folder of parts) directory = await directory.getDirectoryHandle(folder);
        await directory.removeEntry(fileName);
      }
      diskPathsRef.current = files.map((file) => file.path);
      await Swal.fire({ title: 'Changes saved', text: 'Your project folder is up to date.', icon: 'success', timer: 1600, showConfirmButton: false });
    } catch (error) {
      await Swal.fire({ title: 'Save failed', text: error.message, icon: 'error' });
    }
  };

  const renameFile = (path, requestedName) => {
    const name = requestedName.trim();
    if (!name || name.includes('/') || !/\.(html?|css|js)$/i.test(name)) return;
    const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/') + 1) : '';
    const nextPath = `${folder}${name}`;
    if (files.some((file) => file.path === nextPath && file.path !== path)) return;
    setFiles((prevFiles) => prevFiles.map((file) => (
      file.path === path ? { ...file, name, path: nextPath, type: getFileType(name) } : file
    )));
    setOpenTabs((currentTabs) => currentTabs.map((tabPath) => tabPath === path ? nextPath : tabPath));
    if (selectedFile === path) setSelectedFile(nextPath);
    if (activeTab === path) setActiveTab(nextPath);
  };

  const closeFolder = async () => {
    const result = await Swal.fire({
      title: 'Close project folder?',
      text: 'The current workspace will be cleared from this editor. Files on disk will not be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Close folder',
      confirmButtonColor: '#dc2626',
    });
    if (!result.isConfirmed) return;

    projectHandleRef.current = null;
    diskPathsRef.current = [];
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify([]));
    setFiles([]);
    setOpenTabs([]);
    setSelectedFile(null);
    setActiveTab(null);
    setShowPreview(false);
  };

  const htmlContent = files.find((file) => file.type === 'html')?.content || '';
  const cssContent = files.filter((file) => file.type === 'css').map((file) => file.content).join('\n');
  const jsContent = files.filter((file) => file.type === 'js').map((file) => file.content).join('\n');

  const getPreviewContent = () => {
    return `<!DOCTYPE html>\n<html>\n  <head>\n    <style>${cssContent}</style>\n  </head>\n  <body>\n    ${htmlContent}\n    <script>${jsContent}</script>\n  </body>\n</html>`;
  };

  const handleCodeChange = (value) => {
    if (!currentFile) return;
    setFileContent(currentFile.path, value);
    if (settings.autoRun) {
      setShowPreview(true);
    }
  };

  const handleEditorFontSizeChange = (fontSize) => {
    setSettings((currentSettings) => ({ ...currentSettings, fontSize: String(fontSize) }));
  };

  openProjectFolderRef.current = openProjectFolder;

  useEffect(() => {
    const handleShortcut = (event) => {
      const key = event.key.toLowerCase();
      const isCtrlOrCommand = event.ctrlKey || event.metaKey;

      if (event.altKey && key === 'z') {
        event.preventDefault();
        setSettings((currentSettings) => ({ ...currentSettings, wordWrap: !currentSettings.wordWrap }));
      } else if (isCtrlOrCommand && !event.altKey && key === '.') {
        event.preventDefault();
        setShowSettings((visible) => !visible);
      } else if (isCtrlOrCommand && event.altKey && key === 'n') {
        event.preventDefault();
        setShowPreview(true);
      } else if (isCtrlOrCommand && !event.altKey && key === 'b') {
        event.preventDefault();
        setShowSidebar((visible) => !visible);
      } else if (isCtrlOrCommand && !event.altKey && key === 'o') {
        event.preventDefault();
        openProjectFolderRef.current?.();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <div className={`h-screen flex flex-col ${currentTheme.bg}`}>
      <Header
        currentTheme={currentTheme}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        onSave={saveProject}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {showSidebar && (
          <Sidebar
            files={files}
            selectedFile={selectedFile}
            onSelectFile={selectFile}
            onCreateFile={createNewFile}
            onRenameFile={renameFile}
            onDeleteFile={deleteFile}
            onDropFiles={handleDropFiles}
            onFolderUpload={handleFolderUpload}
            onOpenProjectFolder={openProjectFolder}
            onCloseFolder={closeFolder}
            currentTheme={currentTheme}
          />
        )}

        <div className={`flex-1 flex flex-col overflow-hidden ${currentTheme.border}`}>
          {files.length > 0 ? (
            <>
              <EditorTabs files={openFiles} activeTab={activeTab} setActiveTab={selectTab} onCloseTab={closeTab} currentTheme={currentTheme} />
              <CodeEditor file={currentFile} onChange={handleCodeChange} settings={settings} setSettings={setSettings} currentTheme={currentTheme} fontFamilies={fontFamilies} onAutoRun={() => setShowPreview(true)} onFontSizeChange={handleEditorFontSizeChange} />
            </>
          ) : (
            <div className={`relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12 ${currentTheme.textSecondary}`}>
              <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
                <div className="absolute left-[12%] top-[18%] h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-[12%] right-[16%] h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>
              <div className={`relative w-full max-w-xl rounded-2xl border ${currentTheme.border} ${currentTheme.secondary} p-8 text-center shadow-2xl sm:p-12`}>
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${currentTheme.accent} shadow-lg shadow-blue-950/30`}>
                  <Code className="text-white" size={38} strokeWidth={1.8} />
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
                  <Sparkles size={14} />
                  TriCo
                </div>
                <h2 className={`mt-3 text-2xl font-semibold tracking-tight ${currentTheme.text}`}>Your workspace is ready</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6">Open a project folder to bring your files into a focused, browser-based coding workspace.</p>
                <button type="button" onClick={openProjectFolder} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500">
                  <FolderOpen size={17} />
                  Open project folder
                </button>
                <div className={`mt-8 grid grid-cols-1 gap-3 border-t ${currentTheme.border} pt-6 text-left sm:grid-cols-3`}>
                  <div className="flex items-center gap-2 text-xs"><FileCode2 size={16} className="text-orange-400" /><span>HTML editing</span></div>
                  <div className="flex items-center gap-2 text-xs"><FileCode2 size={16} className="text-sky-400" /><span>CSS styling</span></div>
                  <div className="flex items-center gap-2 text-xs"><FileCode2 size={16} className="text-amber-300" /><span>JS scripting</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showPreview && (
          <PreviewPanel
            currentTheme={currentTheme}
            previewContent={getPreviewContent()}
          />
        )}

        <SettingsModal
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          settings={settings}
          setSettings={setSettings}
          currentTheme={currentTheme}
          fontFamilies={fontFamilies}
          themes={themes}
          editorThemes={editorThemes}
        />

        <InfoModal
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          currentTheme={currentTheme}
        />
      </div>
    </div>
  );
}
