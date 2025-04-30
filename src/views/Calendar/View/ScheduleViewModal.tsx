import React, { useEffect, useRef, useState } from "react";
import { Schedule } from "src/types/interfaces";

import './style.css';

type Props = {
  show: boolean;
  schedule: Schedule | null;
  onClose: () => void;
  onEdit: () => void;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
};

export default function ScheduleViewModal({ show, schedule, onClose, onEdit, position, setPosition  }: Props) {
  
      
    // state: 모달 상태 //
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    
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
    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return '-';
        const parsed = new Date(date);
        return isNaN(parsed.getTime()) ? '-' : parsed.toISOString().slice(0, 10);
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
  
    if (!show || !schedule) return null;

    return (
    <div 
    ref={modalRef}
    className="schedule-view-wrapper" 
    style={{ left: position.x, top: position.y }} >
        <div className="schedule-view-title"
        onMouseDown={handleMouseDown}>
            {schedule.calendarTitle}
        </div>
        <div className="schedule-view-content">
            <div className="info-box date">{formatDate(schedule.calendarStart)} ~ {formatDate(schedule.calendarEnd)}</div>
            <div className="info-box category">{schedule.calendarCategory}</div>
            <div className="info-box repeat">{schedule.calendarRepeat}</div>
        </div>
        <div className="schedule-view-descripiton">{schedule.calendarMemo}</div>
        <div className="buttons">
            <button className="buttons cancel" onClick={onClose}>닫기</button>
            <button className="buttons submit" onClick={onEdit}>수정</button>
        </div>
    </div>
    );
}
