import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { generateGlobalSearchIndex, filterIndexByPermissions, rankSearchResults } from '../../utils/searchIndex';

// Debounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const GlobalSearch = () => {
  const { drilldownPath, jumpToEntity } = useApp();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize and filter index based on user's current scope
  const availableIndex = useMemo(() => {
    const fullIndex = generateGlobalSearchIndex();
    return filterIndexByPermissions(fullIndex, drilldownPath);
  }, [drilldownPath]);

  // Rank results based on the debounced query
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return rankSearchResults(availableIndex, debouncedQuery);
  }, [debouncedQuery, availableIndex]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
    jumpToEntity(item.jumpData.pathArray, item.jumpData.targetRole, item.jumpData.contextData);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative hidden lg:block" ref={containerRef}>
      {/* SEARCH BAR */}
      <div 
        className="flex items-center w-[300px] h-[36px] px-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-md transition-all duration-200 shadow-sm overflow-hidden group"
        style={{
          boxShadow: isOpen ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
          borderColor: isOpen ? 'var(--blue)' : 'var(--border)'
        }}
      >
        <Search size={16} className="text-[var(--text-muted)] group-focus-within:text-[var(--blue)] transition-colors flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Global Search..."
          className="w-full h-full pl-2.5 bg-transparent text-[13px] text-[var(--text-primary)] font-medium outline-none placeholder:text-[var(--text-muted)] placeholder:font-normal placeholder:translate-y-[1px]"
          autoComplete="off"
          spellCheck="false"
        />
        {/* Optional keyboard shortcut hint could go here */}
      </div>

      {/* DROPDOWN RESULTS */}
      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            // Use right-0 to prevent clipping off the right side of the screen
            className="absolute top-[46px] right-0 w-[420px] bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-[9999]"
          >
            {results.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto overflow-x-hidden flex flex-col py-1.5 custom-scrollbar">
                {results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      className={`relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-hover)]'
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => handleSelect(item)}
                    >
                      {/* Selection Indicator bar (Left edge) */}
                      {isSelected && (
                        <motion.div 
                          layoutId="searchSelectionIndicator"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--blue)] rounded-r-md"
                        />
                      )}

                      {/* Icon */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0 transition-colors ${isSelected ? 'bg-[var(--blue)]/10 text-[var(--blue)]' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'}`}>
                        {item.type === 'Machine' ? <Search size={14} /> : <MapPin size={14} />}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[13px] font-bold text-[var(--text-primary)] truncate pr-4">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-[var(--bg-inset)] text-[var(--text-secondary)] border border-[var(--border)] flex-shrink-0">
                            {item.type}
                          </span>
                        </div>
                        
                        {/* Hierarchy Path (styled with chevrons) */}
                        <div className="flex items-center flex-wrap gap-1 opacity-70 mt-0.5">
                          {item.pathText.split(' • ').map((segment, i, arr) => (
                            <React.Fragment key={i}>
                              <span className={`text-[11px] truncate ${i === arr.length - 1 ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                                {segment}
                              </span>
                              {i < arr.length - 1 && <ChevronRight size={10} className="text-[var(--text-muted)] flex-shrink-0 mx-0.5" />}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <div className="w-12 h-12 bg-[var(--bg-surface)] rounded-full flex items-center justify-center mb-3">
                  <Search size={20} className="text-[var(--text-muted)] opacity-50" />
                </div>
                <p className="text-[14px] font-medium text-[var(--text-primary)]">No results found</p>
                <p className="text-[12px] text-[var(--text-muted)] mt-1 max-w-[250px]">
                  We couldn't find anything matching "{query}". Try searching for a specific company, plant, or machine.
                </p>
              </div>
            )}
            
            {/* Footer */}
            {results.length > 0 && (
              <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-surface)] border-t border-[var(--border)]">
                <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wide">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-2 opacity-60">
                  <span className="text-[10px] text-[var(--text-muted)]">Navigate <kbd className="font-mono bg-[var(--bg-card)] px-1 rounded border border-[var(--border)]">↑</kbd> <kbd className="font-mono bg-[var(--bg-card)] px-1 rounded border border-[var(--border)]">↓</kbd></span>
                  <span className="text-[10px] text-[var(--text-muted)]">Select <kbd className="font-mono bg-[var(--bg-card)] px-1 rounded border border-[var(--border)]">↵</kbd></span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;
