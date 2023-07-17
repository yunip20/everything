import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';

type QrGeneratorProp = {
  inputUrl: string;
};

export const QrGenerator: React.FC<QrGeneratorProp> = ({ inputUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container marginTop={5}>
      <Button
        id="submit-btn"
        paddingX={10}
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
          <ModalBody paddingLeft={20} margin={15}>
            <QRCode value={inputUrl}></QRCode>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default QrGenerator;
