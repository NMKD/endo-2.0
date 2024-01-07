import { TNullString } from "@/app/(site)/interfaces.props";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Circle } from "@prisma/client";

const CleaningMch = ({
  researchs,
  name,
  toStore,
  setResearch,
}: {
  researchs: Circle[];
  name: string;
  toStore: (id: TNullString) => Promise<void>;
  setResearch: (arr: Circle[]) => void;
}) => {
  const onClickButton = (id: TNullString) => {
    setResearch(researchs.filter((item) => item.patientId !== id));
    toStore(id);
  };
  const renderCleaningMachine = () => {
    if (researchs.length > 0) {
      return researchs.map((item) => {
        if (item.isWashingMachine) {
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
                  Чтобы завершить цикл машинной мойки. Нажмите кнопку
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
    return <h2>У вас нет эндоскопов на мойке</h2>;
  };
  return <>{renderCleaningMachine()}</>;
};

export default CleaningMch;
