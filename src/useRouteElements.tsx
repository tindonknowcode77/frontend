import MainLayout from '@/layouts/MainLayout'
import OrchidList from '@/pages/OrchidList'
import { useRoutes } from 'react-router-dom'


export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <OrchidList />
        </MainLayout>
      )
    },
    
  ])
  return routeElements
}
