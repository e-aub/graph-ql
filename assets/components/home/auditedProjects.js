// query GetAudits($user_id: Int!) {
//     audit(
//       where: {
//         _and: [
//           {closureType: {_neq: unused}},
//           {closureType: {_neq: expired}},
//           {closureType: {_neq: reassigned}},
//           {auditorId: {_eq: $user_id}}
//         ]
//       },
//       order_by: {createdAt: asc}
//     ) {
//       closureType
//       group {
//         path
//       }
//     }
//   }