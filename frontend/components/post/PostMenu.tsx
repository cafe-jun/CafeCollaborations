import { ChevronDownIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type PostMenuProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; value: string }[];
  itemsValue;
  setItemsValue;
};
export default function PostMenu({
  title,
  isOpen,
  onToggle,
  items,
  itemsValue,
  setItemsValue,
}: PostMenuProps) {
  const handleSelect = (item: { label: string; value: string }) => {
    const { label, value } = item;
    if (itemsValue.includes(value)) {
      setItemsValue(itemsValue.filter((selectItem) => selectItem !== value));
    } else {
      setItemsValue([...itemsValue, value]);
    }
  };
  // useEffect(() => {
  //   console.log('selectedItems ', itemsValue);
  // }, [itemsValue]);
  return (
    <div>
      <Popover placement="bottom-start" isOpen={isOpen} onClose={onToggle}>
        <PopoverTrigger>
          <Button
            width="8rem"
            height="3rem"
            textAlign={'center'}
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
                  key={item.value}
                  size="lg"
                  width="5rem"
                  variant={
                    itemsValue.includes(item.value) ? 'solid' : 'outline'
                  }
                  colorScheme={
                    itemsValue.includes(item.value) ? 'blue' : 'gray'
                  }
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                </Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
