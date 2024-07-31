import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

type PostMenuProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { name: string; icon: string }[];
};
export default function PostMenu({
  title,
  isOpen,
  onToggle,
  items,
}: PostMenuProps) {
  const [selectedItems, setSelectedItems] = useState<
    {
      name: string;
      icon: string;
    }[]
  >([]);
  const handleSelect = (item) => {
    if (selectedItems.includes({ name: item.name, icon: item.icon })) {
      setSelectedItems(selectedItems.filter((t) => t !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  return (
    <div>
      <Popover placement="bottom-start" isOpen={isOpen} onClose={onToggle}>
        <PopoverTrigger>
          <Button
            width="8rem"
            height="3rem"
            textAlign={"center"}
            rightIcon={<ChevronDownIcon />}
            onClick={onToggle}
          >
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent width="13.5rem">
          <PopoverBody>
            <SimpleGrid columns={2} spacing={1} width="12rem">
              {items.map((item) => (
                <Button
                  key={item.name}
                  size="lg"
                  width="5rem"
                  variant={
                    items.includes({ icon: item.icon, name: item.name })
                      ? "solid"
                      : "outline"
                  }
                  colorScheme={
                    items.includes({ icon: item.icon, name: item.name })
                      ? "blue"
                      : "gray"
                  }
                  onClick={() => handleSelect(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
