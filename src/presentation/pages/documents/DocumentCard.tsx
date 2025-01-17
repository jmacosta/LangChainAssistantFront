import { Card, CardFooter, Image, Button, Link } from '@nextui-org/react';
import image from '../../../assets/images/paper_2.jpg';
import DeleteDocumentModal from '../../components/delete-modal/DeleteDocumentModal';

interface Payload {
  document: string;
  id: string;
  onDelete: (document: string, onClose: () => void) => void;
}

export default function DocumentCard({ document, onDelete, id }: Payload) {
  const cutName = (document: string) => {
    if (document.length > 20) return document.slice(0, 20) + '...';
    return document;
  };

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="max-w-[200px] border border-secondary"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src={image}
        width={200}
      />
      <CardFooter className="flex flex-col items-center content-center gap-5">
        <p className=" text-foreground ">{cutName(document)}</p>
        <div className="flex gap-1">
          <Button
            className="bg-primary bg-opacity-25  "
            variant="bordered"
            color="success"
            radius="lg"
            size="sm"
          >
            <Link color="success" href={`/assistant/${document}`}>
              Chat
            </Link>
          </Button>
          <DeleteDocumentModal
            onDelete={onDelete}
            document={document}
            id={id}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
