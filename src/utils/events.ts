declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string, data?: Record<string, string>) => void;
  }
}

type Payload = {
  ATM_bank_branches: 1 | 0;
  cashback_partners: 1 | 0;
  discounts: 1 | 0;
  alfa_afisha: 1 | 0;
  gas_cashback: 1 | 0;
  culture: 1 | 0;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycby2b_t3pbmbkE6n6VDTLWZtV04-LeBGY3hC_JDgx1JlRkzk8ux8AY6jeFmbE-Xdps7NbQ/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, ...payload, variant: 'variant1' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
