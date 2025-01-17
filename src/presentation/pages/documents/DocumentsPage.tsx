import { useDocuments } from '../../layouts/useDocuments';
import { Spinner } from '@nextui-org/react';
import DocumentCard from './DocumentCard';

import { useDocumentsContext } from '../../../context/DocumentsContext';

import { useDeleteDocument } from './useDeleteDocument';

const DocumentsPage = () => {
  const { data, isFetching } = useDocuments();

  const { setIsLoading } = useDocumentsContext();

  const { mutate, isPending } = useDeleteDocument();

  const handleDelete = async (id: string, onClose: () => void) => {
    setIsLoading(true);
    mutate({ id, onClose });
    setIsLoading(false);
  };

  return isFetching || isPending ? (
    <Spinner />
  ) : (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {data?.map((document) => (
        <DocumentCard
          key={document.name}
          document={document.name}
          id={document.id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default DocumentsPage;
