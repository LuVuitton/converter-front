import { getRates } from "@/app/api/serverRequests/getRates";
import s from "./index.module.scss";
import MeHeader from "./meHeader";
import CurToUah from "./curToUah";

const Header = async () => {
  return (
    <header className={s.header}>
      <MeHeader />
      <CurToUah />
    </header>
  );
};

export default Header;

