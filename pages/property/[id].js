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
import { Markup } from "interweave";

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
  console.log("[amenities] :", amenities);
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
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
          </Text>
          <Text lineHeight="2" color="gray.600">
            <Markup content={description} />
          </Text>
        </Box>
        <Flex
          flexWrap="wrap"
          textTransform="uppercase"
          justifyContent="space-between"
        >
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Type</Text>
            <Text fontWeight="bold">{type}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Purpose</Text>
            <Text fontWeight="bold">{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && <Text>Facilities :</Text>}
          <Flex flexWrap="wrap">
            {amenities?.map((item) => {
              console.log("amenities : ", item);
              return item?.amenities?.map((amenity) => {
                console.log("amenity : ", amenity);
                return (
                  <Text
                    key={amenity.text}
                    fontWeight="bold"
                    color="blue.400"
                    fontSize="l"
                    p="2"
                    bg="gray.200"
                    m="1"
                    borderRadius="5"
                  >
                    {amenity.text}
                  </Text>
                );
              });
            })}
          </Flex>
        </Box>
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
