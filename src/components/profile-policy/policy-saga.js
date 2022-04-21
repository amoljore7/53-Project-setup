import { all } from '@redux-saga/core/effects';
import AddPolicySaga from './add/saga';
import ViewPolicySaga from './view/saga';
import EditPolicySaga from './edit/saga';
import ClonePolicySaga from './clone/saga';

export default all([
  AddPolicySaga,
  ViewPolicySaga,
  EditPolicySaga,
  ClonePolicySaga,
]);
