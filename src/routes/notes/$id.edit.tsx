import { createFileRoute } from '@tanstack/react-router'
import EditNote from '../../pages/EditNote'

export const Route = createFileRoute('/notes/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditNote />
}
