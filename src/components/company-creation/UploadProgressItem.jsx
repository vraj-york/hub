import { Box, Typography } from '@mui/material';
import { Loader2 } from 'lucide-react';

export function UploadProgressItem({ fileName, progress = 0, status = 'uploading' }) {
  const isUploading = status === 'uploading';
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={isUploading ? `Uploading ${fileName}, ${progress}%` : `Upload ${fileName} ${status}`}
      sx={{
        background: 'rgba(248, 247, 251, 1)',
        borderRadius: 1,
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      {isUploading && (
        <Loader2
          size={18}
          color="rgba(58, 111, 216, 1)"
          style={{ flexShrink: 0, animation: 'spin 1s linear infinite' }}
          aria-label="File uploading"
        />
      )}
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(58, 111, 216, 1)',
        }}
      >
        {isUploading ? `Uploading... ${Math.round(progress)}%` : fileName}
      </Typography>
    </Box>
  );
}
