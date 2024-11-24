import { InputBase, Table } from "@mantine/core";
import MergerCards from "./MergerCards";
import { useEffect, useState } from "react";


const MergeTokenList = [
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

  const TableHead = [
    "Name", "X:WEWE Ratio", "Premium", "CHAOS Multiplier", "Snapshot", "Caps", ""
  ]
  

export const OngoingMergers = () => {

  const [search, setSearch] = useState("");
  const [tokenList, setTokenList] = useState(MergeTokenList)

  useEffect(() => {
    console.log("Counting")
    if(search === "") {
      setTokenList(MergeTokenList)
    }

    else {
      setTokenList(prevTokenList => {
        return prevTokenList.filter((token) => {
          return token.name.toLowerCase().includes(search.toLowerCase())
        })
      })
    }

  }, [search, tokenList])



  return (
    <div className="min-h-[40rem]">
    <div>
      <InputBase placeholder="Search by token name" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    <Table stickyHeader className="min-w-[70rem] mt-4">
      <Table.Thead>
        <Table.Tr className="bg_rich_dark">
          {TableHead.map((head) => {
            return <Table.Th key={head}>{head}</Table.Th>
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
       {tokenList.map((token) => {
        return (
        <MergerCards key={token.name} token={token} />
        )
       }) }
      </Table.Tbody>
    </Table>
    </div>
  );
};