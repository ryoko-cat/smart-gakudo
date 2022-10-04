import Layout from './admin-layout';
import React,{ useState } from "react";
import { Axios } from '../../lib/api';

export default function addCenter() {
  const [newCenter, setNewCenter] = useState("");

  function handleSubmit(e:any) {
      e.preventDefault();
      const data = {
          "Name":newCenter,
      }
      Axios.post(`api/proxy/centerPost`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return(
    <Layout>
      <h1>新規施設登録画面</h1>
          <div>
          <label>施設の入力：</label>
          <input type="text" value={newCenter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCenter(e.currentTarget.value)}/>
          <br></br>
          <button onClick = {handleSubmit}>施設名を登録する</button>
          </div>
  </Layout>
         
  )
}
// import React,{ useState } from "react";
// import { Axios } from '../../lib/api';
// import Link from 'next/link';


// export default function ItemPost() {
//     const [item, setitem] = useState("");

//     function handleSubmit(e:any) {
//         e.preventDefault();
//         const data = {
//             "Name":item,
//         }
//         Axios.post(`api/proxy/centerPost`, data)
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }


//     return(
//         <div>
//             <h1>学童の追加</h1>
//             <br></br>
//             <div>
//             <label>学童名</label>
//             <input type="text" value={item} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setitem(e.currentTarget.value)}/>
//             <br></br>
//             <button onClick = {handleSubmit}>追加！</button>
//             <Link href={"/"}>
//             <h2>HOME</h2>
//             </Link>
//             </div>
//         </div>
//     )
// }