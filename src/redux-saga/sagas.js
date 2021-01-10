import { all } from 'redux-saga/effects'
import DashboardSaga from '../component/redux/dashboard/saga'

export default function * useSaga () {
   yield all([
      DashboardSaga()
   ])
 }