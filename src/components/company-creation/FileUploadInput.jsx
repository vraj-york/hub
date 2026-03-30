import { useRef, useState, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Upload } from 'lucide-react';
import { FormGroupLabel } from './FormGroupLabel';

const DEFAULT_DESCRIPTION = 'Supported file formats are CSV & XLS up to 20MB';

export function FileUploadInput({
  label = 'Upload Roster',
  description = DEFAULT_DESCRIPTION,
  instructionText,
  supportedFormatsText,
  allowedFormats = 'CSV, XLS',
  maxSize = '20MB',
  accept,
  maxFileSizeMB,
  onFileChange,
  isLoading = false,
  progress = 0,
  errorMessage,
  currentFile,
  isRequired = true,
  ariaLabel = 'Upload Roster file',
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const defaultInstruction = 'Click to upload or drag-&-drop file';
  const displayInstruction = instructionText ?? defaultInstruction;
  const showFileItem = Boolean(currentFile?.name);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file && onFileChange) onFileChange(file);
    },
    [onFileChange]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e) => {
      const file = e.target?.files?.[0];
      if (file && onFileChange) onFileChange(file);
      e.target.value = '';
    },
    [onFileChange]
  );

  const displayDescription = supportedFormatsText ?? description ?? `Supported file formats: ${allowedFormats}. Max size: ${maxSize}.`;
  const acceptAttr = accept ?? (allowedFormats === 'SVG, PNG, JPG' ? '.svg,.png,.jpg,.jpeg' : '.csv,.xlsx,.xls');

  return (
    <Box>
      <FormGroupLabel label={label} isRequired={isRequired} />
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        onChange={handleChange}
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
        aria-label={ariaLabel}
      />
      <Box
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        tabIndex={0}
        role="button"
        aria-label={`${ariaLabel}. Click or drag and drop to upload.`}
        sx={{
          background: '#fff',
          borderRadius: 2,
          border: `2px dashed ${isDragging ? 'rgba(58, 111, 216, 1)' : 'rgba(221, 217, 235, 1)'}`,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          cursor: isLoading ? 'wait' : 'pointer',
          opacity: isLoading ? 0.8 : 1,
          transition: 'border-color 0.2s, background 0.2s',
          '&:hover': { borderColor: 'rgba(58, 111, 216, 0.6)', background: 'rgba(241, 246, 253, 0.5)' },
          '&:focus-visible': { outline: '2px solid rgba(58, 111, 216, 1)', outlineOffset: 2 },
        }}
      >
        <IconButton
          size="small"
          sx={{
            background: 'rgba(241, 246, 253, 1)',
            color: 'rgba(58, 111, 216, 1)',
            '&:hover': { background: 'rgba(231, 237, 247, 1)' },
          }}
          aria-label="Upload file"
        >
          <Upload size={20} strokeWidth={1.5} />
        </IconButton>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {isLoading ? `Uploading...${progress > 0 ? ` ${Math.round(progress)}%` : ''}` : displayInstruction}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          {displayDescription}
        </Typography>
      </Box>
      {showFileItem && (
        <Box
          sx={{
            mt: 1.5,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            background: 'rgba(241, 240, 247, 1)',
          }}
          role="status"
          aria-label={`Uploaded file: ${currentFile.name}`}
        >
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(58, 111, 216, 1)',
            }}
          >
            {currentFile.name}
          </Typography>
        </Box>
      )}
      {errorMessage && (
        <Typography
          role="alert"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--color-error)',
            mt: 1,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
