import { Button, Input } from '@chakra-ui/react';
import { FormEvent, useCallback } from 'react';

type ShortenUrlFormProps = {
  requestShortUrl: (original: string) => Promise<void>;
  inputUrl: string;
  setInputUrl: (input: string) => void;
};

export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({
  requestShortUrl,
  inputUrl,
  setInputUrl,
}) => {
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
    </form>
  );
};

export default ShortenUrlForm;
