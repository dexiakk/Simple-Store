declare type Filters = {
    category:String,
    gender:String,
    colors:String,
    price_min:Number,
    price_max:Number,
    collection:String,
    shoe_high:String,
}

interface userProps {
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    preferedGender: string | null,
    created_at: string | null,
    dateOfBirth: string | null,
  }