import { InputBase, Table } from "@mantine/core";
import MergerCards from "./MergerCards";
import { useEffect, useState } from "react";
import { Typography } from "~/components/common";


const MergeTokenList = [
  {
      name: "VULT",
      logo: "/img/tokens/vult.svg",
      tokenAddress: "0x299A57C1f6761b3dB304dc8B18bb4E60A1CF37b6",
      mergeLink:"/merge/vult" 
    },
   {
      name: "BRO",
      logo: "/img/tokens/bro.svg",
      tokenAddress: "0x93750140C2EcEA27a53c6ed30380829607815A31",
      mergeLink:"/merge/bro" 
    },
    {
      name: "FOMO",
      logo: "/img/tokens/FOMO.webp",
      tokenAddress: "0xd327d36EB6E1f250D191cD62497d08b4aaa843Ce",
      mergeLink:"/merge/fomo" 
    },
  {
      name: "BOOMER",
      logo: "/img/tokens/boomer.webp",
      tokenAddress: "0xcdE172dc5ffC46D228838446c57C1227e0B82049",
      mergeLink:"/merge/boomer" 
    },
  {
      name: "DUH",
      logo: "/img/tokens/DUH.webp",
      tokenAddress: "0x",
    },
  {
      name: "MOBY",
      logo: "/img/tokens/MOBY.webp",
      tokenAddress: "0x",
    },
   {
      name: "COSMIC",
      logo: "/img/tokens/COSMIC.webp",
      tokenAddress: "0x",
    },
   {
      name: "FCKN",
      logo: "/img/tokens/FCKN.webp",
      tokenAddress: "0x",
    },
   {
      name: "CDS",
      logo: "/img/tokens/CDS.webp",
      tokenAddress: "0x",
    },
   {
      name: "GOODLE",
      logo: "/img/tokens/goodle.svg",
      tokenAddress: "0x",
    },
  ];

  const TableHead = [
    "Name", "X:WEWE Ratio", "Premium", "CHAOS Multiplier", "Snapshot", "Caps", ""
  ]
  

export const OngoingMergers = () => {

  const [search, setSearch] = useState("");
  const [tokenList, setTokenList] = useState(MergeTokenList)

  useEffect(() => {
    if(search.startsWith("0")) {
      setTokenList(MergeTokenList.filter((token) => token?.tokenAddress.toLowerCase().includes(search.toLowerCase())))
    }
    else {
      setTokenList(MergeTokenList.filter((token) => token.name.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search])

  return (
    <div className="min-h-[40rem]">
      <InputBase 
      placeholder="Search by token name or address" 
      value={search} 
      onChange={(e) => setSearch(e.target.value)}
      className="py-1" />
    <Table stickyHeader className="min-w-[70rem] mt-4 mb-2">
      <Table.Thead>
        <Table.Tr className="bg_rich_dark">
          {TableHead.map((head) => {
            return <Table.Th key={head}>{head}</Table.Th>
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
       {tokenList.length > 0 && tokenList.map((token) => {
        return (
        <MergerCards key={token.name} token={token} />
        )
       }) }
      </Table.Tbody>
    </Table>
    {tokenList.length === 0 && <Typography size="xl" className="py-10 text-center" secondary>No ongoing mergers☹️</Typography>}
    </div>
  );
};