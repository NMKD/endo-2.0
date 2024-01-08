import { TNullNumber, TNullString } from "@/app/interfaces.props";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Circle } from "@prisma/client";

const ResearchU = ({
  researchs,
  name,
  toCleaning,
  setResearch,
}: {
  researchs: Circle[];
  name: string;
  toCleaning: (pcId: TNullString) => Promise<Circle | undefined>;
  setResearch: (arr: Circle[]) => void;
}) => {
  const onClickButton = async (pcId: TNullString, endId: TNullNumber) => {
    const circle = await toCleaning(pcId);
    if (circle) {
      setResearch(
        researchs.map((item) =>
          item.endoscopeId === endId
            ? {
                ...item,
                ...circle,
              }
            : { ...item }
        )
      );
    }
  };
  const renderResearch = () => {
    if (researchs.length > 0) {
      return researchs.map((item) => {
        if (item.isResearch) {
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
                  Чтобы завершить цикл исследования. Нажмите кнопку &quot;Тест
                  на гермитичность&quot;
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  onClick={() =>
                    onClickButton(item.patientId, item.endoscopeId)
                  }
                >
                  Тест на гермитичность
                </Button>
              </CardFooter>
            </Card>
          );
        }
      });
    }
    return (
      <h2 className="text-center text-xl">
        У вас нет эндоскопов на исследовании
      </h2>
    );
  };
  return <>{renderResearch()}</>;
};

export default ResearchU;
