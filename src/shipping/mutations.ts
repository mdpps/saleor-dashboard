import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import { countryFragment } from "../taxes/queries";
import { shippingMethodFragment, shippingZoneDetailsFragment } from "./queries";
import {
  BulkDeleteShippingRate,
  BulkDeleteShippingRateVariables
} from "./types/BulkDeleteShippingRate";
import {
  BulkDeleteShippingZone,
  BulkDeleteShippingZoneVariables
} from "./types/BulkDeleteShippingZone";
import {
  CreateShippingRate,
  CreateShippingRateVariables
} from "./types/CreateShippingRate";
import {
  CreateShippingZone,
  CreateShippingZoneVariables
} from "./types/CreateShippingZone";
import {
  DeleteShippingRate,
  DeleteShippingRateVariables
} from "./types/DeleteShippingRate";
import {
  DeleteShippingZone,
  DeleteShippingZoneVariables
} from "./types/DeleteShippingZone";
import {
  UpdateDefaultWeightUnit,
  UpdateDefaultWeightUnitVariables
} from "./types/UpdateDefaultWeightUnit";
import {
  UpdateShippingRate,
  UpdateShippingRateVariables
} from "./types/UpdateShippingRate";
import {
  UpdateShippingZone,
  UpdateShippingZoneVariables
} from "./types/UpdateShippingZone";

export const shippingErrorFragment = gql`
  fragment ShippingErrorFragment on ShippingError {
    code
    field
  }
`;

const deleteShippingZone = gql`
  ${shippingErrorFragment}
  mutation DeleteShippingZone($id: ID!) {
    shippingZoneDelete(id: $id) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
    }
  }
`;
export const TypedDeleteShippingZone = TypedMutation<
  DeleteShippingZone,
  DeleteShippingZoneVariables
>(deleteShippingZone);

const bulkDeleteShippingZone = gql`
  ${shippingErrorFragment}
  mutation BulkDeleteShippingZone($ids: [ID]!) {
    shippingZoneBulkDelete(ids: $ids) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
    }
  }
`;
export const TypedBulkDeleteShippingZone = TypedMutation<
  BulkDeleteShippingZone,
  BulkDeleteShippingZoneVariables
>(bulkDeleteShippingZone);

const updateDefaultWeightUnit = gql`
  mutation UpdateDefaultWeightUnit($unit: WeightUnitsEnum) {
    shopSettingsUpdate(input: { defaultWeightUnit: $unit }) {
      errors {
        field
        message
      }
      shop {
        defaultWeightUnit
      }
    }
  }
`;
export const TypedUpdateDefaultWeightUnit = TypedMutation<
  UpdateDefaultWeightUnit,
  UpdateDefaultWeightUnitVariables
>(updateDefaultWeightUnit);

const createShippingZone = gql`
  ${countryFragment}
  ${shippingErrorFragment}
  mutation CreateShippingZone($input: ShippingZoneInput!) {
    shippingZoneCreate(input: $input) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
      shippingZone {
        countries {
          ...CountryFragment
        }
        default
        id
        name
      }
    }
  }
`;
export const TypedCreateShippingZone = TypedMutation<
  CreateShippingZone,
  CreateShippingZoneVariables
>(createShippingZone);

const updateShippingZone = gql`
  ${countryFragment}
  ${shippingErrorFragment}
  mutation UpdateShippingZone($id: ID!, $input: ShippingZoneInput!) {
    shippingZoneUpdate(id: $id, input: $input) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
      shippingZone {
        countries {
          ...CountryFragment
        }
        default
        id
        name
      }
    }
  }
`;
export const TypedUpdateShippingZone = TypedMutation<
  UpdateShippingZone,
  UpdateShippingZoneVariables
>(updateShippingZone);

const updateShippingRate = gql`
  ${shippingErrorFragment}
  ${shippingMethodFragment}
  mutation UpdateShippingRate($id: ID!, $input: ShippingPriceInput!) {
    shippingPriceUpdate(id: $id, input: $input) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
      shippingMethod {
        ...ShippingMethodFragment
      }
    }
  }
`;
export const TypedUpdateShippingRate = TypedMutation<
  UpdateShippingRate,
  UpdateShippingRateVariables
>(updateShippingRate);

const createShippingRate = gql`
  ${shippingErrorFragment}
  ${shippingZoneDetailsFragment}
  mutation CreateShippingRate($input: ShippingPriceInput!) {
    shippingPriceCreate(input: $input) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
      shippingZone {
        ...ShippingZoneDetailsFragment
      }
    }
  }
`;
export const TypedCreateShippingRate = TypedMutation<
  CreateShippingRate,
  CreateShippingRateVariables
>(createShippingRate);

const deleteShippingRate = gql`
  ${shippingErrorFragment}
  ${shippingZoneDetailsFragment}
  mutation DeleteShippingRate($id: ID!) {
    shippingPriceDelete(id: $id) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
      shippingZone {
        ...ShippingZoneDetailsFragment
      }
    }
  }
`;
export const TypedDeleteShippingRate = TypedMutation<
  DeleteShippingRate,
  DeleteShippingRateVariables
>(deleteShippingRate);

const bulkDeleteShippingRate = gql`
  ${shippingErrorFragment}
  mutation BulkDeleteShippingRate($ids: [ID]!) {
    shippingPriceBulkDelete(ids: $ids) {
      errors: shippingErrors {
        ...ShippingErrorFragment
      }
    }
  }
`;
export const TypedBulkDeleteShippingRate = TypedMutation<
  BulkDeleteShippingRate,
  BulkDeleteShippingRateVariables
>(bulkDeleteShippingRate);
