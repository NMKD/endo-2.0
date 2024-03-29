import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { formatDateToTimeLocal } from "@/lib/utils";
import { TFnToStore, TNullString } from "@/interfaces";
import { Circle } from "@prisma/client";

const CleaningMl = ({
  researchs,
  name,
  toStore,
  setResearch,
}: {
  researchs: Circle[];
  name: string;
  toStore: TFnToStore;
  setResearch: (arr: Circle[]) => void;
}) => {
  const onClickButton = (id: TNullString) => {
    setResearch(researchs.filter((item) => item.patientId !== id));
    toStore(id);
  };
  const renderCleaningManual = () => {
    if (researchs.length > 0) {
      return researchs.map((item) => {
        if (item.isWashingManual) {
          return (
            <Card className="max-w-[400px]" key={item.id}>
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">Эндоскоп {item.endoscopeId}</p>
                  <p className="text-small text-default-500">
                    Медсестра: {name}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Время начало мойки:{" "}
                  {formatDateToTimeLocal(item.dateStartWashingManual)}
                </p>
                <p>
                  Чтобы завершить цикл ручной мойки. Нажмите кнопку
                  &quot;Завершить&quot;
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button onClick={() => onClickButton(item.patientId)}>
                  Завершить
                </Button>
              </CardFooter>
            </Card>
          );
        }
      });
    }
    return (
      <h2 className="text-center text-xl">У вас нет эндоскопов на мойке</h2>
    );
  };
  return <>{renderCleaningManual()}</>;
};

export default CleaningMl;
