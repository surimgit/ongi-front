import React, { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import ScheduleModal from "./Modal/ScheduleModal";
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import './style.css';
import { useLocation, useSearchParams } from "react-router";
import { ACCESS_TOKEN, MAIN_ABSOLUTE_PATH } from "src/constants";
import { GetAllScheduleResponseDto, PostScheduleResponseDto } from "src/apis/dto/response/calendar";
import { ResponseDto } from "src/apis/dto/response";
import { Schedule } from "src/types/interfaces";
import { useCookies } from "react-cookie";
import { deleteScheduleRequest, getAllScheduleRequest, patchScheduleRequest, postScheduleRequest } from "src/apis";
import { PatchCalendarRequestDto, PostScheduleRequestDto } from "src/apis/dto/request/calendar";
import ScheduleViewModal from "./View/ScheduleViewModal";
import Policy from "../Policy";
import GetHelperPostListResponseDto from "src/apis/dto/response/needhelper/get-helper-post-list.response.dto";

export default function Calendar() {

  
  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 캘린더 렌더링 //
  const calendarRef = useRef<FullCalendar>(null);

  // state: 플러그인 //
  const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin];

  // state: 일정 리스트 상태 //
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  // state: 모달 상태 //
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });

  // state: 경로 상태 //
  const { pathname } = useLocation();

  // state: 컬러 상태 //
  const colorMap: Record<string, string> = {
    pink: "#ff81cf",
    red: "#f3554a",
    blue: "#5ea9ff",
    yellow: "#ffd416",
    purple: "#9b69f8",
    green: "#4dd454",
    orange: "#ffa928"
  };

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, event: any } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // state: 검색 상태 //
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const section = parseInt(searchParams.get('section') || '1', 10);

  // state: 검색 실행 여부 //
  const [autoSearch, setAutoSearch] = useState(false);

  // state: scrap 상태 //
  const [isScrap, setIsScrap] = useState<boolean>(false);
  const [scrapedScheduleId, setScrapedScheduleId] = useState<number | null>(null);
  const [scrapMap, setScrapMap] = useState<{ [plcyNo: string]: number }>({});

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // event handler: 날짜 클릭 //
  const onDateClickHandler = (date: { dateStr: string }) => {
    setSelectedSchedule(null);
    setShowEditModal(true);
  };

  // event handler: 이벤트 클릭 //
  const onEventClickHandler = (clickInfo: any) => {

    const event = clickInfo.event;

    const scheduleData: Schedule = {
      calendarSequence: Number(event.id),
      calendarTitle: event.title,
      calendarCategory: event.extendedProps.category,
      calendarMemo: event.extendedProps.description,
      calendarStart: event.startStr,
      calendarEnd: event.endStr,
      calendarRepeat: event.extendedProps.repeat,
      color: event.backgroundColor
      
    };
    
    setSelectedSchedule(scheduleData);
    setShowViewModal(true);
  };

  // function: 일정 렌더링 //
  const onRenderEventContentHandler = (eventInfo: any) => {
    const backgroundColor = eventInfo.event.backgroundColor || '#ffffff';
    return (
      <div style={{backgroundColor: backgroundColor, width: '100%', borderRadius: '3px'}}>
        <b>{eventInfo.timeText}</b> <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  // function: 일정 저장 //
  const onSaveSchedule = async (schedule: PostScheduleRequestDto) => {
    if (!accessToken) return;
  
    const response = await postScheduleRequest(schedule, accessToken);
    if (!response || response.code !== 'SU') {
      alert("일정 저장 실패");
      return;
    }
    calendarRef.current?.getApi().refetchEvents();
  };
  
  // function: 일정 수정 //
  const onUpdateSchedule = async (id: number, dto: PatchCalendarRequestDto) => {
    if (!accessToken) return;
    const res = await patchScheduleRequest(id, dto, accessToken);
    if (res?.code !== 'SU') {
      alert("수정 실패");
      return;
    }
    calendarRef.current?.getApi().refetchEvents();
  };
  
  // function: 일정 삭제 //
  const onDeleteSchedule = async (id: number) => {
    if (!accessToken) return;
    const res = await deleteScheduleRequest(id, accessToken);
    if (res?.code !== 'SU') {
      alert("삭제 실패");
      return;
    }
    calendarRef.current?.getApi().refetchEvents();
  };  

  // function: open/close 우클릭 메뉴 //  
  const openContextMenu = (x: number, y: number, event: any) => {
    setContextMenu({ x, y, event });
  };
  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // function: 정책 스크랩 저장 함수 //
  const onScrapPolicy = async (policy: { title: string; category: string; content: string; period: string }) => {
    if (!accessToken) return;
    const plcyNo = policy.title;

    let [start, end] = policy.period === '상시'
      ? ['2000-01-01', '2099-12-31']
      : policy.period.split(' ~ ').map(date => date.replace(/\./g, '-'));

    const formatToLocalDateTime = (date: string) => `${date} 00:00:00`;

    const existingId = scrapMap[plcyNo];

    if (!existingId) {
      const dto: PostScheduleRequestDto = {
        calendarTitle: policy.title,
        calendarCategory: policy.category,
        calendarMemo: policy.content,
        calendarStart: formatToLocalDateTime(start),
        calendarEnd: formatToLocalDateTime(end),
        calendarRepeat: '반복 없음',
        color: 'blue'
      };

      const response = await postScheduleRequest(dto, accessToken);
      const calendarSequence = (response as PostScheduleResponseDto).calendarSequence;

      if (!response || response.code !== 'SU') return alert("스크랩 실패");

      const updated = { ...scrapMap, [plcyNo]: calendarSequence };
      localStorage.setItem('scrapMap', JSON.stringify(updated));

    } else {

      const res = await deleteScheduleRequest(existingId, accessToken);

      if (!res || res.code !== 'SU') return alert("스크랩 해제 실패");

      const updated = { ...scrapMap };
      delete updated[plcyNo];
      setScrapMap(updated);
      localStorage.setItem('scrapMap', JSON.stringify(updated));
      
    }
    calendarRef.current?.getApi().refetchEvents();
  };

  // effect: 메뉴 바깥 클릭 시 닫히도록 처리 //
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (keyword) {
      setAutoSearch(true);
    }
  }, [keyword]);

  // effect: 스크랩 로컬 저장 //
  useEffect(() => {
    const saved = localStorage.getItem('scrapMap');
      if (saved) setScrapMap(JSON.parse(saved));
  }, []);

  // effect: local starage 정보 불러오기 //
  useEffect(() => {
    const storedMap = localStorage.getItem('scrapMap');
    if (storedMap) {
      setScrapMap(JSON.parse(storedMap));
    }
  }, []);

  // render: 컴포넌트 렌더링 //
  return (
    <div id="fullcalendar-wrapper">
      <FullCalendar
        ref={calendarRef}
        googleCalendarApiKey="AIzaSyBj5r2Y9KhUIi7gzwIvb4utajJLhUYygM0"
        plugins={plugins}
        initialView="dayGridMonth"
        eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, 
        }}
        headerToolbar={{
          left: "title",
          right: "dayGridMonth today"
        }}
        height={700}
        buttonText={{
          month: "월별",
          today: "오늘",
          list: "리스트"
        }}
        footerToolbar={{
          left: "prev",
          center: "",
          right: "next"
        }}
        eventDidMount={(info) => {          
          info.el.addEventListener("contextmenu", (e) => {
            e.preventDefault(); // 기본 우클릭 메뉴 막기
            openContextMenu(e.pageX, e.pageY, info.event); 
          });
        }}
        eventSources={[
          {
            googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
            className: 'korea-holiday',
            textColor: 'var(--Error)',
          },
          {
            events: async (info, successCallback, failureCallback) => {
              const response = await getAllScheduleRequest(accessToken);
              
              if (!response || !('schedules' in response)) {
                console.error("📛 일정 정보 없음 또는 오류:", response);
                failureCallback(new Error("일정 불러오기 실패"));
                return;
              }
            
              const { schedules } = response;
              
              const events = schedules.map(schedule => ({
                id: schedule.calendarSequence.toString(),
                title: schedule.calendarTitle,
                start: new Date(schedule.calendarStart),
                end: new Date(schedule.calendarEnd),
                backgroundColor: colorMap[schedule.color],
                extendedProps: {
                  category: schedule.calendarCategory,
                  description: schedule.calendarMemo,
                  repeat: schedule.calendarRepeat,
                }
              }));

              successCallback(events);
            },
          },
        ]}

        dateClick={pathname === MAIN_ABSOLUTE_PATH ? undefined : onDateClickHandler}
        eventClick={pathname === MAIN_ABSOLUTE_PATH ? undefined : (info) => {
          const isGoogleCalendarEvent = info.event.url?.includes('google.com');
        
          if (isGoogleCalendarEvent) {
            info.jsEvent.preventDefault();
            info.jsEvent.stopPropagation();
            return false;
          }
        
          onEventClickHandler(info);
        }}
        eventContent={onRenderEventContentHandler}

        expandRows={true}
        dayMaxEventRows={false}
        dayMaxEvents={false} 
      />
      
      <ScheduleViewModal show={showViewModal} schedule={selectedSchedule} onClose={() => setShowViewModal(false)} 
      onEdit={() => {setShowViewModal(false); setShowEditModal(true);}}
      position={modalPosition}
      setPosition={setModalPosition}/>
      
      <ScheduleModal show={showEditModal} selectedSchedule={selectedSchedule} 
      onClose={()=> {setShowEditModal(false); setSelectedSchedule(null);}} 
      onSave={onSaveSchedule} onUpdate={onUpdateSchedule}
      position={modalPosition}
      setPosition={setModalPosition}/>
      
      {contextMenu && (
      <div
        ref={contextMenuRef}
        className="context-menu"
        style={{
          position: 'absolute',
          top: contextMenu.y,
          left: contextMenu.x,
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        <div
          className="menu-item"
          onClick={() => {
            const id = parseInt(contextMenu.event.id, 10);
            onDeleteSchedule(id);
            closeContextMenu();
          }}
        >
          일정 삭제
        </div>
      </div>
    )}
      {pathname === MAIN_ABSOLUTE_PATH ? undefined : 
      <Policy 
        searchKeyword={keyword} 
        page={page} 
        section={section} 
        autoSearch={true} 
        items={[]} 
        onScrap={onScrapPolicy}        
        calendarRef={calendarRef}
      />}
    </div>
  );
  
}
