import { useAddHistoryMutation } from "@/app/api/clientRequests/histories/histories.api";
import { Button } from "@/components/reusedComponents";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const AddToHistory = (data: Props) => {
  const [addHisrory, { isLoading, isSuccess, isError }] =
    useAddHistoryMutation();
  const t = useTranslations("history");

  const AddToHistoryHandler = () => {
    addHisrory(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t("succesfulyAdded"));
    }
  }, [isSuccess]);

  if (isError) {
    toast.error(t("historySignInFirst"));
  }

  return (
    <Button
      btnText={t("addPair")}
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
