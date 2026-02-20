import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit"!</div>
}
