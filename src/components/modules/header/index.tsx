import { getRates } from "@/app/api/serverRequests/getRates";
import { Link } from "@/navigation";
import s from "./index.module.scss";

const Header = async () => {
  const rates = await getRates();
  const usdToUah = rates.rates.UAH;
  const eurToUsd = rates.rates.EUR;
  const eurToUah = (1 / eurToUsd) * usdToUah;

  return (
    <header>
      <span>USD:{usdToUah.toFixed(5)}</span>
      {"-----"}
      <span>EUR:{eurToUah.toFixed(5)}</span>
      курс вырос относительно прошлой недели
      <Link href={"/my-histories"} className={s.myhistory}>
        {"My histories"}
      </Link>
      <Link href={"/"} className={s.myhistory}>
        {"main"}
      </Link>
    </header>
  );
};

export default Header;
