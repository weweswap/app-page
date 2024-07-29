import { Combobox, Input, InputBase, Text, useCombobox } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

type DropdownProps = {
  value?: string;
  defaultValue?: string;
  options: {
    value: string;
    icon?: string;
    text?: string;
  }[];
  placeholder?: string;
  className?: string;
};

export const Dropdown = ({
  value,
  defaultValue,
  options,
  placeholder,
  className,
}: DropdownProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [val, setVal] = useState<string | undefined>(defaultValue);

  const selected = options.find((option) =>
    value ? option.value === value : option.value === val
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setVal(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          onClick={() => combobox.toggleDropdown()}
          classNames={{
            root: className,
            input:
              "rounded-none flex items-center justify-between gap-3 px-3 py-1 h-auto",
          }}
        >
          <div className="flex items-center gap-3">
            {selected ? (
              <>
                {selected.icon && (
                  <Image src={selected.icon} width={36} height={36} alt="" />
                )}
                <Text size="lg" className="verdana">
                  {selected.text ?? selected.value}
                </Text>
              </>
            ) : (
              <Text size="lg" className="verdana">
                {placeholder ?? "Select"}
              </Text>
            )}
          </div>
          <Image
            src="/img/icons/arrow_down.svg"
            width={16}
            height={16}
            alt=""
          />
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className="rounded-none">
        <Combobox.Options>
          {options.map((option) => (
            <Combobox.Option
              value={option.value}
              key={option.value}
              className="flex items-center gap-3 p-1 my-1"
            >
              {option.icon && (
                <Image src={option.icon} width={36} height={36} alt="" />
              )}
              <Text size="lg" className="verdana">
                {option.text ?? option.value}
              </Text>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
