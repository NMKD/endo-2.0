import { TNullString, TNullNumber } from "@/app/(site)/interfaces.props";
import { formatDateToTimeLocal } from "@/lib/utils";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Circle } from "@prisma/client";

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
  toEndWashingMch: (
    id: TNullString,
    historyResearchId: TNullNumber
  ) => Promise<void>;
  toEndWashingMl: (
    id: TNullString,
    historyResearchId: TNullNumber
  ) => Promise<void>;
}) => {
  const onClickButtonMch = (
    id: TNullString,
    historyResearchId: TNullNumber
  ) => {
    setResearch(researchs.filter((item) => item.patientId !== id));
    toEndWashingMch(id, historyResearchId);
  };
  const onClickButtonMl = (id: TNullString, historyResearchId: TNullNumber) => {
    setResearch(researchs.filter((item) => item.patientId !== id));
    toEndWashingMl(id, historyResearchId);
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
                <p>
                  Чтобы завершить цикл очистки. Нажмите кнопку &quot;Отпрвить на
                  мойку&quot;
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex flex-wrap gap-4 items-center justify-start">
                  <Button
                    onClick={() =>
                      onClickButtonMl(item.patientId, item.historyResearchId)
                    }
                  >
                    Ручная мойка
                  </Button>
                  <Button
                    onClick={() =>
                      onClickButtonMch(item.patientId, item.historyResearchId)
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
      <h2>
        Для того чтобы начать финальную очистку. Перейдите на вкладку -
        исследование и продолжите цикл
      </h2>
    );
  };
  return <>{renderCleaning()}</>;
};

export default CleaningF;
