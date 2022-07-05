import styles from '../styles/Home.module.css'
import NavbarComponent from '../components/index/navbar-component'
import CardComponent from '../components/index/card-component'

export default function Home() {
  return (
    <div className={styles.main} style={{width: "100%", height: "100%"}}>
      <NavbarComponent />
      <CardComponent />
    </div>
  )
}
