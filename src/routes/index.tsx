import { createFileRoute } from '@tanstack/react-router'
import { NoteList } from '../pages/NoteList'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return <NoteList />
}