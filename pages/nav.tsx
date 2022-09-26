import type {NextPage} from "next"
import Image from 'next/image'
import homeImg from '../public/fragranceia.png'
import Link from 'next/link'

const Nav: NextPage = () => {
  return (
      <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'70%'}}>
        <Link href="/nav">
          <a>
            <div style={{width: "100px", height:"100px"}}>
              <Image src={homeImg} width={100} height={100} layout={"responsive"}/>
            </div>
          </a>
        </Link>
        <Link href="/" style={{fontSize: '50px'}}>Nav1</Link>
        <Link href="/" style={{fontSize: '50px'}}>Nav2</Link>
        <Link href="/" style={{fontSize: '50px'}}>Nav3</Link>
      </div>
  )
}


export default Nav