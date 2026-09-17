import { useState } from 'react';

export default function SymbolPalette({ 
  onSymbolInsert, 
  currentTheme,
  isVisible = true 
}) {
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded

  // Most commonly used symbols - simple and clean
  const commonSymbols = [
    '()', '{}', '[]', '"..."', "'...'", '=>', '!=', '&&', '||', 
    '=', '+', '-', '*', '/', '<', '>', '==', '<>', '<=', '>=', '!', 
    '.', ',', ';', ':', '?', '@', '#', '$', '%', '&',
    '\\', '|', '~', '`', '^', '_', '°', '±'
  ];

  const handleSymbolClick = (symbol) => {
    onSymbolInsert(symbol);
  };

  if (!isVisible) return null;

  return (
    <div className={`${currentTheme.bg} border-b ${currentTheme.border} lg:hidden `}>
      {/* Simple Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className={`${currentTheme.text} text-sm font-medium flex items-center gap-2`}>
          <span className="text-base">⚡</span>
          Quick Symbols
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${currentTheme.text} hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors`}
          title={isExpanded ? 'Hide symbols' : 'Show symbols'}
        >
          <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Simple Symbols Grid */}
      {isExpanded && (
        <div className="px-3 pb-3">
          <div className="grid lg:grid-cols-12 grid-cols-6 gap-1">
            {commonSymbols.map((symbol, index) => (
              <button
                key={index}
                onClick={() => handleSymbolClick(symbol)}
                className={`
                  ${currentTheme.input} ${currentTheme.text} 
                  border ${currentTheme.border} 
                  px-2 py-2 text-xs lg:text-sm rounded-lg 
                  hover:bg-blue-50 dark:hover:bg-blue-900/20 
                  hover:border-blue-300 dark:hover:border-blue-600
                  active:scale-95
                  transition-all duration-150 
                  font-mono 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  min-w-0 flex items-center justify-center
                  shadow-sm hover:shadow-md
                `}
                title={`Insert ${symbol}`}
              >
                <span className="truncate font-medium">{symbol}</span>
              </button>
            ))}
          </div>
          
          {/* Helpful tip */}
          <div className="mt-2 text-center">
            <span className={`${currentTheme.text} text-xs opacity-60`}>
              💡 Click any symbol to insert at cursor position
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
