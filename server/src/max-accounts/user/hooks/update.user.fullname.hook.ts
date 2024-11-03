// import { GiftURLModel, GivingModel, PayoutModel, User, WishlistModel } from "../../../unboxd-entities";


// export const UpdateUserFullNameHook = (user: User) => process.nextTick(async () => {
//   const {_id: userID, fullname} = user;
//   await WishlistModel.updateMany({userID}, {creator: fullname});
//   await GivingModel.updateMany({recipientID: userID}, {creator: fullname});
//   await PayoutModel.updateMany({userID}, {creator: fullname});
//   await GiftURLModel.updateMany({userID}, {creator: fullname});
// });
