'use client'

import { FC, useCallback, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/Command"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Prisma, Subpoeddit } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"
import { number } from "zod"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = ({ }) => {
  const [input, setInput] = useState<string>('')


  const { data: queryResults, refetch, isFetched, isFetching } = useQuery({
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Subpoeddit & { _count: Prisma.SubpoedditCountOutputType })[]
    },
    queryKey: ['search-query'],
    enabled: false
  })


  const request = useDebounce(() => {
    refetch()
  }, 300);

  const debounceRequest = useCallback(() => {
    request(refetch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()

  return (
    <Command className='relative rounded-lg border max-w-lg z-50 overflow-visible'>
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text)
          debounceRequest()
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0" placeholder="Search communities..." />
      {input.length > 0 ? (<CommandList className="absolute bg-white dark:bg-slate-700 top-full inset-x-0 shadow rounded-b-md">
        {isFetched && <CommandEmpty>Not found results.</CommandEmpty>}
        {(queryResults?.length ?? 0) > 0 ? (
          <CommandGroup heading='Communities'>
            {queryResults?.map((subpoeddit) => (<CommandItem key={subpoeddit.id} onSelect={(e) => {
              router.push(`/p/${e}`)
              router.refresh()
            }}
              value={subpoeddit.name}
            >
              <Users className="mr-2 h-4 w-4" />
              <a href={`/p/${subpoeddit.name}`}>p/${subpoeddit.name}</a>
            </CommandItem>))}
          </CommandGroup>) : null}
      </CommandList>) : null}
    </Command>
  )
}

export default SearchBar

function debounce(arg0: () => Promise<void>) {
  throw new Error("Function not implemented.")
}
