// MyDialog.js
import React, { useState, memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { EventData } from 'hooks/interfases';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';


type Props = {
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
  viewitem: EventData
};



const MyDialog = memo((props: Props) => {
  const { viewFlag, setViewFlag, viewitem } = props;
  const [open, setOpen] = useState(false);
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  // 始まりの時間を設定する。
  const [selectedStartTime, setSelectedStartTime] = useState<Value>(new Date(viewitem.start))
 //!テスト用変数  
  // const [value, onChange] = useState<Value>(new Date());
  useEffect(() => {
    setViewFlag(true);
    // const {viewitem} = props;
    // const [events, setEvents] = useState<EventData[]>([]);
    // console.log(props);
    console.log(viewitem.start);
    console.log("呼び出しされている");
    if (viewFlag) {

      handleClickOpen()
    }

  }, [viewFlag]);


  const handleClickOpen = () => {
    setOpen(true);
    console.log(props)
  };

  const handleClose = () => {
    // setOpen(false);
    setViewFlag(false);
  };

  const handleDateChange=(value:any) => {
    setSelectedStartTime(value);
    console.log('Selected date:', value);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* ダイアログの中身 */}
        <div>
          <h2>犬のデータを追加もしくは編集する</h2>
          <p>This is the dialog content.</p>
          <p>{viewitem.start.toString()}</p>
          <div>
          {/* <DateTimePicker onChange={selectedStartTime => selectedStartTime && handleDateChange(selectedStartTime)} value={selectedStartTime} /> */}
          <DateTimePicker onChange={handleDateChange} value={selectedStartTime} />

          </div>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Dialog>
    </div>
  );
});

export default MyDialog;
