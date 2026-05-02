import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  value: File | null;
  onChange: (file: File) => void;
  existingUrl?: string;
}

export default function ImageDropzone({ value, onChange, existingUrl }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) { setPreview(null); return; }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const accept = useCallback((file: File) => {
    if (file.type.startsWith('image/')) onChange(file);
  }, [onChange]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const f = item.getAsFile();
          if (f) { accept(f); break; }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [accept]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) accept(f);
  };

  const displayImage = preview ?? existingUrl;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={[
        'relative rounded-[16px] border-2 border-dashed cursor-pointer transition-colors select-none',
        isDragging
          ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10'
          : 'border-[color:var(--color-border)] hover:border-[color:var(--color-primary)]/50',
        displayImage ? 'overflow-hidden p-0' : 'min-h-[160px] flex flex-col items-center justify-center gap-2 p-8',
      ].join(' ')}
    >
      {displayImage ? (
        <img src={displayImage} alt="Preview" className="w-full max-h-64 object-cover" />
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[color:var(--color-muted)]"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <p className="text-sm text-[color:var(--color-muted)] text-center">
            Drop image here, paste with <kbd className="font-mono">Ctrl+V</kbd>, or click to browse
          </p>
        </>
      )}
      {displayImage && (
        <p className="absolute bottom-2 right-2 text-xs bg-black/50 text-white rounded px-2 py-0.5">
          Click to replace
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={e => e.stopPropagation()}
        onChange={e => { const f = e.target.files?.[0]; if (f) accept(f); e.target.value = ''; }}
      />
    </div>
  );
}
