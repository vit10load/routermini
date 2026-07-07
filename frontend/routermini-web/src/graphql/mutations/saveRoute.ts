import { gql } from '@apollo/client/core';

export const SAVE_ROUTE_MUTATION = gql`
  mutation SaveRoute($input: SaveRouteInput!) {
    saveRoute(input: $input) {
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