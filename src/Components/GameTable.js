// import React, { useEffect, useState } from "react";
// import { Table, Tag, Radio, Space } from "antd";
// import axios from "axios";
// import { Spin } from "antd";

// const GameTable = ({ obj }) => {
//   const [show, setShow] = useState(false);
//   const [GameData, setGameData] = useState([]);
//   console.log("sport", { obj });
//   const apiUrl = `https://api.the-odds-api.com/v3/odds/?sport=Cricket&region=uk&dateFormat=iso&mkt=h2h&apiKey=c0871a96e7d64b5e6e9ef700d89cea25`;
//   console.log(apiUrl);
//   const delay = 5;

//   //   const columns = [
//   //     {
//   //       title: "Name",
//   //       dataIndex: "name",
//   //       key: "name",
//   //       render: (text) => <a>{text}</a>,
//   //     },
//   //     {
//   //       title: "Age",
//   //       dataIndex: "age",
//   //       key: "age",
//   //     },
//   //     {
//   //       title: "Address",
//   //       dataIndex: "address",
//   //       key: "address",
//   //     },
//   //     {
//   //       title: "Tags",
//   //       key: "tags",
//   //       dataIndex: "tags",
//   //       render: (tags) => (
//   //         <span>
//   //           {tags.map((tag) => {
//   //             let color = tag.length > 5 ? "geekblue" : "green";
//   //             if (tag === "loser") {
//   //               color = "volcano";
//   //             }
//   //             return (
//   //               <Tag color={color} key={tag}>
//   //                 {tag.toUpperCase()}
//   //               </Tag>
//   //             );
//   //           })}
//   //         </span>
//   //       ),
//   //     },
//   //     {
//   //       title: "Action",
//   //       key: "action",
//   //       render: (text, record) => (
//   //         <Space size="middle">
//   //           <a>Invite {record.name}</a>
//   //           <a>Delete</a>
//   //         </Space>
//   //       ),
//   //     },
//   //   ];

//   useEffect(() => {
//     let timer1 = setTimeout(() => setShow(true), delay * 1000);
//     async function fetchData() {
//       const request = await axios.get(apiUrl);
//       setGameData(request.data.data);
//       console.log(request);
//     }
//     fetchData();
//     return (error) => {
//       console.log("error on fatching sportsList", error);
//       clearTimeout(timer1);
//     };
//   }, [apiUrl]);

//   return show ? (
//     <>
//       <Table dataSource={GameData}>
//         {GameData.map((game) => {})}
//         <Column title="Game Information " dataIndex="age" key="" />
//         <Column title="Live/Schedule" dataIndex="address" key="address" />
//         <ColumnGroup title="1">
//           <Column title="First Name" dataIndex="firstName" key="firstName" />
//           <Column title="Last Name" dataIndex="lastName" key="lastName" />
//         </ColumnGroup>{" "}
//         <ColumnGroup title="X">
//           <Column title="First Name" dataIndex="firstName" key="firstName" />
//           <Column title="Last Name" dataIndex="lastName" key="lastName" />
//         </ColumnGroup>{" "}
//         <ColumnGroup title="2">
//           <Column title="First Name" dataIndex="firstName" key="firstName" />
//           <Column title="Last Name" dataIndex="lastName" key="lastName" />
//         </ColumnGroup>
//         <Column
//           title="Tags"
//           dataIndex="tags"
//           key="tags"
//           render={(tags) => (
//             <>
//               {tags.map((tag) => (
//                 <Tag color="green" key={tag}>
//                   {tag}
//                 </Tag>
//               ))}
//             </>
//           )}
//         />
//       </Table>
//     </>
//   ) : (
//     <div className="loadingGameSpinner">
//       {/* show is false, wait {delay}seconds */}
//       <Space size="middle">
//         <Spin size="large" />
//       </Space>
//     </div>
//   );
// };
// export default GameTable;
