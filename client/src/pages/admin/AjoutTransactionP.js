
import React from 'react'
import { Dialog, IconButton, DialogContent} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AjoutTransaction from '../../components/admin/transaction/AjoutTransaction';
const AjoutTransactionP = ( {open, handleClose, isEditMode, selectedPerson, allTransaction } ) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
    <DialogContent style={{ position: 'relative' }}>
      {/* Bouton de fermeture en haut à droite */}
      <IconButton
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'gray',
        }}
      >
        <CloseIcon />
      </IconButton>
      <AjoutTransaction      
      handleClose={handleClose}
      isEditMode={isEditMode}
      selectedPerson={selectedPerson}
      allTransaction={allTransaction} />
    </DialogContent>
  </Dialog>
  )
}

export default AjoutTransactionP
