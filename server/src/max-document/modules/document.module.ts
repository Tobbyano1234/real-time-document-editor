import { match, P } from "ts-pattern";

import { triggerSuccessFailureHooks } from "../../max-shared/triggerHooks";
import { Documents } from "../types";
import {
  CreateDocumentPipe,
  DeleteDocumentPipe,
  GetAllDocumentsPipe,
  GetSingleDocumentPipe,
  UpdateDocumentPipe,
} from "../pipes";

export const DocumentModule = ({ DTO, onSuccess }: Documents) =>
  match(DTO)
    .with(["basic", P._], async ([, CreateDocumentDTO]) => {
      const documentPipe = await CreateDocumentPipe(CreateDocumentDTO);
      triggerSuccessFailureHooks(documentPipe, onSuccess);
      return documentPipe;
    })
    .with(["update", P._], async ([, UpdateDocumentDTO]) => {
      const documentPipe = await UpdateDocumentPipe(UpdateDocumentDTO);
      triggerSuccessFailureHooks(documentPipe, onSuccess);
      return documentPipe;
    })
    .with(["delete", P._], async ([, DeleteDocumentDTO]) => {
      const documentPipe = await DeleteDocumentPipe(DeleteDocumentDTO);
      triggerSuccessFailureHooks(documentPipe, onSuccess);
      return documentPipe;
    })
    .with(["single", P._], async ([, GetSingleDocumentDTO]) => {
      const documentPipe = await GetSingleDocumentPipe(GetSingleDocumentDTO);
      triggerSuccessFailureHooks(documentPipe, onSuccess);
      return documentPipe;
    })
    .with(["all", P._], async ([, GetAllDocumentsDTO]) => {
      const documentPipe = await GetAllDocumentsPipe(GetAllDocumentsDTO);
      triggerSuccessFailureHooks(documentPipe, onSuccess);
      return documentPipe;
    })
    .exhaustive();
