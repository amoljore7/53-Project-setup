import { all } from '@redux-saga/core/effects';
import PolicyListSaga from './policy-list/saga';
import AddPolicySaga from './add/saga';
import ViewPolicySaga from './view/saga';
import EditPolicySaga from './edit/saga';
import ClonePolicySaga from './clone/saga';

export default all([
  PolicyListSaga,
  AddPolicySaga,
  ViewPolicySaga,
  EditPolicySaga,
  ClonePolicySaga,
]);
