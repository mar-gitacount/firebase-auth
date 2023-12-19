// MyDialog.js
import React, { useState,memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import {EventData} from 'hooks/interfases';

type Props = {
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
  viewitem:EventData
};



const MyDialog = memo((props:Props) => {
  const { viewFlag, setViewFlag ,viewitem} = props;
  const [open, setOpen] = useState(false);
  useEffect(() =>  {
    setViewFlag(true);
    // const {viewitem} = props;
    // const [events, setEvents] = useState<EventData[]>([]);
    console.log(props);
    console.log(viewitem)
    console.log("呼び出しされている");
    if(viewFlag){
      console.log("出力");
      handleClickOpen()
    }

  },[viewFlag]);
 

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props)
  };

  const handleClose = () => {
    setOpen(false);
    setViewFlag(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* ダイアログの中身 */}
        <div>
          <h2>Dialog Title</h2>
          <p>This is the dialog content.</p>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Dialog>
    </div>
  );
});

export default MyDialog;
