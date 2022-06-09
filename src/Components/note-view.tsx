import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type ItemType = {
  id: number;
  title: string;
  desc: string;
};

type Props = {
  state: ItemType[];
  setState: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

const NoteView: React.FC<Props> = ({ state, setState }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [desc, setDesc] = React.useState("");
  const [title, setTitle] = React.useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  let titleChange = (e: any) => {
    let inputValue = e.target.value;
    setTitle(inputValue);
  };

  let descriptionChange = (e: any) => {
    let inputValue = e.target.value;
    setDesc(inputValue);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        boxShadow="md"
        backgroundColor="red.400"
        style={styles.addbBtn}
      >
        +
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input
                ref={initialRef}
                value={title}
                onChange={titleChange}
                placeholder="Enter task name"
                textTransform="capitalize"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Task Description</FormLabel>
              <Textarea
                value={desc}
                onChange={descriptionChange}
                placeholder="Enter task description"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setState([...state, { id: state.length, title, desc }]);
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoteView;

const styles = {
  addbBtn: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
    paddingBottom: "8px",
  },
};
