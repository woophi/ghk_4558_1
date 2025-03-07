declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string, data?: Record<string, string>) => void;
  }
}

type Payload = {
  text_with_smiles: 1 | 0;
  audio: 1 | 0;
  video: 1 | 0;
  video_mascots: 1 | 0;
  video_celeb: 1 | 0;
  basta: 1 | 0;
  wylsacom: 1 | 0;
  alla: 1 | 0;
  name: string;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbxkVqfTf9e_r064hvQwJoLv2YipKLIInrQ0efx_ypaWE0ivFIRtFuxBihc36_J7lLnjHg/exec',
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
