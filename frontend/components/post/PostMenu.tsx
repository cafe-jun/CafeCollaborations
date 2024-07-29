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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";

const technologies = [
  { name: "React", icon: "/path/to/react-icon.png" },
  { name: "TypeScript", icon: "/path/to/typescript-icon.png" },
  { name: "JavaScript", icon: "/path/to/javascript-icon.png" },
  { name: "Vue", icon: "/path/to/vue-icon.png" },
  { name: "Next.js", icon: "/path/to/nextjs-icon.png" },
  { name: "Node.js", icon: "/path/to/nodejs-icon.png" },
  { name: "Java", icon: "/path/to/java-icon.png" },
  { name: "Spring", icon: "/path/to/spring-icon.png" },
  { name: "Kotlin", icon: "/path/to/kotlin-icon.png" },
  { name: "Nest.js", icon: "/path/to/nestjs-icon.png" },
  { name: "Swift", icon: "/path/to/swift-icon.png" },
  { name: "Flutter", icon: "/path/to/flutter-icon.png" },
  { name: "Figma", icon: "/path/to/figma-icon.png" },
];

type PostMenuProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
};
export default function PostMenu({ title, isOpen, onToggle }: PostMenuProps) {
  const [selectedTechs, setSelectedTechs] = useState([]);
  console.log(title);
  const handleSelect = (tech) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };
  return (
    <div>
      <Popover placement="bottom-start" isOpen={isOpen} onClose={onToggle}>
        <PopoverTrigger>
          <Button
            width="8rem"
            height="3rem"
            rightIcon={<ChevronDownIcon />}
            onClick={onToggle}
          >
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent width="300px">
          <PopoverBody>
            <SimpleGrid columns={2} spacing={2} width="10rem" overflowY="auto">
              {technologies.map((tech) => (
                <Button
                  key={tech.name}
                  size="lg"
                  variant={
                    selectedTechs.includes(tech.name) ? "solid" : "outline"
                  }
                  colorScheme={
                    selectedTechs.includes(tech.name) ? "blue" : "gray"
                  }
                  onClick={() => handleSelect(tech.name)}
                  leftIcon={<Image src={tech.icon} boxSize="20px" />}
                >
                  {tech.name}
                </Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
