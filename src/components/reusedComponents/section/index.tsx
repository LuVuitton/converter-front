import s from "./index.module.scss";
import cl from "classnames";

const Section = ({ className, children }: Props) => {
  return <section className={cl(className, s.section)}>{children}</section>;
};

export default Section;

type Props = {
  className?: string;
  children: React.ReactNode;
};
