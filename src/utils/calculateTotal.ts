export default function calculateTotal(price: string, numberOfDays: number) {
    const numericPrice = parseFloat(price.replace("$", ""));
    return numericPrice * numberOfDays;
  }
  