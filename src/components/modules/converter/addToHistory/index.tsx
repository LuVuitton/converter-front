import { useAddHistoryMutation } from "@/app/api/clientRequests/histories/histories.api";
import { Button } from "@/components/reusedComponents";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const AddToHistory = (data: Props) => {
  const [addHisrory, { isLoading, isSuccess }] = useAddHistoryMutation();

  const AddToHistoryHandler = () => {
    addHisrory(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("succes");
    }
  }, [isSuccess]);

  return (
    <Button
      btnText={"add to exchange history"}
      callback={AddToHistoryHandler}
      isLoading={isLoading}
    />
  );
};

export default AddToHistory;

type Props = {
  firstValue: number;
  firstСurrencyst: string;
  secondValue: number;
  secondСurrencyst: string;
};
