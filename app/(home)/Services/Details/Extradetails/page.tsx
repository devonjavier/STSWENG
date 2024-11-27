'use client';
import Link from 'next/link';
import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import GenerateDivs from '@/app/components/GenerateDivs';
import { formatCurrency } from '@/utils/formatCurrency';
import { fetchItems } from '@/utils/supabase/data';

type StoreItemProps = {
  itemid: number;
  itemname: string;
  price: number;
  imageName: string;
  description: string;
  quantity: number;
};

type CartItemProps = {
  id: number;
  quantity: number;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItemProps[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);


function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// ShoppingCartProvider component
const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [storeItems, setStoreItems] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const items = await fetchItems();
      
      if (items) {
        const initializedItems = items.map((item: Omit<CartItemProps, 'quantity'>) => ({
          ...item,
          quantity: 0, // Initialize with zero quantity
        }));
        setStoreItems(items);
        setCartItems(initializedItems);
      }
    };
    loadItems();
  }, []);


  const cartQuantity = cartItems.reduce((quantity: number, item: CartItemProps) => item.quantity + quantity, 0);

  function getItemQuantity(id: number) {
    return cartItems.find((item: CartItemProps) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    const storeItem = storeItems.find(item => item.itemid === id);
    const availableQuantity = storeItem?.quantity || 0;
    const currentQuantityInCart = getItemQuantity(id);

    if (currentQuantityInCart < availableQuantity) {
      setCartItems((currItems: CartItemProps[]) => {
        if (currItems.find((item: CartItemProps) => item.id === id) == null) {
          return [...currItems, { id, quantity: 1 }];
        } else {
          return currItems.map((item: CartItemProps) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
      });
    } else {
      alert('You have reached the maximum limit for this item');
    }
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems: CartItemProps[]) => {
      if (currItems.find((item: CartItemProps) => item.id === id)?.quantity === 1) {
        return currItems.filter((item: CartItemProps) => item.id !== id);
      } else {
        return currItems.map((item: CartItemProps) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems: CartItemProps[]) => currItems.filter((item: CartItemProps) => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

const Page = ({ searchParams }: { searchParams: { service: string, serviceType: string, maincustomerfirstname: string, maincustomermiddlename: string, maincustomerlastname: string, phonenumber: string, emailaddress: string, needsparking: string, additionalrequests: string, hours: number, additionalpackage: string } }) => {
  useEffect(() => {
    console.log(searchParams.hours);
  });
  const { cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = useState<StoreItemProps[]>([]);
  const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);
  const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);
  const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);
  const [countAdditionalCustomers, setcountAdditionalCustomers] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const items = await fetchItems();
      console.log("Fetched items:", items); // Debug log
      setStoreItems(items || []); // Default to empty array if items is undefined
    };
    loadItems();
  }, []);


  const validateAdditionalCustomerNames = () => {
    let tempErrors: string[] = [];

    for (let i = 0; i < countAdditionalCustomers; i++) {
      tempErrors[i] = tempErrors[i] || ""; // Ensure array entry exists

      if (!additionalCustomersFirstname[i] || !additionalCustomersFirstname[i].trim()) {
        tempErrors[i] += "FirstNameRequired ";
      } else if (!/^[a-zA-Z ]+$/.test(additionalCustomersFirstname[i])) {
        tempErrors[i] += "FirstNameInvalid ";
      }

      if (additionalCustomersMiddlename[i] && !/^[a-zA-Z ]+$/.test(additionalCustomersMiddlename[i])) {
        tempErrors[i] += "MiddleNameInvalid ";
      }

      if (!additionalCustomersLastname[i] || !additionalCustomersLastname[i].trim()) {
        tempErrors[i] += "LastNameRequired ";
      } else if (!/^[a-zA-Z ]+$/.test(additionalCustomersLastname[i])) {
        tempErrors[i] += "LastNameInvalid ";
      }
    }

    setErrors(tempErrors);
    return tempErrors.every(error => error === "");
  };

  const handleNextClick = (e: any) => {

    setSubmitted(true);

    if (!validateAdditionalCustomerNames()) {
      e.preventDefault();
    }
  };

  // Store component 
  const Store = () => (
    <div className="flex justify-between p-5">
      <div className="flex-1 pr-5">
        <h1 className="text-2xl font-bold mb-4 text-black">Equipments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {storeItems.map((item) => (
            <StoreItem key={item.itemid} {...item} />
          ))}
        </div>
      </div>
      <div className="w-px bg-gray-300 mx-5"></div>
      <div className="w-1/3 p-5 bg-white shadow-md"> {/* Summary container */}
        <ShoppingCart />
      </div>
    </div>
  );
  
  
  const StoreItem = ({ itemid, itemname, price, imageName, description, quantity }: StoreItemProps) => {
    const { increaseCartQuantity } = useShoppingCart();
    const storeItem = storeItems.find((item: StoreItemProps) => item.itemid === itemid);
    const isAvailable = storeItem && storeItem.quantity > 0;
  
    return (
      <div className="max-w-xs h-full bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col"> {/* Card container */}
        <img
          src={imageName}
          alt={itemname}
          className="w-full h-36 object-cover border-gray" 
        />
        <div className="flex flex-col bg-gray-100 justify-between p-4 flex-grow"> {/* Card Body */}
            <div className="text-black flex justify-between items-baseline mb-2"> {/* Card Title */}
                <span className="text-md font-semibold">{itemname}</span>
                <span className="text-gray-500 text-xs">
                {formatCurrency(price)}
                </span>
            </div>
            <div className="text-gray-500 mb-2 text-sm">
                {description}
            </div>

        <div className="mt-auto flex items-center justify-center">
            {isAvailable ? (
            <button
              className="w-full bg-indigo-800 text-white font-bold py-2 rounded"
              onClick={() => increaseCartQuantity(itemid)}
            >
              Available
            </button>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <span className="text-red-600 text-lg">Unavailable</span>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  };  

    // CartItem component 
    const CartItem = ({ id, quantity }: CartItemProps) => {
        const storeItem = storeItems.find((item) => item.itemid === id);
        const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
    
        if (!storeItem) return null;
    
        return (
            <div className="flex items-center gap-2">
              <div className="flex-grow pl-4 w-full"> 
                <div className="flex justify-between items-center text-black">
                  <span>{storeItem.itemname}</span>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">
                      {formatCurrency(storeItem.price * quantity)}
                    </div>
                    <button
                      className="text-red-600 border border-red-600 rounded px-2 py-1 text-sm hover:bg-red-600 hover:text-white"
                      onClick={() => removeFromCart(storeItem.itemid)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
                {quantity > 1 && (
                  <span className="text-gray-500 text-xs">
                    Quantity: {quantity}
                  </span>
                )}
                <div className="text-gray-500 text-xs">
                  {formatCurrency(storeItem.price)}
                </div>
              </div>
            </div>
          );
      };

  const ShoppingCart = () => {
    const { cartItems } = useShoppingCart();
    return (
        <div className="p-0 w-full"> 
          <h2 className="text-2xl font-semibold mb-4 text-black">Summary</h2>
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => {
              const storeItem = storeItems.find(i => i.itemid === item.id);
              const isAvailable = storeItem && storeItem.quantity > 0;
      
              return (
                <div key={item.id}>
                  <CartItem {...item} />
                  {!isAvailable && (
                    <div className="text-red-600 text-sm">This item is unavailable</div>
                  )}
                </div>
              );
            })}
      
            <div className="font-bold text-lg text-gray-600 text-left">
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.itemid === cartItem.id);
                  if (!item || item.quantity === 0) return total; // Skip unavailable items
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </div>
        </div>
      );  
  };

  return (
    <ShoppingCartProvider>
      <div className="px-4 lg:px-32 flex flex-col gap-8 mt-10 lg:mb-6 lg:mt-20">
        {/* Heading Section */}
        <div>
          <div className="text-cusBlue text-4xl lg:text-6xl font-bold">
            Book an Appointment
          </div>
          <div className="text-sm pt-2 lg:pt-0 lg:text-xl">
            Services&gt; Details &gt; <span className="text-cusBlue">ExtraDetails</span> &gt; Date & Time &gt; Confirmation &gt; Password Confirmation &gt; Booking Status
          </div>
        </div>

        {/* Additional Persons Involved Section */}
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row mt-5 mb-3 items-center gap-5">
              <span className="text-black drop-shadow-lg font-bold text-lg mr-16">
                Additional Persons Involved
              </span>
              <button
                className="drop-shadow-2xl rounded-full bg-cusBlue w-[45px] h-[45px]"
                onClick={() => setcountAdditionalCustomers(countAdditionalCustomers => Math.max(0, countAdditionalCustomers - 1))}
              >
                -
              </button>
              <span className="text-cusBlue font-bold text-lg mx-4">{countAdditionalCustomers}</span>
              <button
                className="drop-shadow-2xl rounded-full bg-cusBlue w-[45px] h-[45px]"
                onClick={() => setcountAdditionalCustomers(countAdditionalCustomers => Math.min(9, countAdditionalCustomers + 1))}
              >
                +
              </button>
            </div>

            <GenerateDivs
              counter={countAdditionalCustomers}
              setadditionalCustomersFirst={setadditionalCustomersFirstname}
              setadditionalCustomersMiddle={setadditionalCustomersMiddlename}
              setadditionalCustomersLast={setadditionalCustomersLastname}
              errors={errors}
              submitted={submitted}
            />

            <div className="my-8 border-t border-gray-300"></div>

            {/* Equipments and Summary Section */}
            <div className="mt-8">
                <Store />
            </div>

            <Link
              href={{
                pathname: "/Services/Details/Extradetails/Datetime",
                query: {
                  service: searchParams.service,
                  serviceType: searchParams.serviceType,
                  maincustomerfirstname: searchParams.maincustomerfirstname,
                  maincustomermiddlename: searchParams.maincustomermiddlename,
                  maincustomerlastname: searchParams.maincustomerlastname,
                  phonenumber: searchParams.phonenumber,
                  emailaddress: searchParams.emailaddress,
                  needsparking: searchParams.needsparking,
                  additionalrequests: searchParams.additionalrequests,
                  countAdditionalCustomers: countAdditionalCustomers,
                  additionalCustomersfirstnames: JSON.stringify(additionalCustomersFirstname),
                  additionalCustomersmiddlenames: JSON.stringify(additionalCustomersMiddlename),
                  additionalCustomerslastnames: JSON.stringify(additionalCustomersLastname),
                  hours: searchParams.hours,
                  additionalpackage: searchParams.additionalpackage,
                  cartItems: JSON.stringify(cartItems)
                }
              }}
            >
              <button className="bg-cusBlue my-5 rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={handleNextClick}>
                Proceed to Date & Time
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ShoppingCartProvider>
  );
};

export default Page;