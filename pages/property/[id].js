// 1. getStaticPaths, mengambil array paths yang ada
// 2. getStaticProps, mengambil data dari tiap paths
// 3. next js membuatkan pages untuk masing2 path
// langkah diatas berjalan pada build time

import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import React from "react";
import ImageScrollbar from "@/components/ImageScrollbar";
import { getPlaiceholder } from "plaiceholder";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
  imgPlaceholders,
}) => {
  return (
    <Box maxW="1000px" margin="auto" p="4">
      {photos && imgPlaceholders && (
        <ImageScrollbar photos={photos} imgPlaceholders={imgPlaceholders} />
      )}
      <Box w="full" p="6">
        <Flex pt="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box pr="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Text fontSize="lg">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </Text>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  const data = await fetchApi(
    `${baseUrl}/properties/detail?externalID=${params.id}`
  );

  const imgPlaceholders = await Promise.all(
    data.photos.map(async (item) => {
      const { base64 } = await getPlaiceholder(item.url);
      return base64;
    })
  );

  return {
    props: {
      propertyDetails: data,
      imgPlaceholders: imgPlaceholders,
    },
  };
}

export default PropertyDetails;
