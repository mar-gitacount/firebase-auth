import { VFC, useState, useEffect } from 'react';
import useAuthState from 'hooks/useAuthState';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import FullCalendar from '@fullcalendar/react';
import DateClickArg from '@fullcalendar/react'; // ここでDateClickArgをインポート
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';

// イベントデータの型
interface EventData {
  title: string;
  start: Date;
  end: Date;
}

//犬のイベントデータを定義
interface DogsData {
  name: string;
  id: string
}

const PrivatePage: VFC = () => {
  const { isLoading, email, userName, userId } = useAuthState();
  // const [events, setEvents] = useState<EventData[]>([]);
  const [dogsData, setDogsData] = useState<DogsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        //犬のデータコレクション
        const dogsCollectionRef = collection(db, `users/${userId}/dogs`);
        const dogsCollectionquerySnapshot = await getDocs(dogsCollectionRef);
        //データ配列を入れ込む
        const dogsDataArray: DogsData[] = []
        // 犬たちのデータ一覧
        dogsCollectionquerySnapshot.forEach((doc) => {
          // 各ドキュメントのデータを取得する
          //各ドキュメントをループして一覧にする。
          //犬一覧で、SPA実装する。
          //クリックした犬の情報がカレンダー形式で表示される。
          //デフォルトでは全て表示する。
          const event: DogsData = {
            //犬の名前
            name: doc.data().name,
            //ドキュメントidを取得する。
            id: doc.id
          };
          dogsDataArray.push(event);
          console.log(doc.id, ' => ', doc.data());
          console.log(event.id)
        });

        // const querySnapshot = await getDocs(eventsRef);

        const eventData: EventData[] = [];

        // querySnapshot.forEach((doc) => {
        //   const event: EventData = {
        //     title: doc.data().title,
        //     start: doc.data().start.toDate(),
        //     end: doc.data().end.toDate(),
        //   };
        //   eventData.push(event);
        // });

        setDogsData(dogsDataArray);
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


  const handleDogNameClick = (id: string) => {
    console.log('Clicked dog ID:', id);
    // ここでクリックされた犬のIDに対する処理を実行できます
  };

  return (
    <>
      <h2>マイページ</h2>
      <div>ようこそ{userName}さん!!</div>
      <div>{email}</div>
      {/* ここに犬たちのデータを入れ込む */}
      <div className="">
        {/* 犬データ一覧 */}
        <ul>
          {dogsData.map((dog) => (
            <li key={dog.id}>
              <p onClick={() => handleDogNameClick(dog.id)}>Dog Name: {dog.name}</p>
              <p>Dog Name: {dog.name}</p>
              <p>Dog Id: {dog.id}</p>
              {/* 他の情報も表示できます */}
            </li>
          ))}
        </ul>
      </div>
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
          //上記で入手したeventsカレンダー作成時に再度コメントアウトを解除する。
          // events={events}
          eventClick={(clickInfo: any) => handleEventClick(clickInfo)}
        // dateClick={handleDateClick}
        />
      </div>
    </>
  );
};

export default PrivatePage;
