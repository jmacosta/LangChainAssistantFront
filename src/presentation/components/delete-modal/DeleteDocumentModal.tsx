import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { useDocumentsContext } from '../../../context/DocumentsContext';

interface Payload {
  onDelete: (document: string, onClose: () => void) => void;
  document: string;
  id: string;
}

export default function DeleteDocumentModal({
  onDelete,
  document,
  id,
}: Payload) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const darkMode = useDarkMode();
  const { isLoading } = useDocumentsContext();

  return (
    <>
      <Button
        onPress={onOpen}
        className="text-tiny   font-bold"
        variant="bordered"
        color="danger"
        radius="lg"
        size="sm"
      >
        Borrar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`${
          darkMode.value ? 'dark' : ''
        } text-foreground bg-background border border-white`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Borrar Documento
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <p>¿Seguro que deseas borrar el documento {document}?</p>
                    <small>Esta acción no puede ser deshecha</small>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-tertiary text-white"
                  onPress={() => onDelete(id, onClose)}
                >
                  Borrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
