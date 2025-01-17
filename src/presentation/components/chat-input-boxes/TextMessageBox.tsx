import { Button } from '@nextui-org/react';
import { FormEvent, useRef, useState } from 'react';
import DeleteModal from '../delete-modal/DeleteHistoryModal';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  onDeleteMessages: () => void;
  isLoading: boolean;
}

const TextMessageBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  onDeleteMessages,
  isLoading,
}: Props) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message);
    inputRef.current?.focus();
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center justify-center h-16 rounded-xl w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full bg-primary p-2 bg-opacity-25 rounded-md flex gap-1 shadow-xl">
          <DeleteModal bot={'chatgpt'} deleteMessages={onDeleteMessages} />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            name="question"
            className="flex w-full border rounded-xl focus:outline-none focus:border-purple-300 pl-4 h-10 "
            placeholder={placeholder}
            autoComplete={!disableCorrections ? 'off' : 'on'}
            autoCorrect={!disableCorrections ? 'off' : 'on'}
            spellCheck={!disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="">
            <Button
              className="bg-tertiary min-w-10 min-h-fit sm:w-20"
              type="submit"
              disabled={isLoading}
            >
              <span className="mr-2 hidden sm:block text-white">Enviar</span>
              <i className=" fa-regular fa-paper-plane text-white"></i>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextMessageBox;
