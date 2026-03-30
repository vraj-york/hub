import { Box, Typography, Divider } from '@mui/material';

const defaultLabelColor = 'rgba(56, 89, 102, 1)';
const defaultValueColor = 'rgba(47, 65, 74, 1)';
const defaultDividerColor = 'rgba(221, 217, 235, 1)';

export function ConfigDisplayRow({
  label,
  value,
  labelId,
  labelColor = defaultLabelColor,
  valueColor = defaultValueColor,
  labelFontWeight = 400,
  valueFontWeight = 500,
  valueFontSize = '14px',
  dividerColor = defaultDividerColor,
}) {
  const id = labelId ?? `config-${String(label).replace(/\s+/g, '-').toLowerCase()}`;
  const isReactNode = typeof value === 'object' && value !== null && (typeof value.type === 'function' || typeof value.type === 'string');
  const DdComponent = isReactNode ? Box : Typography;
  const ddSx = isReactNode
    ? { m: 0 }
    : {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: valueFontSize,
        fontWeight: valueFontWeight,
        color: valueColor,
        m: 0,
      };
  return (
    <Box component="dl" sx={{ m: 0, mb: 1.5 }} aria-labelledby={id}>
      <Typography
        component="dt"
        id={id}
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: labelFontWeight,
          color: labelColor,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <DdComponent component="dd" aria-labelledby={id} sx={ddSx}>
        {value}
      </DdComponent>
      <Divider sx={{ borderColor: dividerColor, mt: 1.5 }} />
    </Box>
  );
}
