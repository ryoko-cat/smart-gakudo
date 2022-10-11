import type { NextPage } from 'next'
import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { getAuth, getIdToken } from "firebase/auth";
import { Axios } from '../../lib/api';

const Login: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const firebaseAuth = getAuth()
      const user:any = firebaseAuth.currentUser
      const idToken = await getIdToken(user, true)

        Axios.post(`api/proxy/staffIsLogin`,idToken, { 
        headers:{
          Authorization: `Bearer ${idToken}` //ヘッダにトークン付与
          },
      })
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((error) => {
        console.log(error);
      });

      router.push('/teachers/teacher-mypage')

    } catch (err) {
       alert("メールアドレスまたはパスワードが間違っています")
      router.push('/404')
    }
  }

  return (
    <div>
{/*       hitomi@hitomi.com */}
      <form onSubmit={logIn}>
        <div>
        <p className="youkoso101">ようこそ！スマートGAKUDOへ</p>
        <div className='teacherloginback'>
        <h3>ログイン</h3>
        <div>
        <br></br>
          <label htmlFor="email">
            メールアドレス:{' '}
          </label>
          <br></br>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">
            パスワード:{' '}
          </label>
          <br></br>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit" className='orangebutton'>
          ログイン
        </button>
        <br></br>
        <br></br>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Login