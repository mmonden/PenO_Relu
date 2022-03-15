import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from "next";
import { useSession, getSession, signIn, signOut } from "next-auth/react"

//if no session, redirect to signIn()
export default function Linkedpage(){
  const { data: session } = useSession()
  if (session) {
    return(
      "lolol"
    )
  }
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session  = await getSession(ctx)
  if (!session) {
    return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false
			}
		}
  }
}

/*
//backend getsession
import { getSession } from "next-auth/react"

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    })
  }
}
*/
