import { Box, Typography } from '@mui/material';
import { Info, Ban } from 'lucide-react';

const TYPE_STYLES = {
  danger: {
    background: 'rgba(253, 243, 243, 1)',
    iconColor: 'rgba(196, 71, 85, 1)',
    titleColor: 'rgba(161, 47, 63, 1)',
    descriptionColor: 'rgba(47, 65, 74, 1)',
    Icon: Ban,
    role: 'alert',
    ariaLive: 'assertive',
  },
  info: {
    background: 'rgba(241, 246, 253, 1)',
    iconColor: 'rgba(58, 111, 216, 1)',
    titleColor: 'rgba(47, 65, 74, 1)',
    descriptionColor: 'rgba(73, 130, 145, 1)',
    Icon: Info,
    role: 'status',
    ariaLive: 'polite',
  },
};

export function InfoAlertCard({
  title,
  description,
  icon: IconProp,
  type = 'info',
  backgroundColor,
  titleColor,
  descriptionColor,
  iconColor,
  ariaLabel,
}) {
  const style = TYPE_STYLES[type] || TYPE_STYLES.info;
  const IconComponent = IconProp ?? style.Icon;
  const bg = backgroundColor ?? style.background;
  const titleClr = titleColor ?? style.titleColor;
  const descClr = descriptionColor ?? style.descriptionColor;
  const iconClr = iconColor ?? style.iconColor;
  const role = style.role;
  const ariaLive = style.ariaLive;

  return (
    <Box
      role={role}
      aria-live={ariaLive}
      aria-label={ariaLabel}
      sx={{
        background: bg,
        borderRadius: 2,
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
      }}
    >
      <IconComponent size={20} color={iconClr} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: titleClr,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: descClr,
              mt: 0.5,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
