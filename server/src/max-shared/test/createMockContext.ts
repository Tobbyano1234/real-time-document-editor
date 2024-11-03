// import request from "supertest";
// import http from 'http';

// import { MockRequestOptions } from '../../types/test.types';

// /**
//  * see https://www.npmjs.com/package/supertest
//  */
// export const createMockContext = (server: http.Server) => {
//   const MockContext = async (context: MockRequestOptions) => {
//     try{
//       const { 
//         route,
//         method,
//         body,
//         headers,
//       } = context;
//       const mockServerRequest = request(server);
//       const mockRouteRequest = mockServerRequest[method](route);
//       let mockBodyRequest = mockRouteRequest.send(body);
//       if (headers){
//         Object.entries(headers).forEach(([key, value]) => {
//           mockBodyRequest = mockBodyRequest.set(key, value);
//         });
//       }
//       return mockBodyRequest;//.then((response) => response);
//     } catch (error: any){
//       throw new Error(error);
//     }
//   };
//   return MockContext;
// };
