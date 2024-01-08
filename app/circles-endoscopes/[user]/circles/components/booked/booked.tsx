import { TNullNumber } from "@/app/interfaces.props";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Circle } from "@prisma/client";

const Booked = ({
  researchs,
  name,
  toResearch,
  setResearch,
}: {
  researchs: Circle[];
  name: string;
  toResearch: (endId: TNullNumber, userId: TNullNumber) => Promise<void>;
  setResearch: (arr: Circle[]) => void;
}) => {
  const onClickButton = (id: TNullNumber, userId: TNullNumber) => {
    if (!id || !userId) {
      return;
    }
    setResearch(researchs.filter((item) => item.id !== id && item.isBooking));
    toResearch(id, userId);
  };
  const renderBooking = () => {
    if (researchs.length > 0) {
      return researchs.map((item) => {
        if (item.isBooking) {
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
                  Данный эндоскоп готов к работе. Нажмите кнопку &quot;Отправить
                  на исследование&quot;
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  onClick={() => onClickButton(item.endoscopeId, item.userId)}
                >
                  Отправить на исследование
                </Button>
              </CardFooter>
            </Card>
          );
        }
      });
    }
    return <h2>У вас нет забронированных эндоскопов</h2>;
  };

  return <>{renderBooking()}</>;
};

export default Booked;
