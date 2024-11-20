export type IProperty = {
  property_id: string;
  property_name: string;
  property_type: string;
  property_location: string;
  property_price: string;
  property_image: string;
  property_purpose: string;
  longitude: string;
  latitude: string
};

export type PropertyProps = {
  property: IProperty;
};
