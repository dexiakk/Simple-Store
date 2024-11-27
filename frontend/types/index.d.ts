interface AddressProps {
    id: number | null;
    street: string | null;
    house_number: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;
}

interface UserProps {
    permissions: string | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    preferedGender: string | null;
    created_at: string | null;
    dateOfBirth: string | null;
    avatar: string | null;
}

interface UserDetailsProps {
    user: UserProps;
}

interface UserAdressesProps {
    addresses: AddressProps[] | null;
}

interface AddressInputFieldProps {
    address: AddressProps | null;
    type: string;
}

interface ShoeVariantProps {
    id: number;
    color: string;
    main_image: string;
    images_gallery: string[];
}

type Color = {
    name: string;
    value: string;
};

interface ShoeItemProps {
    id: number;
    bestseller: boolean;
    manufacturer: string;
    model: string;
    gender: "male" | "female" | "unisex";
    colors: Color[];
    description: string;
    price: string;
    shoe_high: string;
    variants: ShoeVariant[];
}

interface ItemWindowProps {
    shoeList: ShoeItemProps[];
}

type Filters = {
    category: string[];
    collection: string[];
    color: string[];
    gender: string[];
    shoe_high: string[];
  };
  
  interface FiltersToSentProps {
    filters: Filters;
  }

  interface FiltersSideBarProps {
    availableFilters: Filters; 
    filters: Filters;  
    onFilterChange: (key: keyof Filters, value: string, checked: boolean) => void
  }

  interface ShoePageGalleryProps {
    shoe: ShoeItemProps;
    currentVariant: number;
    handleCurrentImageChange: (source: string) => void;
  }

  type CartItem = {
    id: string | null
    variant: string | null
    size: string | null; 
    shoe?: Shoe | null;
}

interface SizesProps {
    shoe_sizes: { size: string }[];
    handleSizeSelect: (size: string) => void
}