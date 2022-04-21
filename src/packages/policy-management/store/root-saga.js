import { all } from 'redux-saga/effects';
import batchEvalSaga from '../../../components/batch-eval/saga';
import rolesListSaga from '../modules/roles/list/saga';
import roleViewSaga from '../modules/roles/view/saga';
import permissionsListSaga from '../modules/permissions/list/saga';
import addPermissionsSaga from '../modules/permissions/add/saga';
import viewPermissionsSaga from '../modules/permissions/view/saga';
import editPermissionsSaga from '../modules/permissions/edit/saga';
import addRoleSaga from '../modules/roles/add/saga';
import policySaga from '../modules/policy/policy-saga';
import editRoleSaga from '../modules/roles/edit/saga';
import membersSaga from '../../../components/policy/Members/saga';
import consumerSaga from '../../../components/policy/consumer/saga';

export default function* () {
  yield all([
    batchEvalSaga,
    rolesListSaga,
    permissionsListSaga,
    addPermissionsSaga,
    viewPermissionsSaga,
    editPermissionsSaga,
    roleViewSaga,
    addRoleSaga,
    policySaga,
    editRoleSaga,
    membersSaga,
    consumerSaga,
  ]);
}
