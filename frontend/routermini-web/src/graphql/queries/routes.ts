import { gql } from '@apollo/client/core';

export const ROUTES_QUERY = gql`
  query Routes {
    routes {
      id
      originAddress
      destinationAddress
      distanceKm
      durationText
      createdAt
      points {
        sequence
        lat
        lng
      }
    }
  }
`;