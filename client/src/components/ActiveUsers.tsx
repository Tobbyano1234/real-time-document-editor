import * as React from 'react';

interface ActiveUser {
    userId: string;
    userName: string;
    color: string;
}

interface ActiveUsersProps {
    users: ActiveUser[];
}

export const ActiveUsers: React.FC<ActiveUsersProps> = ({ users }) => {
    return (
        <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
            {users.map((user) => (
                <div
                    key={user.userId}
                    className="flex items-center px-3 py-1 rounded-full text-white text-sm"
                    style={{ backgroundColor: user.color }}
                >
                    <span className="w-2 h-2 rounded-full bg-white mr-2" />
                    {user.userName}
                </div>
            ))}
        </div>
    );
};





// import React from 'react';

// interface ActiveUser {
//   userId: string;
//   userName: string;
//   color: string;
// }

// interface ActiveUsersProps {
//   users: ActiveUser[];
// }

// export const ActiveUsers: React.FC<ActiveUsersProps> = ({ users }) => {
//   return (
//     <div className="fixed top-4 right-4 bg-white p-2 rounded shadow">
//       <h3 className="text-sm font-semibold mb-2">Active Users</h3>
//       <div className="flex flex-col gap-1">
//         {users.map(user => (
//           <div 
//             key={user.userId}
//             className="flex items-center gap-2"
//           >
//             <div 
//               className="w-2 h-2 rounded-full"
//               style={{ backgroundColor: user.color }}
//             />
//             <span className="text-sm">{user.userName}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }; 