import { Box } from '@chakra-ui/react';
import DOMPurify from 'dompurify';

export default function PostContent({ content }) {
  const cleanHTML = DOMPurify.sanitize(content);

  return <Box dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}
