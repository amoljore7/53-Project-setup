import staticSecretTemplateListAndDeleteWatcher from './list/saga';
import staticSecretTemplateViewWatcher from './view/saga';
import addStaticSecretWatcher from './add/saga';
import editStaticSecretWorker from './edit/saga';

export default [
  staticSecretTemplateListAndDeleteWatcher,
  staticSecretTemplateViewWatcher,
  addStaticSecretWatcher,
  editStaticSecretWorker,
];
