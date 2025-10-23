"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CityAutocomplete from "@/components/CityAutocomplete";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton";

type CheckoutInputsProps = {
  fName: string;
  lName: string;
  phone: string;
  addressNumber: string;
  city: string;
  street: string;
  email: string;
  zip: string;
};

const Checkout = () => {
  
  const cartItems = useSelector((state: RootState) => state.products.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const shippingCharges=10


  const [submittedData, setSubmittedData] =
    useState<CheckoutInputsProps | null>(null);

    const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutInputsProps>();

  const onSubmit: SubmitHandler<CheckoutInputsProps> = (data) => {
    setSubmittedData(data);
  };

  const phoneOtions = ["+92", "+93", "+56"];

  if (submittedData) {
    return (
        <>
        <Header/>
              <div className="mx-auto max-w-screen-md p-4">
        <h1 className="text-2xl font-bold text-center py-10">
          Your Shipping Details are:
        </h1>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Full Name:</span>{" "}
            {submittedData.fName} {submittedData.lName}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {submittedData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {submittedData.phone}
          </p>
          <p className="font-semibold">Address:</p>
          <p className="ml-4">
            {submittedData.addressNumber}, {submittedData.street},{" "}
            {submittedData.city}, {submittedData.zip},{"Pakistan"}
          </p>

          <p className=" font-semibold">Total Items: {totalItems}</p>
          {cartItems.map((item,index)=>(
            <div className="flex flex-col lg:flex-row gap-6 items-center "
            key={index}
            >
             <Image
             src={item.thumbnail}
             alt="cart item"
             width={100}
             height={100}

             />
               <p> {item.title}</p>
             <p>   ${item.price}</p>
            </div>
          ))}
          <p className="font-semibold">Shipping Charges: ${shippingCharges}</p>
          <p className="text-lg font-semibold ">Total Price: ${(total+shippingCharges).toFixed(2)}</p>
          
        </div>
        <div className="mt-6 text-center">
         
          <CheckoutButton/>
        </div>
      </div>
      <Footer/>
      </>
    );
  }

  return (
    <>
    <Header/>
      <h1 className="text-2xl font-bold text-center py-10">
        Enter Your Details:
      </h1>
      <form
        className="w-full flex flex-col gap-5 max-w-screen-2xl px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="w-full flex flex-col gap-2">
            <label className="font-bold">First Name*</label>
            <input
              {...register("fName", { required: "First name is required" })}
              placeholder="Enter Your First Name"
              className={`border  px-2 py-4 rounded ${
                errors.fName ? "border-red-500" : ""
              }`}
            />
            {errors.fName && (
              <p className="text-red-500 text-sm">{errors.fName.message}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="font-bold">Last Name*</label>
            <input
              {...register("lName", { required: "Last name is required" })}
              placeholder="Enter Your Last Name"
              className={`border px-2 py-4 rounded ${
                errors.lName ? "border-red-500" : ""
              }`}
            />
            {errors.lName && (
              <p className="text-red-500 text-sm">{errors.lName.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-bold">Phone Number*</label>
            <div className="flex  w-full">
              <select className="border text-center py-4 rounded">
                <option value=""></option>
                {phoneOtions.map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
              </select>
              <input
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Enter Your Phone Number"
                className={`border px-2  w-full py-4 rounded ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="font-bold">Email*</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your Email"
              className={`border px-2 py-4 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-bold">Address Number*</label>
            <input
              {...register("addressNumber", {
                required: "Address number is required",
              })}
              placeholder="Enter Your Address Number"
              className={`border px-2 py-4 rounded ${
                errors.addressNumber ? "border-red-500" : ""
              }`}
            />
            {errors.addressNumber && (
              <p className="text-red-500 text-sm">
                {errors.addressNumber.message}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-bold">Street*</label>
            <input
              {...register("street", { required: "Street is required" })}
              placeholder="Enter Your Street"
              className={`border px-2 py-4 rounded ${
                errors.street ? "border-red-500" : ""
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex-1 w-full">
            <CityAutocomplete
              name="city"
              label="City*"
              register={register}
              setValue={setValue}
              error={errors.city?.message}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 w-full">
            <label className="font-bold">Zip Code*</label>
            <input
              {...register("zip", { required: "Zip Code is required" })}
              placeholder="Enter Your Zip Code"
              className={`w-full border px-2 py-4 rounded ${
                errors.zip ? "border-red-500" : ""
              }`}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm">{errors.zip.message}</p>
            )}
          </div>
        </div>

        <input
          type="submit"
          className=" text-lg text-white bg-blue-500 hover:bg-blue-900 px-4 py-1 rounded-lg transition w-fit mx-auto"
         onClick={()=>setSubmittedData }
        />
      </form>
      <Footer/>
    
    </>
  );
};

export default Checkout;

