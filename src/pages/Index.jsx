import React, { useState } from "react";
import { Container, Text, VStack, Button, Box, useToast } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { FaMusic } from "react-icons/fa";
import { parseBlob } from "music-metadata-browser";

const Index = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const toast = useToast();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    extractMetadata(file);
  };

  const extractMetadata = async (file) => {
    try {
      const metadata = await parseBlob(file);
      setMetadata(metadata);
      toast({
        title: "Metadata extracted successfully.",
        description: "Check the console for details.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(metadata);
    } catch (error) {
      toast({
        title: "Error extracting metadata.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Music Recognition</Text>
        <Box {...getRootProps()} border="2px dashed #ccc" padding="20px" borderRadius="md" cursor="pointer">
          <input {...getInputProps()} />
          <Text>Drag 'n' drop some files here, or click to select files</Text>
        </Box>
        {file && <Text>Selected file: {file.name}</Text>}
        {metadata && (
          <Box>
            <Text>Title: {metadata.common.title || "Unknown"}</Text>
            <Text>Artist: {metadata.common.artist || "Unknown"}</Text>
            <Text>Album: {metadata.common.album || "Unknown"}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
