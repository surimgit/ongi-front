import React, { useRef, useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './style.css';
import { ResponseDto } from 'src/apis/dto/response';
import { PatchCalendarRequestDto, PostScheduleRequestDto } from 'src/apis/dto/request/calendar';
import CalendarColor from 'src/types/aliases/calendar-color.alias';
import { postScheduleRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { GetAllScheduleResponseDto } from 'src/apis/dto/response/calendar';
import { Schedule } from 'src/types/interfaces';

type Props = {
    show: boolean;
    onClose: () => void;
    onSave: (data: PostScheduleRequestDto) => void;
    selectedSchedule?: Schedule | null;
    onUpdate?: (id: number, data: PatchCalendarRequestDto) => void;
    position: { x: number; y: number };
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
};
  

export default function ScheduleModal({ show, selectedSchedule, onClose, onSave, onUpdate, position, setPosition }: Props) {
    
    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 일정 입력 상태 //
    const [title, setTitle] = useState('');
    const [category, setCategoty] = useState('');
    const [memo, setMemo] = useState('');
    const [repeat, setRepeat] = useState('반복 없음');

    // state: 날짜 지정 //
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    
    // state: 모달 상태 //
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    // state: 컬러 상태 //
    const [selectedColor, setSelectedColor] = useState<CalendarColor>('blue');

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];
      

    // event handler: 모달창 이동 //
    const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current && modalRef.current) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        setPosition({ x: newX, y: newY });
    }
    };

    // event handler: 모달창 클릭 //
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        isDragging.current = true;
        dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
        };
    }
    };

    // event handler: 모달창 클릭 해제 //
    const handleMouseUp = () => {
    isDragging.current = false;
    };
    
    // event handler: 컬러 선택 //
    const colorClickHandler = (color: string) => {
        setSelectedColor(color as CalendarColor); 
    };
    
    // event handler: 등록 버튼 클릭 시 //
    const onScheduleSaveHandler = () => {
        if (!startDate || !endDate) {
          alert('시작일과 종료일을 모두 선택해주세요.');
          return;
        }
    
        const requestBody: PostScheduleRequestDto = {
          calendarTitle: title,
          calendarCategory: category,
          calendarMemo: memo,
          calendarStart: startDate,
          calendarEnd: endDate,
          calendarRepeat: repeat,
          color: selectedColor
        };
        
        onSave(requestBody); 
        onClose(); 
    };

    // event handler: 일정 수정 핸들러 //
    const handleUpdate = () => {
        if (!startDate || !endDate) {
          alert("날짜 선택해주세요");
          return;
        }
      
        const updatedData = {
          calendarTitle: title,
          calendarCategory: category,
          calendarMemo: memo,
          calendarStart: startDate,
          calendarEnd: endDate,
          calendarRepeat: repeat,
          color: selectedColor
        };
      
        if (selectedSchedule) {
          onUpdate?.(selectedSchedule.calendarSequence, updatedData);
        }
      
        onClose();
    };

    // effect: 모달창 드래그 //
    useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
    }, []);

    // effect: //
    useEffect(() => {
        if (selectedSchedule) {
        setTitle(selectedSchedule.calendarTitle);
        setCategoty(selectedSchedule.calendarCategory);
        setMemo(selectedSchedule.calendarMemo);
        setStartDate(new Date(selectedSchedule.calendarStart));
        setEndDate(new Date(selectedSchedule.calendarEnd));
        setRepeat(selectedSchedule.calendarRepeat);
        setSelectedColor(selectedSchedule.color);
        } else {
        setTitle('');
        setCategoty('');
        setMemo('');
        setStartDate(null);
        setEndDate(null);
        setRepeat('반복 없음');
        setSelectedColor('blue');
        }
        console.log('모달이 받은 selectedSchedule:', selectedSchedule);
    }, [selectedSchedule]);
    
    if (!show) return null;
    
    return (
    <div
        ref={modalRef}
        className="calendar-modal"
        style={{ left: position.x, top: position.y }}
    >
        <div className="modal-header" onMouseDown={handleMouseDown}>
        {selectedSchedule ? '일정 수정' : '일정 등록' }
        </div>
        <div className="modal-content">
        <div className="row">
            <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="카테고리" value={category} onChange={(e) => setCategoty(e.target.value)}/>
        </div>
        <div className="row">            
        <DatePicker
        selected={startDate}                
        onChange={(date) => setStartDate(date)} 
        placeholderText="시작일" 
        dateFormat="yyyy-MM-dd" 
        />
        <DatePicker
        selected={endDate}                
        onChange={(date) => setEndDate(date)} 
        placeholderText="종료일" 
        dateFormat="yyyy-MM-dd"  
        />
            <select value={repeat} onChange={(e) => setRepeat(e.target.value)}> 
            <option value='반복 없음'>반복 없음</option>
            <option value='매일'>매일</option>
            <option value='매주'>매주</option>
            <option value='매년'>매년</option>
            </select>
        </div>
        <div className="color-picker">
            {["pink", "red", "blue", "yellow", "purple", "green", "orange"].map((color) => (
                <div
                key={color}
                className={`color ${color} ${selectedColor === color ? "selected" : ""}`}
                onClick={() => colorClickHandler(color)}
                />
            ))}
        </div>
        <textarea placeholder="메모" value={memo} onChange={(e) => setMemo(e.target.value)}/>
        <div className="buttons">
            <button className="cancel" onClick={onClose}>닫기</button>

            {selectedSchedule ? (
                <button className="submit update" onClick={handleUpdate}>수정</button>
            ) : (
                <button className="submit" onClick={onScheduleSaveHandler}>등록</button>
            )}
            </div>
        </div>
    </div>
    );
    
}
