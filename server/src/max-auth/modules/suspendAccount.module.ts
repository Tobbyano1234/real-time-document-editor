// import { match, P } from 'ts-pattern';
// import { SuspendAccount } from '../types';
// import { UserSuspendAccountPipe } from '../pipes/user.suspendAccount.pipe';
// import { triggerSuccessFailureHooks } from '../../entrova-shared/triggerHooks';

// export const SuspendAccountModule = ({DTO, onSuccess}: SuspendAccount) =>
//   match(DTO)
//     .with(['user', P._], async ([, UserSuspendAccountDTO]) => {
//       const suspendAccountPipe = await UserSuspendAccountPipe(UserSuspendAccountDTO);
//       triggerSuccessFailureHooks(suspendAccountPipe, onSuccess);
//       return suspendAccountPipe;
//     })
//     // .with(['merchant', P._], async () => {})
//     .exhaustive();
