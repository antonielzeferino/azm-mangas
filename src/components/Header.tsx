import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()
  const handleBtnClick = () => {
    router.back()
  }

  return (
    <header>
      <button onClick={handleBtnClick}>{'<'} Voltar</button>
    </header>
  )
}

export default Header