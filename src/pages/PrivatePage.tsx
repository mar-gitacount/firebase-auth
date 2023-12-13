import { VFC, useState, useEffect } from 'react';
import useAuthState from 'hooks/useAuthState';
import { getFirestore, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import FullCalendar from '@fullcalendar/react';
// import { DateSelectArgType } from '@fullcalendar/react';
import DateClickArg from '@fullcalendar/react'; // ここでDateClickArgをインポート
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { title } from 'process';
import { start } from 'repl';


// イベントデータの型
interface EventData {
  id: string;
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
  const [events, setEvents] = useState<EventData[]>([]);
  const [dogid, setDogid] = useState<DogsData[]>([]);
  // ポップアップ制御の定数
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

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
          //サーバータイムスタンプで制作一覧を取得し、その中のイベント日が
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

  //各犬のデータレンダリングする。
  //events定数を管理し、変更されたらレンダリング
  useEffect(() => {
    const dogEventFetchData = async () => {
      try {
        console.log(userId);
        console.log(dogid);
        const doggetId = dogid.map((dog) => dog.id);
        const db = getFirestore();
        const dogcollectionRef = collection(db, `users/${userId}/dogs/${doggetId}/events/`);
        console.log(`users/${userId}/dogs/${doggetId}/events/`)
        const dogsCollectionquerySnapshot = await getDocs(dogcollectionRef);
        const dogeventData: EventData[] = [];

        const dogDataArray = dogsCollectionquerySnapshot.docs.map((doc) => {
          console.log(doc.id)
          const eventData: EventData = {
            id: doc.id || '',
            title: doc.data().title || '',
            start: doc.data().start?.toDate() || new Date(),
            end: doc.data().end?.toDate() || new Date(),
          };
          dogeventData.push(eventData)
          return eventData;
        });

        console.log(dogDataArray)

        setEvents(dogDataArray);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // エラーが発生した場合の適切な処理を追加してください
      }
    };

    dogEventFetchData();
  }, [dogid]);


  const handleDateClick = (clickInfo: DateClickArg) => {
    // クリックされた位置の日時情報を取得してコンソールに出力
    console.log('Clicked date: ', clickInfo);
  };

  const handleDateSelect = (selectionInfo: DateClickArg) => {
    console.log('selectionInfo: ', selectionInfo); // 選択した範囲の情報をconsoleに出力
    const calendarApi = selectionInfo.view.calendar;

    calendarApi.unselect(); // 選択した部分の選択を解除
  };


  // 既存のイベントを出力する。
  const handleEventClick = (clickInfo: any) => {
    console.log('Clicked event:', clickInfo.event.title);
    //各イベントを追加する。
    setSelectedEvent(clickInfo.event.title);
    setSelectedEvent(prevState => ({
      ...prevState,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end
    }));
    setShowPopup(true);

    // showPopupWithData(clickInfo.event);

  };

  if (isLoading) {
    return <p>Loading...</p>;
  }


  const closePopup = () => {
    setShowPopup(false);
  };

  const Popup = () => {
    // const setSelectedEvent = 'Selected Event'; // 仮の値

    const style = {
      // position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      zIndex: '9999',
    };

    return (
      <>
        <div className="popup" style={style}>
          <h3>{setSelectedEvent}</h3>
          {/* 他のイベントの詳細情報を表示するためのHTMLを追加 */}
          <button>Close</button>
        </div>
      </>
    );
  };






  // ポップアップを表示するための関数
  const showPopupWithData = (event: any) => {

    // クリックされたイベントから詳細情報を取得
    const eventTitle = event.title;
    const eventStart = event.start;
    const eventEnd = event.end;


    // ポップアップを表示するためのHTMLやコンポーネントを作成する
    const popupContent = `
    <div>
      <h3>${eventTitle}</h3>
      <p>Start: ${eventStart}</p>
      <p>End: ${eventEnd}</p>
      <!-- 他のイベントの詳細情報を表示するためのHTMLを追加 -->
    </div>
  `;

    // ポップアップを表示するためのモーダルウィンドウやポップアップコンポーネントを作成する
    const popupElement = document.createElement('div');
    popupElement.innerHTML = popupContent;

    // ポップアップを表示するためのスタイルやクラスを設定する
    popupElement.style.position = 'fixed';
    popupElement.style.top = '50%';
    popupElement.style.left = '50%';
    popupElement.style.transform = 'translate(-50%, -50%)';
    popupElement.style.backgroundColor = 'white';
    popupElement.style.padding = '20px';
    popupElement.style.border = '1px solid #ccc';
    popupElement.style.borderRadius = '5px';
    popupElement.style.zIndex = '9999';

    // ボディにポップアップ要素を追加して表示する
    document.body.appendChild(popupElement);
    // クリックされたイベントの詳細情報が表示されたポップアップを閉じるためのボタンなどを追加することもできます
  };



  //犬の名前を選択したら、それを取得する。
  const handleDogNameClick = (id: string) => {
    console.log('Clicked dog ID:', id);
    const dogevent: DogsData = {
      name: "",
      id: id
    }
    //犬のid配列を一度空にする。
    setDogid([]);
    setDogid(prevDogid => [...prevDogid, dogevent]);

    // ここでクリックされた犬のIDに対する処理を実行できます
    //犬のデータを呼び出す。
    //eventsに値を入力する。

  };

  return (
    <>
      {showPopup && (
        <>
          <Popup />
          <div className="popup" style={{ zIndex: 100 }}>
            <p>{selectedEvent}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </>
      )}
      <h2>マイページ</h2>
      <div>ようこそ{userName}さん!!</div>
      <div>{email}</div>
      {/* ここに犬たちのデータを入れ込む */}
      <div className="">
        {/* 犬データ一覧 */}
        <ul>
          {dogsData.map((dog) => (
            <li key={dog.id}>
              <button onClick={() => handleDogNameClick(dog.id)}>Dog Name: {dog.name}</button>
              {/* <p>Dog Name: {dog.name}</p> */}
              {/* <p>Dog Id: {dog.id}</p> */}
              {/* 他の情報も表示できます */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="timeGridDay"
          locales={[jaLocale]}
          locale='ja'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          selectable={true}
          selectMirror={true}
          dateClick={(info) => {
            alert('Clicked on: ' + info.dateStr);
            alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            alert('Current view: ' + info.view.type);
            // change the day's background color just for fun
            if (info.dayEl) {
              info.dayEl.style.backgroundColor = 'red';
            }
          }}
          eventClick={(clickInfo) => {
            // console.log(clickInfo)
            alert(clickInfo)
            if (clickInfo.event) {
              const event = clickInfo.event;
              alert('Clicked on event: ' + event.title);
              // その他の処理
            } else if (clickInfo.date) {
              alert('Clicked on date: ' + clickInfo.dateStr);
              // その他の処理
            }
          }}
          // 他のプ
          // select={handleDateClick}

          //上記で入手したeventsカレンダー作成時に再度コメントアウトを解除する。
          // 各犬のイベント一覧
          // events={events}

          events={events.map(event => ({
            ...event,
            id: event.id, // 既存のイベントデータに存在するIDフィールドをidとして追加
          }))}
          eventClick={(clickInfo: any) => handleEventClick(clickInfo)}
        // dateClick={handleDateClick}
        />
      </div>
    </>
  );
};

export default PrivatePage;
