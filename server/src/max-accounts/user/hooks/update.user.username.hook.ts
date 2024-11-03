// import { handleWishlistQR } from "../../../unboxd-wishlists/hooks/update-wishlist.hook";
// import { User, Wishlist, WishlistCashfund, WishlistCashfundModel, WishlistModel } from "../../../unboxd-entities";
// import { handleWishlistCashfundQR } from "../../../unboxd-cash-funds/hooks/update.wishlist.cashfund.hook";


// export const UpdateUserNameHook = (user: User) => process.nextTick(async () => {
//   const { _id } = user;
//   const userWishlists = await WishlistModel.find({userID: _id, isDeleted: false}).sort({createdAt: -1}) as Wishlist[];
//   await Promise.all(userWishlists.map(async userWishlist => await handleWishlistQR(userWishlist)));

//   const userWishlistCashfunds = await WishlistCashfundModel.find({userID: _id, isDeleted: false}).sort({createdAt: -1}) as WishlistCashfund[];
//   await Promise.all(userWishlistCashfunds.map(async userWishlistCashfund => await handleWishlistCashfundQR(userWishlistCashfund)));
// }); 
