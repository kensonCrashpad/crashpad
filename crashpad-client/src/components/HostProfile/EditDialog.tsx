import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';



interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '500px', height: '600px', backgroundColor: '#f0f0f0', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }, }}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Edit Demographics</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TextField label="First Name" fullWidth sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
          <TextField label="Last Name" fullWidth sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
        </Box>
        <TextField label="Username" fullWidth sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TextField label="Age" fullWidth sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
          <TextField label="Gender" fullWidth sx={{ flex: 1, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
        </Box>
        <TextField label="Email" fullWidth sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
        <TextField label="Description" fullWidth sx={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;