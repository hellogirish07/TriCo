import { Eye } from 'lucide-react';

export default function PreviewPanel({ 
  currentTheme, 
  previewContent 
}) {
  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <div className={`flex items-center gap-2 ${currentTheme.secondary} border-b ${currentTheme.border} px-4 py-3`}>
        <Eye className="text-green-500" size={18} />
        <span className={`${currentTheme.text} font-semibold`}>Live Preview</span>
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
