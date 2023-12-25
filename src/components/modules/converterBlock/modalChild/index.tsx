import { Button, Section } from "@/components/reusedComponents";
import s from "./index.module.scss";
import { useTranslations } from "next-intl";

const ModalChild = ({ handleModalResponse }: Props) => {
  const t = useTranslations("converter");
  return (
    <Section>
      <p className={s.desc}>{t("modal")}</p>
      <div className={s.btns}>
        <Button btnText={t("yes")} callback={() => handleModalResponse(true)} />
        <Button
          btnText={"no"}
          callback={() => handleModalResponse(false)}
          color="red"
        />
      </div>
    </Section>
  );
};

export default ModalChild;

type Props = {
  handleModalResponse: (r: boolean) => void;
};
