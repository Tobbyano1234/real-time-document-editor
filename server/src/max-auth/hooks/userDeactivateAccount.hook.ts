import { UserMetaDataGeneral } from "../../typings/User.types";
import { GeneralModel, ModelNames, User, UserModel } from "../../max-entities";

export const UserDeactivateAccountHook = (user: User) =>
  process.nextTick(async () => {
    const { _id } = user;
    await UserModel.findByIdAndUpdate(_id, {
      $set: { isDeactivatedAccount: true },
    });
    const UserMetaDataGeneral = (await GeneralModel.findOneAndUpdate({
      collectionID: _id,
      collectionName: ModelNames.USER,
      "associatedData.type": "metaData",
    })) as UserMetaDataGeneral;
    const { associatedData } = UserMetaDataGeneral;
    if (associatedData.metaData?.deactivatedAt?.length) {
      await GeneralModel.findByIdAndUpdate(UserMetaDataGeneral._id, {
        $push: { "associatedData.metaData.deactivatedAt": new Date() },
      });
    } else {
      await GeneralModel.findByIdAndUpdate(UserMetaDataGeneral._id, {
        $set: { "associatedData.metaData.deactivatedAt": [new Date()] },
      });
    }

    // const {email} = user;
    // send we are sorry you're leaving us mail
    // alert metric system
    // send report to admin backoffice
    // initiate don't deactivate campaign
    // register account in deactivation registry
    // pullAdditionalInformation
  });
