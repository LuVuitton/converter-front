import { Link } from "@/navigation";
import s from "./index.module.scss";

const ToAnotherAuth = ({ linkText, description, linkTo }: Props) => {
  return (
    <nav className={s.another}>
      <Link href={linkTo} className={s.anotherLink}>
        {linkText}
      </Link>
      <p className={s.anotherDescription}>{description}</p>
    </nav>
  );
};

export default ToAnotherAuth;

type Props = {
  linkText: string;
  description: string;
  linkTo: string;
};
