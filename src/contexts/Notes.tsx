/*import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { TNote } from "../components/Note";
import { notesList } from "../data/notes";

interface NotesContextValues {
  notes: TNote[];
  addNote: (dto: AddNoteDto) => void;
  updateNote: (dto: UpdateNoteDto) => void;
}

// создаем контекст для заметок
const NotesContext = createContext<NotesContextValues>({
  notes: notesList,
  addNote: () => { },
  updateNote: () => { },
});

// dto - Данные для отправки на "сервер"
type AddNoteDto = Pick<TNote, "title" | "text">;
type UpdateNoteDto = Pick<TNote, "id"> & Partial<AddNoteDto>;

export const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useState<TNote[]>(notesList);

  const addNote = (dto: AddNoteDto) => {
    setNotes((prev) => {
      return [...prev, { id: prev.length + 1, ...dto }];
    });
  };

  const updateNote = (dto: UpdateNoteDto) => {
    setNotes((prev) => {
      return prev.map((note) =>
        note.id === dto.id ? { ...note, ...dto } : note,
      );
    });
  };

  // возвращаем провайдер для предоставления заметок дочерним компонентам
  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// отдаем на эскпорт готовый хук для использования заметок
export const useNotes = () => useContext(NotesContext);*/