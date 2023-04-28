// 1. getStaticPaths, mengambil array paths yang ada
// 2. getStaticProps, mengambil data dari tiap paths
// 3. next js membuatkan pages untuk masing2 path
// langkah diatas berjalan pada build time

import { Box, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "@/utils/fetchApi";

import React from "react";
import { ImageScrollBar } from "@/components/ImageScrollbar";

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
}) => {
  return (
    <Box maxW="1000px" margin="auto" p="4">
      {photos && <ImageScrollBar data={photos} />}
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  const data = await fetchApi(
    `${baseUrl}/properties/detail?externalID=${params.id}`
  );
  return {
    props: {
      propertyDetails: data,
    },
  };
}

export default PropertyDetails;
