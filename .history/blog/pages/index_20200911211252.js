import Head from 'next/head'
import {Button} from 'antd'

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
