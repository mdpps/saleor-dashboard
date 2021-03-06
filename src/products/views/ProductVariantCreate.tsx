import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { commonMessages } from "@saleor/intl";
import { decimal, maybe } from "../../misc";
import ProductVariantCreatePage, {
  ProductVariantCreatePageSubmitData
} from "../components/ProductVariantCreatePage";
import { TypedVariantCreateMutation } from "../mutations";
import { TypedProductVariantCreateQuery } from "../queries";
import { VariantCreate } from "../types/VariantCreate";
import { productUrl, productVariantEditUrl, productListUrl } from "../urls";

interface ProductUpdateProps {
  productId: string;
}

export const ProductVariant: React.FC<ProductUpdateProps> = ({ productId }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();

  return (
    <TypedProductVariantCreateQuery displayLoader variables={{ id: productId }}>
      {({ data, loading: productLoading }) => {
        const product = data?.product;

        if (product === null) {
          return <NotFoundPage onBack={() => navigate(productListUrl())} />;
        }

        const handleCreateSuccess = (data: VariantCreate) => {
          if (data.productVariantCreate.errors.length === 0) {
            notify({
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            navigate(
              productVariantEditUrl(
                productId,
                data.productVariantCreate.productVariant.id
              )
            );
          }
        };

        return (
          <TypedVariantCreateMutation onCompleted={handleCreateSuccess}>
            {(variantCreate, variantCreateResult) => {
              const handleBack = () => navigate(productUrl(productId));
              const handleSubmit = (
                formData: ProductVariantCreatePageSubmitData
              ) =>
                variantCreate({
                  variables: {
                    input: {
                      attributes: formData.attributes
                        .filter(attribute => attribute.value !== "")
                        .map(attribute => ({
                          id: attribute.id,
                          values: [attribute.value]
                        })),
                      costPrice: decimal(formData.costPrice),
                      priceOverride: decimal(formData.priceOverride),
                      product: productId,
                      quantity: parseInt(formData.quantity, 0),
                      sku: formData.sku,
                      trackInventory: true
                    }
                  }
                });
              const handleVariantClick = (id: string) =>
                navigate(productVariantEditUrl(productId, id));

              const disableForm = productLoading || variantCreateResult.loading;

              return (
                <>
                  <WindowTitle
                    title={intl.formatMessage({
                      defaultMessage: "Create variant",
                      description: "window title"
                    })}
                  />
                  <ProductVariantCreatePage
                    currencySymbol={maybe(() => shop.defaultCurrency)}
                    errors={
                      variantCreateResult.data?.productVariantCreate.errors ||
                      []
                    }
                    header={intl.formatMessage({
                      defaultMessage: "Create Variant",
                      description: "header"
                    })}
                    loading={disableForm}
                    product={data?.product}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    onVariantClick={handleVariantClick}
                    saveButtonBarState={variantCreateResult.status}
                  />
                </>
              );
            }}
          </TypedVariantCreateMutation>
        );
      }}
    </TypedProductVariantCreateQuery>
  );
};
export default ProductVariant;
