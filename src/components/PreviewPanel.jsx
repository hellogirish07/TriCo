import { Eye, Maximize } from 'lucide-react';

export default function PreviewPanel({ 
  currentTheme, 
  previewContent 
}) {
  const openFullscreenPreview = () => {
    const previewBlob = new Blob([previewContent], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(previewBlob);
    const previewWindow = window.open(previewUrl, '_blank', 'noopener,noreferrer');

    if (!previewWindow) {
      URL.revokeObjectURL(previewUrl);
      return;
    }

    window.setTimeout(() => URL.revokeObjectURL(previewUrl), 60000);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <div className={`flex items-center justify-between ${currentTheme.secondary} border-b ${currentTheme.border} px-4 py-3`}>
        <div className="flex items-center gap-2">
          <Eye className="text-green-500" size={18} />
          <span className={`${currentTheme.text} font-semibold`}>Live Preview</span>
        </div>
        <button
          type="button"
          onClick={openFullscreenPreview}
          title="Open preview in a new tab"
          aria-label="Open preview in a new tab"
          className={`hidden items-center gap-1.5 rounded-md border ${currentTheme.border} ${currentTheme.input} px-2.5 py-1.5 text-xs font-medium ${currentTheme.text} transition-colors hover:border-blue-500 md:flex`}
        >
          <Maximize size={18} />
          Full screen
        </button>
      </div>
      <div className="flex-1 bg-white overflow-auto">
        <iframe
          srcDoc={previewContent}
          title="preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
