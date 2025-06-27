import styles from "@/components/UI/Navigation/styles.module.scss"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../../Button";

const AdminNavigation = () => {
  const links: [string, string][] = [
    ["Home", "/"],
    ["Help Service", "/help"],
    ["Profile", "/profile"]
  ]

  const pathname = usePathname()

  return <nav className={styles.navigation}>
    <h1 className={styles.logo}>Soundly [Admin Panel]</h1>
    <ul className={styles.links}>
      {links.map(link => (
        <li key={link[1]}><Link href={link[1]} className={pathname === link[1] ? styles.active : ""}>{link[0]}</Link></li>
      ))}
    </ul>
    <div className={styles.danger}>
      <Button style={{ width: "130px", height: "35px" }} variant="danger">Delete all</Button>
      <Button className="ml-2" style={{ width: "130px", height: "35px" }}>Database</Button>
    </div>
  </nav>
}

export default AdminNavigation;