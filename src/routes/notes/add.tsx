import { createFileRoute } from '@tanstack/react-router'
import AddNote from '../../pages/AddNote'

export const Route = createFileRoute('/notes/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddNote />
}
