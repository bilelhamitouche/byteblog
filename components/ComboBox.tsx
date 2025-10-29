"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronsDown, X } from "lucide-react";

export default function ComboBox({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  function toggleSelection(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  function removeSelection(value: string) {
    onChange(selected.filter((v) => v !== value));
  }
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="relative p-1 w-full"
          >
            <div className="flex flex-wrap gap-1 items-center pe-2.5">
              {selected.length > 0 ? (
                selected.map((val) => {
                  const option = options.find((c) => c === val);
                  return option ? (
                    <Badge key={val} variant="outline">
                      {option}
                      <Button
                        variant="destructive"
                        size="smallIcon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelection(val);
                        }}
                      >
                        <X />
                      </Button>
                    </Badge>
                  ) : null;
                })
              ) : (
                <span className="px-2.5">Select topics</span>
              )}
            </div>
            <ChevronsDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No topics found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => toggleSelection(option)}
                  >
                    <span className="truncate">{option}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
