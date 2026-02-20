import { createContext, useContext, useState, useCallback, type FC, type PropsWithChildren } from "react";
import type { Note } from "../model/Note";

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface NotesContextValues{
        data: Note[]
        addNote: (dto: Note) => void
        deleteNote: (id: number) => void
        toasts: Toast[]
        addToast: (message: string, type: ToastType, duration?: number) => void
        removeToast: (id: string) => void
        // updateNote: (dto:UpdateNoteDto) => void
    }

const NoteContext = createContext<NotesContextValues>({
        data: [],
        addNote: () => {},
        deleteNote: () => {},
        toasts: [],
        addToast: () => {},
        removeToast: () => {},
        // updateNote: () => {}
})

export const useNotes = () => {
    const context=useContext(NoteContext)
    return context
}

export const useToast = () => {
    const { addToast, removeToast, toasts } = useNotes()
    return { addToast, removeToast, toasts }
}

// export type AddNoteDto = Pick <Note, "tittle" | "description">
// type UpdateNoteDto = Partial<AddNoteDto> & Pick<Note, "id">


export const NotesProvider: FC<PropsWithChildren> = function NotesProvider(props){

    const addNote = (dto: Note) =>{
        setNotes((prevState) => [
            ...prevState, dto
        ])
    }

    const deleteNote = useCallback((id: number) => {
        setNotes((prevState) => prevState.filter((note) => note.id !== id))
    }, [])

    const addToast = useCallback((message: string, type: ToastType, duration = 3000) => {
        const id = Date.now().toString()
        setToasts((prev) => [...prev, { id, message, type, duration }])
        setTimeout(() => removeToast(id), duration)
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    // const updateNote = (dto: UpdateNoteDto) =>{
    //     const {id, ...nestDto} = dto
    //     setNotes((prevState) =>
    //         prevState.map( note => {
    //             if(note.id === dto.id){
    //                 return {
    //                     ...note,
    //                     ...nestDto
    //                 }
    //             }
    //             return note
    //         })
    //     )
    // }
    
    const [notes, setNotes] = useState<Note[]>([])
    const [toasts, setToasts] = useState<Toast[]>([])
    
    return<NoteContext.Provider value={{
        data: notes,
        addNote,
        deleteNote,
        toasts,
        addToast,
        removeToast,
        // updateNote
    }}>
        
        {props.children}
    
    </NoteContext.Provider>
}