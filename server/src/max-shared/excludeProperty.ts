







// export function exclude<User, Key extends keyof User>(
//     user: User,
//     keys: Key[]
// ): Omit<User, Key> {
//     for (let key of keys) {
//         console.log("key", key)
//         delete user[key];
//     }
//     return user;
// };