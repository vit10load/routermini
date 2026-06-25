import { gql } from '@apollo/client/core';

export const CALCULATE_ROUTE_MUTATION = gql`
  mutation CalculateRoute($input: CalculateRouteInput!) {
    calculateRoute(input: $input) {
      originAddress
      destinationAddress
      distanceKm
      durationText
      encodedPolyline
      points {
        sequence
        lat
        lng
      }
    }
  }
`;