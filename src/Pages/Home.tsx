import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import NoteView from "../Components/note-view";

type ItemType = {
  id: number;
  title: string;
  desc: string;
};

type Props = {
  state: ItemType[];
  setState: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

type Props2 = {
  item: ItemType;
  state: ItemType[];
  setState: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

interface IOptions {
  options: ItemType[];
  state: ItemType[];
  setState: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

const Header = ({ state, setState }: Props) => {
  return (
    <Center p={4} mb={10}>
      <Flex>
        <Heading
          as="h2"
          size="xl"
          me="36"
          textTransform="uppercase"
          fontWeight="extrabold"
          letterSpacing="tight"
        >
          All Tasks
        </Heading>
        <NoteView state={state} setState={setState} />
      </Flex>
    </Center>
  );
};

const ListItem = ({ item, state, setState }: Props2) => {
  const { id, title, desc } = item;
  const deleteItem = (id: number): void =>
    setState(state.filter((item) => item.id !== id));
  return (
    <Box
      p={4}
      m={4}
      boxShadow="base"
      backgroundColor="blackAlpha.50"
      style={styles.listItemBox}
    >
      <Box>
        <Heading
          as="h4"
          size="md"
          fontStyle="italic"
          textTransform="capitalize"
        >
          {title}
        </Heading>
        <Text fontSize="md" fontStyle="italic">
          {desc}
        </Text>
      </Box>
      <Box>
        <DeleteIcon
          onClick={() => deleteItem(id)}
          w={5}
          h={5}
          color="red.500"
        />
      </Box>
    </Box>
  );
};

const Lists = ({ options, state, setState }: IOptions) => {
  return (
    <Box>
      {options.length ? (
        options.map((item, index) => (
          <ListItem key={index} item={item} state={state} setState={setState} />
        ))
      ) : (
        <p style={styles.para}>No Data Here</p>
      )}
    </Box>
  );
};

export default function Home() {
  const [state, setState] = React.useState<ItemType[]>(
    JSON.parse(String(localStorage.getItem("items")))
  );

  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state));
  }, [state]);

  return (
    <Box style={styles.header}>
      <Header state={state} setState={setState} />
      <Box mx={{ lg: "auto" }} w={{ lg: "50%" }}>
        <Lists options={state} state={state} setState={setState} />
      </Box>
    </Box>
  );
}

const styles = {
  para: {
    fontWeight: 200,
    fontSize: 32,
    marginTop: 148,
    textAlign: "center" as "center",
    textTransform: "uppercase" as "uppercase",
  },
  header: {
    marginTop: 50,
  },
  listItemBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
