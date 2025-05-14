import React, { useEffect, useRef, useState } from 'react';

import { Color } from '@tiptap/extension-color';
import { Image } from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import P, { Placeholder } from '@tiptap/extension-placeholder';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import './style.css';
import { fileUploadsRequest } from 'src/apis';

// interface: Text Editor Menu Bar 컴포넌트 속성 //
interface MenuBarProp {
  editor: Editor | null
}

// component: Text Editor Menu Bar 컴포넌트 //
function MenuBar({ editor }: MenuBarProp) {

  // render: Text Editor Menu Bar 컴포넌트 렌더링 //
  if (!editor) return null;

  // render: Text Editor Menu Bar 컴포넌트 렌더링 //
  return (
    <div id='text-editor-menu-bar'>
      <div className='item-box'>
        <div className={`item ${editor.isActive('bold') ? 'active' : ''} bold`} onClick={() => editor.chain().focus().toggleBold().run()}></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('italic') ? 'active' : ''} italics`} onClick={() => editor.chain().focus().toggleItalic().run()}></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('strike') ? 'active' : ''} strike`} onClick={() => editor.chain().focus().toggleStrike().run()}></div>
      </div>
      <div className='item-box'>
        <div className='divider'></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('heading', { level: 1 }) ? 'active' : ''} h1`} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('heading', { level: 2 }) ? 'active' : ''} h2`} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('heading', { level: 3 }) ? 'active' : ''} h3`} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}></div>
      </div>
      <div className='item-box'>
        <div className='divider'></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('orderedList') ? 'active' : ''} ol`} onClick={() => editor.chain().focus().toggleOrderedList().run()}></div>
      </div>
      <div className='item-box'>
        <div className={`item ${editor.isActive('bulletList') ? 'active' : ''} ul`} onClick={() => editor.chain().focus().toggleBulletList().run()}></div>
      </div>
      <div className='item-box'>
        <div className='divider'></div>
      </div>
      <div className='item-box'>
        <div className='item hori' onClick={() => editor.chain().focus().setHorizontalRule().run()}></div>
      </div>
      <div className='item-box'>
        <div className='divider'></div>
      </div>
      <div className='item-box'>
        <div className='item left' onClick={() => editor.chain().focus().undo().run()}></div>
      </div>
      <div className='item-box'>
        <div className='item right' onClick={() => editor.chain().focus().redo().run()}></div>
      </div>
    </div>
  )
}

// variable: tiptap Text Editor 확장 //
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Placeholder.configure({
    placeholder: '내용을 입력하세요.'
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, 
    },
  }),
]


// interface: tiptap Text Editor 컴포넌트 속성 //
interface Props {
  content: string;
  setContent: (content: string) => void;
}

// component: tiptap Text Editor 컴포넌트 //
export default function TextEditor({ content, setContent }: Props) {

  // state: editor 상태 //
  const editor = useEditor({
    extensions: [StarterKit, Image,],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    }
  })

  // state: content 최초 상태 //
  const hasSetInitialContent = useRef(false);

  // state: 파일 인풋 참조 상태 //
  const fileRefs = useRef<HTMLInputElement>(null);

  const [postImages, setPostImages] = useState<string[]>([]);

  // event handler: 이미지 첨부 버튼 클릭 이벤트 처리 //
  const onImageUploadClickHandler = () => {
    fileRefs.current?.click();
  };

  // event handler: 이미지 첨부 이벤트 처리 //
  const onHandleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editor) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    
    const uploadedImages = await fileUploadsRequest(formData);
    if (!uploadedImages) return;
    setPostImages(prev => [...prev, ...uploadedImages]);

    uploadedImages.forEach((url) => {
      editor.commands.insertContent(`<img src="${url}" alt="이미지" /><p></p>`);
    });
    
    e.target.value = '';
  };

  // effect: content 변경시 실행할 함수 //
  useEffect(() => {
    if (editor && content && !hasSetInitialContent.current) {
      editor.commands.setContent(content);
      hasSetInitialContent.current = true;
    }
  }, [content, postImages, editor]);

  // render: tiptap Text Editor 컴포넌트 렌더링 //
  return (
    <>
    <MenuBar editor={editor} />
    <div className='image-upload' onClick={onImageUploadClickHandler}>이미지 첨부</div>
    <input 
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      multiple
      ref={fileRefs}
      onChange={onHandleImageFileChange}
    />
    <EditorContent editor={editor}></EditorContent>
    </>
  )
}
