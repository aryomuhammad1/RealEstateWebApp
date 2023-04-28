import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Select,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "@/utils/filterData";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    console.log("filterValues : ", filterValues);
    const { pathname, query } = router;

    console.log("pathname : ", pathname);
    console.log("query : ", query);

    query[filterValues.name] = filterValues.value;
    router.push({ pathname: pathname, query: query });
  };

  return (
    <Flex background="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map((filter) => {
        return (
          <Box key={filter.queryName}>
            <Select
              placeholder={filter.placeholder}
              w="fit-content"
              p="2"
              onChange={(e) =>
                searchProperties({
                  name: filter.queryName,
                  value: e.target.value,
                })
              }
            >
              {filter.items?.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </Box>
        );
      })}
    </Flex>
  );
};

export default SearchFilters;
