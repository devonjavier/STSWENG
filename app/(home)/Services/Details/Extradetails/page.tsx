'use client';
import Link from 'next/link';
import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import GenerateDivs from '@/app/components/GenerateDivs';
import { Row, Col, Button, Card, Stack } from 'react-bootstrap';
import { formatCurrency } from '@/utils/formatCurrency';
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import storeItems from '@/app/data/items.json';

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
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

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// ShoppingCartProvider component
const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity: number, item: CartItemProps) => item.quantity + quantity, 0);

  function getItemQuantity(id: number) {
    return cartItems.find((item: CartItemProps) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    const storeItem = storeItems.find(item => item.id === id);
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

  const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);
  const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);
  const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);
  const [countAdditionalCustomers, setcountAdditionalCustomers] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

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

  // Store component code integrated here
  const Store = () => (
    <div style={styles.storeContainer}>
      <div style={styles.itemsContainer}>
        <h1>Equipments</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeItems.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </div>
      <div style={styles.separator}></div>
      <div style={styles.shoppingCart}>
        <ShoppingCart />
      </div>
    </div>
  );

  // StoreItem component code integrated here
  const StoreItem = ({ id, name, price, imgUrl, description, quantity }: StoreItemProps) => {
    const { increaseCartQuantity } = useShoppingCart();
    const storeItem = storeItems.find((item) => item.id === id);
    const isAvailable = storeItem && storeItem.quantity > 0;

    return (
      <Card className="h-100" style={{ maxWidth: "250px" }}>
        <Card.Img variant="top" src={imgUrl} height="100px" style={{ objectFit: "cover"}} />
        <Card.Body className="d-flex flex-column" style={{ backgroundColor: "#E5E5E5", padding: "10px" }}>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
            <span style={{ fontSize: "1.25rem" }}>{name}</span>
            <span className="ms-2 text-muted" style={{ fontSize: "0.9rem" }}>
              {formatCurrency(price)}
            </span>
          </Card.Title>
          <div className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>{description}</div>
          <div className="mt-auto">
            {isAvailable ? (
              <Button
                className="w-100"
                size="sm"
                style={{ backgroundColor: "#4B27A8", borderColor: "#4B27A8", fontWeight: "bold", width: "100%", padding: "10px" }}
                onClick={() => increaseCartQuantity(id)}
              >
                Available
              </Button>
            ) : (
              <div className="d-flex align-items-center justify-content-center" style={{ gap: ".4rem" }}>
                <span style={{ fontSize: "1rem", color: "#C00A0A" }}>Unavailable</span>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };

    // CartItem component definition
    const CartItem = ({ id, quantity }: CartItemProps) => {
        const storeItem = storeItems.find((item) => item.id === id);
        const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
    
        if (!storeItem) return null;
    
        return (
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
              <div className="me-auto"  style={{ paddingLeft: "15px", width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    {storeItem.name}{" "}
                  </span>
                  <div className="d-flex align-items-center" style={{ gap: ".5rem" }}>
                    <div style={{ fontSize: ".85rem"}}>
                      {formatCurrency(storeItem.price * quantity)}
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(storeItem.id)}
                    >
                      &times;
                    </Button>
                  </div>
                </div>
                {quantity > 1 && (
                      <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        Quantity: {quantity}
                      </span>
                    )}
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                  {formatCurrency(storeItem.price)}
                </div>
              </div>
            </Stack>

          
        );
      };

  const ShoppingCart = () => {
    const { cartItems } = useShoppingCart();
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    return (
      <div style={styles.shoppingCart}>
        <h2>Summary</h2>
        <Stack gap={3}>
          {safeCartItems.map((item) => {
            const storeItem = storeItems.find(i => i.id === item.id);
            const isAvailable = storeItem && storeItem.quantity > 0;

            return (
              <div key={item.id}>
                <CartItem {...item} />
                {!isAvailable && (
                  <div style={{ color: "#C00A0A", fontSize: "0.9rem" }}>This item is unavailable</div>
                )}
              </div>
            );
          })}

          <div className="fw-bold fs-5 text-start" style={{ color: "#545961" }}> Total: {" "}
            {formatCurrency(
              safeCartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id);
                if (!item || item.quantity === 0) return total;
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </div>
    );
  };

  const styles = {
    storeContainer: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      },
      itemsContainer: {
        flex: 3,
      },
      separator: {
        width: "2px",
        backgroundColor: "#ddd",
        margin: "0 20px",
      },
      shoppingCart: {
        flex: 1,
        padding: "20px",
      },
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
                  additionalpackage: searchParams.additionalpackage
                }
              }}
            >
              <button className="bg-cusBlue my-5 rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={handleNextClick}>
                Proceed to Date & Time
              </button>
            </Link>
          </div>
        </div>

        {/* Equipments and Summary Section */}
        <div className="mt-8">
          <Store />
        </div>
      </div>
    </ShoppingCartProvider>
  );
};

export default Page;