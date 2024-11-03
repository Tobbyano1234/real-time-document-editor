// import { match, P } from "ts-pattern";
// import { TwoFactorAuth } from "../types";
// import { triggerSuccessFailureHooks } from "../../max-shared/triggerHooks";
// import {
//   DisableTwoFactorAuthenticationPipe,
//   SetupTwoFactorAuthenticationPipe,
//   VerifyTwoFactorOtpPipe,
// } from "../pipes";

// export const TwoFactorAuthenticationModule = ({
//   DTO,
//   onSuccess,
// }: TwoFactorAuth) =>
//   match(DTO)
//     .with(["setup", P._], async ([, TwoFactorAuthDTO]) => {
//       const twoFactorAuthPipe = await SetupTwoFactorAuthenticationPipe(
//         TwoFactorAuthDTO
//       );
//       triggerSuccessFailureHooks(twoFactorAuthPipe, onSuccess);
//       return twoFactorAuthPipe;
//     })
//     .with(["disable", P._], async ([, TwoFactorAuthDTO]) => {
//       const twoFactorAuthPipe = await DisableTwoFactorAuthenticationPipe(
//         TwoFactorAuthDTO
//       );
//       triggerSuccessFailureHooks(twoFactorAuthPipe, onSuccess);
//       return twoFactorAuthPipe;
//     })
//     .with(["verify", P._], async ([, TwoFactorAuthDTO]) => {
//       const twoFactorAuthPipe = await VerifyTwoFactorOtpPipe(TwoFactorAuthDTO);
//       triggerSuccessFailureHooks(twoFactorAuthPipe, onSuccess);
//       return twoFactorAuthPipe;
//     })
//     .exhaustive();
