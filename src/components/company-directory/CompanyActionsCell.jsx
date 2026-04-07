import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { setCompanyToDelete } from '../../store/slices/companyConfigSlice';
import { openDeleteCompanyModal } from '../../store/slices/uiSlice';

/**
 * Action icons for a company row: View (eye), Edit (square-pen), Delete (trash-2).
 * Spec: eye/trash rgba(0,0,0,1); square-pen rgba(47,65,74,1).
 */
export function CompanyActionsCell({ companyId, companyName, onView, onEdit, onDelete }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const displayName = companyName || 'Company';

  const handleView = (e) => {
    e.stopPropagation();
    if (onView) onView(companyId);
    else navigate(`/companies/${companyId}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(companyId);
    else navigate(`/companies/${companyId}/edit`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(companyId, displayName);
    } else {
      dispatch(setCompanyToDelete({ id: companyId, name: displayName }));
      dispatch(openDeleteCompanyModal());
    }
  };

  return (
    <Box
      component="td"
      sx={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(221, 217, 235, 1)',
        verticalAlign: 'middle',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={handleView}
          aria-label={`View details for ${displayName}`}
          sx={{ color: 'rgba(0, 0, 0, 1)', p: 0.5 }}
        >
          <Eye size={18} strokeWidth={2} />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleEdit}
          aria-label={`Edit ${displayName} details`}
          sx={{ color: 'rgba(47, 65, 74, 1)', p: 0.5 }}
        >
          <SquarePen size={18} strokeWidth={2} />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleDelete}
          aria-label={`Delete ${displayName}`}
          sx={{ color: 'rgba(0, 0, 0, 1)', p: 0.5 }}
        >
          <Trash2 size={18} strokeWidth={2} />
        </IconButton>
      </Box>
    </Box>
  );
}
