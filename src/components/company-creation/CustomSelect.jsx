import { useState, useRef, useEffect, useId } from 'react';
import { Box, Typography, List, ListItemButton } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { FormGroupLabel } from './FormGroupLabel';

export function CustomSelect({
  label,
  placeholder = 'Select roster',
  options = [],
  value,
  onChange,
  isRequired = false,
  id: idProp,
  errorMessage,
  showInfoIcon = false,
  infoIconAriaLabel,
  inputBackground,
  selectedValueTextColor,
  readOnly = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-labelledby': ariaLabelledby,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const reactId = useId();
  const id = idProp ?? reactId.replace(/:/g, '-');
  const listboxId = `${id}-listbox`;

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (!readOnly) setIsOpen((prev) => !prev);
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative' }}>
      {label && (
        <FormGroupLabel
          label={label}
          isRequired={isRequired}
          htmlFor={id}
          showInfoIcon={showInfoIcon}
          infoIconAriaLabel={infoIconAriaLabel}
        />
      )}
      <Box
        id={id}
        role="combobox"
        aria-haspopup={readOnly ? undefined : 'listbox'}
        aria-expanded={readOnly ? undefined : isOpen}
        aria-controls={readOnly ? undefined : listboxId}
        aria-activedescendant={isOpen && selectedOption ? `${id}-opt-${selectedOption.value}` : undefined}
        aria-label={ariaLabel ?? label ?? placeholder}
        aria-labelledby={ariaLabelledby}
        aria-required={isRequired}
        aria-readonly={readOnly || undefined}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? `${id}-error` : ariaDescribedby}
        onClick={handleClick}
        tabIndex={readOnly ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
          if (e.key === 'Escape') setIsOpen(false);
        }}
        sx={{
          background: inputBackground ?? 'rgba(248, 247, 251, 1)',
          borderRadius: 2,
          border: `1px solid ${errorMessage ? 'var(--color-error)' : 'rgba(221, 217, 235, 1)'}`,
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: readOnly ? 'default' : 'pointer',
          minHeight: 44,
          '&:hover': readOnly ? {} : { borderColor: 'rgba(58, 111, 216, 0.6)' },
          '&:focus-visible': readOnly ? {} : { outline: '2px solid rgba(58, 111, 216, 1)', outlineOffset: 2 },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: selectedOption
              ? selectedValueTextColor ?? 'rgba(73, 130, 145, 1)'
              : 'rgba(73, 130, 145, 1)',
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Typography>
        <ChevronDown
          size={20}
          color="rgba(47, 65, 74, 1)"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
          aria-hidden
        />
      </Box>
      {isOpen && (
        <List
          id={listboxId}
          role="listbox"
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            background: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            border: '1px solid rgba(221, 217, 235, 1)',
            maxHeight: 240,
            overflow: 'auto',
            zIndex: 1000,
            py: 0.5,
          }}
        >
          {options.length === 0 ? (
            <Typography sx={{ px: 2, py: 1.5, fontSize: '14px', color: 'rgba(73, 130, 145, 1)' }}>
              No options
            </Typography>
          ) : (
            options.map((opt) => (
              <ListItemButton
                key={opt.value}
                id={`${id}-opt-${opt.value}`}
                role="option"
                aria-selected={value === opt.value}
                selected={value === opt.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                sx={{
                  fontSize: '14px',
                  py: 1.25,
                  '&.Mui-selected': {
                    background: 'rgba(241, 246, 253, 1)',
                    color: 'rgba(58, 111, 216, 1)',
                  },
                }}
              >
                {opt.label}
              </ListItemButton>
            ))
          )}
        </List>
      )}
      {errorMessage && (
        <Typography
          id={`${id}-error`}
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
