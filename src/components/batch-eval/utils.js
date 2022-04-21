import { ALLOW } from '../../utils/common-constants';

export const getPolicyAdminBatchEvalActionFormat = (action, consumer, resource = '*') =>
  `PolicyEvalRequest [action=${action}, consumer=${consumer}, resource=${resource}]`;

/*
 * This function is to parse and simplify the batch eval response.
 * @param batchEvalData   - Object - Eval response object.
 *                          E.g { PolicyEvalRequest [action=${action}, consumer=${consumer}, resource=*]: 'Allow' }
 * @param requestPayload  - Array  - Eval request payload with action details
 *                          E.g [{action: 'authz.policy.create', resource: '*', consumer: 'authz',}]
 * @return                - Object - Simplified Evan Response
 *                        - E.g { authz.policy.create: "Allow" }
 */
export const parseBatchEvalResponse = (batchEvalData = {}, requestPayload = [], resource = '*') => {
  return requestPayload.reduce((acc, { action, consumer }) => {
    return {
      ...acc,
      [action]:
        batchEvalData[getPolicyAdminBatchEvalActionFormat(action, consumer, resource)] || ALLOW,
    };
  }, {});
};
