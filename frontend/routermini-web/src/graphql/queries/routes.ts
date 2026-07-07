import { gql } from '@apollo/client/core';

export const ROUTES_QUERY = gql`
  query Routes($filter: RouteFilterInput) {
    routes(filter: $filter) {
      id
      originAddress
      destinationAddress
      distanceKm
      durationText
      createdAt
      vehicle {
        id
        plate
        brand
        model
      }
      points {
        sequence
        lat
        lng
      }
    }
  }
`;