import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Circle } from "@prisma/client";
import {
  TFnToEndWashingMch,
  TFnToEndWashingMl,
  TNullNumber,
  TNullString,
} from "@/interfaces";
import { formatDateToTimeLocal } from "@/lib/utils";

const CleaningF = ({
  researchs,
  name,
  toEndWashingMch,
  toEndWashingMl,
  setResearch,
}: {
  researchs: Circle[];
  setResearch: (arr: Circle[]) => void;
  name: string;
  toEndWashingMch: TFnToEndWashingMch;
  toEndWashingMl: TFnToEndWashingMl;
}) => {
  const onClickButtonMch = async (
    patientId: TNullString,
    historyResearchId: TNullNumber,
    endoscopeId: TNullNumber
  ) => {
    const circle = await toEndWashingMch(patientId, historyResearchId);
    if (circle) {
      setResearch(
        researchs.map((item) =>
          item.endoscopeId === endoscopeId
            ? {
                ...item,
                ...circle,
              }
            : { ...item }
        )
      );
    }
  };
  const onClickButtonMl = async (
    patientId: TNullString,
    historyResearchId: TNullNumber,
    endoscopeId: TNullNumber
  ) => {
    const circle = await toEndWashingMl(patientId, historyResearchId);
    if (circle) {
      setResearch(
        researchs.map((item) =>
          item.endoscopeId === endoscopeId
            ? {
                ...item,
                ...circle,
              }
            : { ...item }
        )
      );
    }
  };
  const renderCleaning = () => {
    if (researchs.length > 0) {
      return researchs.map((item) => {
        if (item.isCleanigFinal) {
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
                <ul>
                  <li>
                    Время начало очистки:{" "}
                    {formatDateToTimeLocal(item.dateStartCleaningFinal)}
                  </li>
                </ul>
                <p>Чтобы завершить цикл очистки. Выберите тип мойки.</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex flex-wrap gap-4 items-center justify-start">
                  <Button
                    onClick={() =>
                      onClickButtonMl(
                        item.patientId,
                        item.historyResearchId,
                        item.endoscopeId
                      )
                    }
                  >
                    Ручная мойка
                  </Button>
                  <Button
                    onClick={() =>
                      onClickButtonMch(
                        item.patientId,
                        item.historyResearchId,
                        item.endoscopeId
                      )
                    }
                  >
                    Машинная мойка
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        }
      });
    }
    return (
      <h2 className="text-center text-xl">
        У вас нет эндоскопов на этапе окончательной очистки
      </h2>
    );
  };
  return <>{renderCleaning()}</>;
};

export default CleaningF;
