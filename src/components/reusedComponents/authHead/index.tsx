import { Title } from "@/components/reusedComponents";
import s from "./index.module.scss";

const AuthHead = ({ title, description }: Props) => {
  return (
    <div className={s.head}>
      <Title type="medium" className={s.headTitle}>{title}</Title>
      <p className={s.headDescription}>{description}</p>
    </div>
  );
};

export default AuthHead;

type Props = {
  title: string;
  description: string;
};
