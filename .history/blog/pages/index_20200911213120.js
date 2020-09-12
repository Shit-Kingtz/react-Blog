import Head from 'next/head'
import {Button} from 'antd'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div><Button>按钮</Button></div>
    </div>
  )
}
