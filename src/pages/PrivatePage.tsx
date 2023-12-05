import { VFC, useState, useEffect } from 'react';
import useAuthState from 'hooks/useAuthState';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import FullCalendar from '@fullcalendar/react';
import  DateClickArg  from '@fullcalendar/react'; // ここでDateClickArgをインポート
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

// イベントデータの型
interface EventData {
  title: string;
  start: Date;
  end: Date;
}

const PrivatePage: VFC = () => {
  const { isLoading, email, userName, userId } = useAuthState();
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const eventsRef = collection(db, `users/${userId}/events`);
        const querySnapshot = await getDocs(eventsRef);

        const eventData: EventData[] = [];

        querySnapshot.forEach((doc) => {
          const event: EventData = {
            title: doc.data().title,
            start: doc.data().start.toDate(),
            end: doc.data().end.toDate(),
          };
          eventData.push(event);
        });

        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleDateClick = (clickInfo: DateClickArg) => {
    // クリックされた位置の日時情報を取得してコンソールに出力
    console.log('Clicked date: ', clickInfo.dateStr);
  };

  const handleEventClick = (clickInfo: any) => {
    console.log('Clicked event:', clickInfo);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>マイページ</h2>
      <div>ようこそ{userName}さん!!</div>
      <div>{email}</div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridDay"
          locales={[jaLocale]}
          locale='ja'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          eventClick={(clickInfo: any) => handleEventClick(clickInfo)}
          dateClick={handleDateClick}
        />
      </div>
    </>
  );
};

export default PrivatePage;
