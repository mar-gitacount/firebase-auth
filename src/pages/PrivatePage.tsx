import { VFC } from 'react';
import useAuthState from 'hooks/useAuthState';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 追加
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja'; 
/**
 * 表示にログインを必要とするページ
 */
const PrivatePage: VFC = () => {
  const { isLoading, email, userName} = useAuthState();
  console.log(useAuthState().userName);
  // const name = useAuthState().userName
  if (isLoading) {
    return <p>Loadiing...</p>;
  }

  return (
    <>
      <h2>マイページ</h2>
      <div>ようこそ{userName}さん!!</div>
      <div>{email}</div>
      <div>
      <FullCalendar 
      plugins={[dayGridPlugin,timeGridPlugin]} initialView="dayGridMonth"
      locales={[jaLocale]}         
      locale='ja'                 
      headerToolbar={{                         
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      }}
      events={[
        {title:'eventを', start: '2022-03-14'},
        {title:'こんな感じで追加できます', start: '2022-03-15', end: '2022-03-17'}
      ]}
      />
    </div>
      
    </>
  );
};

export default PrivatePage;
