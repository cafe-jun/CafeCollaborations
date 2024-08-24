import { Box } from '@chakra-ui/react';
import xss from 'xss';

export default function PostContent({ content }) {
  return <Box dangerouslySetInnerHTML={{ __html: xss(content) }} />;
}
