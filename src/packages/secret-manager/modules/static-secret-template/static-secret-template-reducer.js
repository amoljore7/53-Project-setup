import { combineReducers } from 'redux';
import { staticSecretTemplateList, staticSecretTemplateDelete } from './list/reducer';
import { staticSecretTemplateView } from './view/reducer';
import { addStaticSecretTemplate, policiesList } from './add/reducer';
import { editStaticSecretTemplate } from './edit/reducer';

const staticSecretTemplateReducer = combineReducers({
  list: staticSecretTemplateList,
  delete: staticSecretTemplateDelete,
  view: staticSecretTemplateView,
  add: addStaticSecretTemplate,
  edit: editStaticSecretTemplate,
  policiesList,
});

export default staticSecretTemplateReducer;
