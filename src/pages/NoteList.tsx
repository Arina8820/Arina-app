import { type FC, useState } from "react"
import Header from "../components/Header"
import { Button } from "../shared/Button"
import { Link } from "@tanstack/react-router"
import { useNotes } from "../store/NotesProvider"
import { Note } from "../components/Note"

export const NoteList:FC = function NoteList() {
    const { data, deleteNote } = useNotes();
    const [showModal, setShowModal] = useState(false)
    const [noteIdToDelete, setNoteIdToDelete] = useState<number | null>(null)

    const handleDeleteClick = (id: number) => {
        setNoteIdToDelete(id)
        setShowModal(true)
    }

    const handleConfirmDelete = () => {
        if (noteIdToDelete !== null) {
            deleteNote(noteIdToDelete)
            setShowModal(false)
            setNoteIdToDelete(null)
       }
    }

    const handleCancelDelete = () => {
        setShowModal(false)
        setNoteIdToDelete(null)
    }

    return <div>
        <Header>
            <h1 className="text-4xl text-center font-bold">Главная страница</h1>
        </Header>
        <div className="container flex justify-end mx-auto pt-2">
            <Link to="/notes/add">
                <Button text="Добавить заметку" variant="secondary" />
            </Link>
        </div>
        <ul className="container grid grid-cols-3 gap-4 py-10 mx-auto">
            {data.map(item=>(
                <Note 
                    key={item.id} 
                    note={item} 
                    onDelete={handleDeleteClick}
                />
            )
            )}
        </ul>

        {showModal && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-40">
                <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Вы точно хотите удалить заметку?</h2>
                    <div className="flex gap-4 justify-end">
                        <button 
                            onClick={handleCancelDelete}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-bold transition-colors"
                        >
                            Отмена
                        </button>
                        <button 
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-bold transition-colors"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
}