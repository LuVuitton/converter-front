import { Button } from "@/components/reusedComponents";

const AddToHistory = ({
  firstValue,
  secondValue,
  firstCurrency,
  secondCurrency,
}: Props) => {
  const AddToHistoryHandler = () => {
    console.log("add");
  };

  return (
    <Button btnText="add to exchange history" callback={AddToHistoryHandler} />
  );
};

export default AddToHistory;

type Props = {
  firstValue: number;
  firstCurrency: string;
  secondValue: number;
  secondCurrency: string;
};
