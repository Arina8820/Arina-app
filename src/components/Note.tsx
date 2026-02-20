import type { FC, HTMLAttributes } from "react"

export interface TNote{
    id: number,
    title: string,
    text: string
    createDate?: Date | string
}

interface Props extends HTMLAttributes<HTMLLIElement>{
    note: TNote
    onDelete?: (id: number) => void
}

export const Note:FC<Props> = function Note({note, onDelete, ...props}) {
    return <li className="bg-gray-100 border-2 border-gray-200 rounded-xl p-4 relative" {...props}>
        {onDelete && (
            <button
                onClick={() => onDelete(note.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold transition-colors"
            >
                ✕
            </button>
        )}
        <h3 className="text-2xl font-bold mb-4">{note.title}</h3>
        <p className="text-sm line-clamp-3">{note.text}</p>
    </li>
}


