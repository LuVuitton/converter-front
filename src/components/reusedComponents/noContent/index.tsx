import s from "./index.module.scss";

const NoContent = ({ text, children }: Props) => {
  return (
    <div className={s.noContent}>
      <div className={s.noContentIcon}>:-|</div>
      <div className={s.noContentText}> {text}</div>
      {children}
    </div>
  );
};

export default NoContent;

type Props = {
  text: string;
  children?: React.ReactNode;
};



