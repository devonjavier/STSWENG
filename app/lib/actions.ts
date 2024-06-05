'use server';
 
export async function createCustomer(formData: FormData) {
    const rawFormData = {
        mainCustomerName: formData.get('customername'),
        AdditionalCustomer1: formData.get('additionalname1'),
        AdditionalCustomer2: formData.get('additionalname2'),
        AdditionalCustomer3: formData.get('additionalname3'),
        AddtionalRequests: formData.get('additionalreq'),
        needParking: formData.get('parking')
      };
      // Test it out:
      console.log(rawFormData);
}