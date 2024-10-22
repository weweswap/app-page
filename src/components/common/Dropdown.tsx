import { Combobox, InputBase, useCombobox } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Typography } from "./Typography";

type DropdownProps = {
  value?: string;
  defaultValue?: string;
  options: {
    value: string;
    icon?: string;
    text?: string;
    index?: number;
    disabled?: boolean
  }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean
  setIndexValue?: (value: number) => void;
};

export const Dropdown = ({
  value,
  defaultValue,
  options,
  placeholder,
  className,
  setIndexValue,
  disabled
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
        setIndexValue &&
          setIndexValue(options.find((o) => o.value === val)?.index ?? 0);
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
              "rounded-none flex items-center justify-between gap-3 px-3 py-1 h-[3rem]",
          }}
        >
          <div className="flex items-center gap-3">
            {selected ? (
              <>
                {selected.icon && (
                  <Image src={selected.icon} width={36} height={36} alt="" />
                )}
                <Typography size="lg">
                  {selected.text ?? selected.value}
                </Typography>
              </>
            ) : (
              <Typography size="lg">{placeholder ?? "Select"}</Typography>
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
              disabled={option.disabled}
              className="flex items-center gap-3 p-1 my-1"
            >
              {option.icon && (
                <Image src={option.icon} width={36} height={36} alt="" />
              )}
              <Typography size="lg">{option.text ?? option.value}</Typography>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
