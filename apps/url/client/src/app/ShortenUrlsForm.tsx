import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FormEvent, useCallback, useState } from 'react';
import QRCode from 'react-qr-code';

type ShortenUrlFormProps = {
  requestShortUrl: (original: string) => Promise<void>;
};

export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({
  requestShortUrl,
}) => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await requestShortUrl(inputUrl);
      setInputUrl('');
    },
    [inputUrl, setInputUrl]
  );
  return (
    <form onSubmit={onSubmit}>
      <Input
        id="url-input"
        size="lg"
        marginBlock={4}
        value={inputUrl}
        onChange={(e) => {
          setInputUrl(e.target.value);
        }}
        placeholder="www.my-super-long-url-here.com/12345"
      />
      <Button id="submit-btn" type="submit" colorScheme="pink" size="lg">
        Generate Shortened Url
      </Button>
      <Button
        id="submit-btn"
        marginLeft={5}
        type="submit"
        colorScheme="pink"
        size="lg"
        onClick={onOpen}
      >
        Generate QRCode
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Here's the QR Code. Take a Screenshot!</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignContent="center">
            <QRCode value={inputUrl}></QRCode>
          </ModalBody>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default ShortenUrlForm;
