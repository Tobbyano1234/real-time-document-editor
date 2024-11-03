// import { match, P } from "ts-pattern";
// import { DeactivateAccount } from "../types";
// import { triggerSuccessFailureHooks } from "../../max-shared/triggerHooks";

// export const DeactivateAccountModule = ({
//   DTO,
//   onSuccess,
// }: DeactivateAccount) =>
//   match(DTO)
//     .with(['user', P._], async ([, DeactivateAccountDTO]) => {
//       const deactivateAccountPipe = await DeactivateAccountPipe(DeactivateAccountDTO);
//       triggerSuccessFailureHooks(deactivateAccountPipe, onSuccess);
//       return deactivateAccountPipe;
//     })
//     .exhaustive();
