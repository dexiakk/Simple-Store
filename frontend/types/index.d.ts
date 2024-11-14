declare type Filters = {
    category:String,
    gender:String,
    colors:String,
    price_min:Number,
    price_max:Number,
    collection:String,
    shoe_high:String,
}

interface AddressProps {
    id: number | null;
    street: string | null;
    house_number: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;
}

interface UserProps {
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