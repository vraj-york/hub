import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVertical } from 'lucide-react';

export function CorporationActionsMenu({
  corporationId,
  corporationName,
  status = 'Active',
  onSuspend,
  onReinstate,
  onClose: onCloseProp,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onCloseProp?.();
  };

  const handleEdit = () => {
    navigate(`/corporations/${corporationId}/edit`);
    handleClose();
  };

  const handleSuspend = () => {
    onSuspend?.(corporationId);
    handleClose();
  };

  const handleReinstate = () => {
    onReinstate?.(corporationId);
    handleClose();
  };

  const isActive = status === 'Active';

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        aria-label={`More actions for ${corporationName ?? 'corporation'}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `corp-actions-menu-${corporationId}` : undefined}
        sx={{ color: 'rgba(47, 65, 74, 1)' }}
      >
        <MoreVertical size={18} aria-hidden />
      </IconButton>
      <Menu
        id={`corp-actions-menu-${corporationId}`}
        role="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ 'aria-label': `Actions for ${corporationName}` }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        {isActive ? (
          <MenuItem onClick={handleSuspend}>Suspend</MenuItem>
        ) : (
          <MenuItem onClick={handleReinstate}>Reinstate</MenuItem>
        )}
      </Menu>
    </>
  );
}
