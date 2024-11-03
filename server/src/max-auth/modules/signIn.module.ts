import { match, P } from "ts-pattern";
import { SignIn } from "../types";
import { triggerSuccessFailureHooks } from "../../max-shared/triggerHooks";

import {
  LocalSignInIndividualPipe,
} from "../pipes";

export const signInModule = ({ DTO, onSuccess, onFailure }: SignIn) =>
  match(DTO)
    .with(["local", "user", P._], async ([, , LocalSignInDTO]) => {
      const signInPipe = await LocalSignInIndividualPipe(LocalSignInDTO);
      triggerSuccessFailureHooks(signInPipe, onSuccess, onFailure);
      return signInPipe;
    })
    .with(["google", P._], () => {})
    .exhaustive();
