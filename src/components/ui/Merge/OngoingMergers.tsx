import { Table } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "~/components/common";
import MergerCards from "./MergerCards";


const MergeTokenList = [
    // {
    //   name: "WEWE",
    //   logo: "/img/tokens/wewe.svg",
    //   mergeLink:"/merge/vult"
    // },
  {
      name: "VULT",
      logo: "/img/tokens/vult.svg",
      mergeLink:"/merge/vult" 
    },
   {
      name: "BRO",
      logo: "/img/tokens/bro.svg",
      mergeLink:"/merge/bro" 
    },
    {
      name: "FOMO",
      logo: "/img/tokens/FOMO.webp",
      mergeLink:"/merge/fomo" 
    },
  {
      name: "BOOMER",
      logo: "/img/tokens/boomer.webp",
      mergeLink:"/merge/boomer" 
    },
  {
      name: "DUH",
      logo: "/img/tokens/DUH.webp",
    },
  {
      name: "MOBY",
      logo: "/img/tokens/MOBY.webp",
    },
   {
      name: "COSMIC",
      logo: "/img/tokens/COSMIC.webp",
    },
   {
      name: "FCKN",
      logo: "/img/tokens/FCKN.webp",
    },
   {
      name: "CDS",
      logo: "/img/tokens/CDS.webp",
    },
   {
      name: "GOODLE",
      logo: "/img/tokens/goodle.svg",
    },
  ];
  

export const OngoingMergers = () => {
  return (
    <Table stickyHeader className="min-w-[70rem]">
      <Table.Thead>
        <Table.Tr className="bg_rich_dark">
          <Table.Th>Name</Table.Th>
          <Table.Th>X:WEWE Ratio</Table.Th>
          <Table.Th>Premium</Table.Th>
          <Table.Th>CHAOS Multipliers</Table.Th>
          <Table.Th>Snapshot</Table.Th>
          <Table.Th>Caps</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
       {MergeTokenList.map((token) => {
        return (
          <>
        <MergerCards key={token.name} token={token} />
        </>
        )
       }) }
      </Table.Tbody>
    </Table>
  );
};