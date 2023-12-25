import { getRates } from "@/app/api/serverRequests/getRates";
import s from "./index.module.scss";

const CurToUah = async () => {
  const rates = await getRates();
  const usdToUah = rates.rates.UAH;
  const eurToUsd = rates.rates.EUR;
  const eurToUah = (1 / eurToUsd) * usdToUah;

  return (
    <div className={s.wrapper}>
      <div className={s.cur}>
        <div className={s.curItem}>
          <span className={s.curItemTitle}>USD/UAH: </span>
          <span className={s.curItemValue}>{usdToUah.toFixed(2)}</span>
        </div>
        <div className={s.curItem}>
          <span className={s.curItemTitle}>EUR/UAH: </span>
          <span className={s.curItemValue}>{eurToUah.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurToUah;

type Props = {
  usdToUah: number;
  eurToUah: number;
};
